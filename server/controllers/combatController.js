const Hero = require('../models/Hero');
const Monster = require('../models/Monster');
const Location = require('../models/Location');

// Import location data for seeding/lookup
const tutorialLocations = require('../data/locations/tutorial');
const verdantWilds = require('../data/locations/verdantWilds');

/**
 * Combat State Storage (in-memory for now)
 * In production, this would be stored in Redis or similar
 */
const activeCombats = new Map();

/**
 * Helper: Get location from database or seed data
 */
const getLocationData = async (locationId) => {
  let location = await Location.findOne({ locationId });
  if (!location) {
    const allLocations = [
      ...tutorialLocations,
      ...verdantWilds.getAllLocations()
    ];
    const seedData = allLocations.find(loc => loc.locationId === locationId);
    if (seedData) {
      return { ...seedData, _id: null, isFromSeed: true };
    }
  }
  return location;
};

/**
 * Calculate damage dealt
 * @param {Object} attacker - Stats of the attacker
 * @param {Object} defender - Stats of the defender
 * @param {string} damageType - Type of damage
 * @param {number} multiplier - Damage multiplier from weaknesses/resistances
 */
const calculateDamage = (attacker, defender, damageType, multiplier = 1.0) => {
  // Base damage = Power * 2 + random(1-6)
  const baseDamage = (attacker.power * 2) + Math.floor(Math.random() * 6) + 1;

  // Defense reduction = Toughness / 2
  const defense = Math.floor(defender.toughness / 2);

  // Apply multiplier and defense
  const damage = Math.max(1, Math.floor((baseDamage - defense) * multiplier));

  return damage;
};

/**
 * Check if attack hits
 * @param {Object} attacker - Stats of the attacker
 * @param {Object} defender - Stats of the defender
 */
const checkHit = (attacker, defender) => {
  // Hit chance = 70% base + (Acuity - Instinct) * 2%
  const hitChance = 70 + ((attacker.acuity - defender.instinct) * 2);
  const roll = Math.random() * 100;
  return roll < Math.min(95, Math.max(5, hitChance)); // Clamp between 5-95%
};

/**
 * Check for critical hit
 * @param {Object} attacker - Stats of the attacker
 */
const checkCrit = (attacker) => {
  // Crit chance = 5% base + Acuity / 2%
  const critChance = 5 + (attacker.acuity / 2);
  const roll = Math.random() * 100;
  return roll < Math.min(30, critChance); // Cap at 30%
};

/**
 * @desc    Start combat at current location
 * @route   POST /api/combat/start
 * @access  Private
 *
 * Body:
 * - heroId: string (required)
 */
const startCombat = async (req, res, next) => {
  try {
    const { heroId } = req.body;
    const accountId = req.user.id;

    if (!heroId) {
      return res.status(400).json({
        success: false,
        message: 'heroId is required'
      });
    }

    // Check if already in combat
    if (activeCombats.has(heroId)) {
      return res.status(400).json({
        success: false,
        message: 'Hero is already in combat'
      });
    }

    // Get hero
    const hero = await Hero.findById(heroId);
    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
    }

    // Verify ownership
    if (hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to control this hero'
      });
    }

    const currentLocationId = hero.navigation.currentSite;

    // Get current location
    const location = await getLocationData(currentLocationId);
    if (!location) {
      return res.status(404).json({
        success: false,
        message: `Location not found: ${currentLocationId}`
      });
    }

    // Check if location is already cleared
    if (hero.worldProgress.clearedSites.includes(currentLocationId)) {
      return res.status(400).json({
        success: false,
        message: 'This location has already been cleared'
      });
    }

    // Check if location has monsters
    if (!location.monsters || location.monsters.count === 0) {
      return res.status(400).json({
        success: false,
        message: 'No monsters at this location'
      });
    }

    // Get monster for combat
    let monster;
    if (location.monsters.fixedMonster) {
      // Fixed spawn (Champion, Mini-Boss, Boss)
      monster = await Monster.findOne({ monsterId: location.monsters.fixedMonster });
    } else {
      // Random spawn based on location biome and allowed tiers
      monster = await Monster.getRandomForBiome(
        location.biomeTags || ['forest'],
        location.monsters.tiers || ['trash', 'minion', 'elite']
      );
    }

    if (!monster) {
      return res.status(500).json({
        success: false,
        message: 'Failed to spawn monster for combat'
      });
    }

    // Create combat state
    const combatState = {
      heroId,
      locationId: currentLocationId,
      monster: {
        id: monster._id,
        monsterId: monster.monsterId,
        name: monster.name,
        category: monster.category,
        tier: monster.tier,
        level: monster.level,
        stats: monster.effectiveStats,
        maxHP: monster.maxHP,
        currentHP: monster.maxHP,
        maxMP: monster.maxMP,
        currentMP: monster.maxMP,
        damageType: monster.damageType,
        abilities: monster.abilities,
        weaknesses: monster.weaknesses,
        resistance: monster.resistance,
        immunity: monster.immunity,
        rewards: monster.rewards
      },
      hero: {
        currentHP: hero.currentHP,
        currentMP: hero.currentMP,
        currentStamina: hero.currentStamina || 100
      },
      round: 0,
      log: [],
      startedAt: new Date()
    };

    // Store combat state
    activeCombats.set(heroId, combatState);

    // Add initial log entry
    combatState.log.push({
      type: 'combat_start',
      message: `Combat begins with ${monster.name}!`,
      round: 0
    });

    res.json({
      success: true,
      message: `Combat started with ${monster.name}`,
      data: {
        combat: {
          monster: combatState.monster,
          heroHP: combatState.hero.currentHP,
          heroMP: combatState.hero.currentMP,
          heroStamina: combatState.hero.currentStamina,
          round: combatState.round,
          log: combatState.log
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Execute hero attack action
 * @route   POST /api/combat/attack
 * @access  Private
 *
 * Body:
 * - heroId: string (required)
 * - abilityId: string (optional - for ability attacks)
 */
const heroAttack = async (req, res, next) => {
  try {
    const { heroId, abilityId } = req.body;
    const accountId = req.user.id;

    if (!heroId) {
      return res.status(400).json({
        success: false,
        message: 'heroId is required'
      });
    }

    // Get combat state
    const combat = activeCombats.get(heroId);
    if (!combat) {
      return res.status(400).json({
        success: false,
        message: 'Hero is not in combat'
      });
    }

    // Get hero for ownership check and stats
    const hero = await Hero.findById(heroId);
    if (!hero || hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    combat.round++;
    const roundLog = [];

    // Get hero effective stats
    const heroStats = {
      power: hero.stats.power,
      toughness: hero.stats.toughness,
      brilliance: hero.stats.brilliance,
      spirit: hero.stats.spirit,
      acuity: hero.stats.acuity,
      instinct: hero.stats.instinct
    };

    // Default damage type is slashing (can be modified by equipped weapon)
    let heroDamageType = 'slashing';
    let damageMultiplier = 1.0;

    // Check for weakness/resistance
    if (combat.monster.weaknesses.includes(heroDamageType)) {
      damageMultiplier = 1.5;
    } else if (combat.monster.resistance === heroDamageType) {
      damageMultiplier = 0.5;
    } else if (combat.monster.immunity === heroDamageType) {
      damageMultiplier = 0;
    }

    // Hero attack
    const heroHits = checkHit(heroStats, combat.monster.stats);
    let heroDamage = 0;
    let heroCrit = false;

    if (heroHits) {
      heroCrit = checkCrit(heroStats);
      heroDamage = calculateDamage(heroStats, combat.monster.stats, heroDamageType, damageMultiplier);
      if (heroCrit) {
        heroDamage = Math.floor(heroDamage * 1.5);
      }
      combat.monster.currentHP = Math.max(0, combat.monster.currentHP - heroDamage);

      roundLog.push({
        type: 'hero_attack',
        hit: true,
        crit: heroCrit,
        damage: heroDamage,
        damageType: heroDamageType,
        multiplier: damageMultiplier,
        message: heroCrit
          ? `Critical hit! You deal ${heroDamage} damage to ${combat.monster.name}!`
          : `You strike ${combat.monster.name} for ${heroDamage} damage.`,
        monsterHP: combat.monster.currentHP
      });
    } else {
      roundLog.push({
        type: 'hero_attack',
        hit: false,
        message: `Your attack misses ${combat.monster.name}!`,
        monsterHP: combat.monster.currentHP
      });
    }

    // Check if monster is defeated
    if (combat.monster.currentHP <= 0) {
      roundLog.push({
        type: 'monster_defeated',
        message: `${combat.monster.name} has been defeated!`
      });

      // Calculate rewards
      const rewards = combat.monster.rewards;
      const xpGained = rewards.xp;
      const goldGained = Math.floor(
        Math.random() * (rewards.goldMax - rewards.goldMin + 1) + rewards.goldMin
      );

      // Update hero
      hero.experience.current += xpGained;
      hero.inventory.gold += goldGained;
      hero.lifetimeStats.totalMonstersSlain = (hero.lifetimeStats.totalMonstersSlain || 0) + 1;

      // Mark location as cleared if this was the only/last monster
      if (!hero.worldProgress.clearedSites.includes(combat.locationId)) {
        hero.worldProgress.clearedSites.push(combat.locationId);
      }

      // Track Champion/Mini-Boss/Boss defeats
      if (combat.monster.tier === 'champion') {
        if (!hero.worldProgress.defeatedChampions.includes(combat.monster.id)) {
          hero.worldProgress.defeatedChampions.push(combat.monster.id);
        }
      } else if (combat.monster.tier === 'mini_boss') {
        if (!hero.worldProgress.defeatedMiniBosses.includes(combat.monster.id)) {
          hero.worldProgress.defeatedMiniBosses.push(combat.monster.id);
        }
      } else if (combat.monster.tier === 'boss') {
        if (!hero.worldProgress.defeatedBosses.includes(combat.monster.id)) {
          hero.worldProgress.defeatedBosses.push(combat.monster.id);
        }
      }

      hero.lastPlayedAt = new Date();
      await hero.save();

      // Clean up combat state
      activeCombats.delete(heroId);

      return res.json({
        success: true,
        data: {
          combat: {
            status: 'victory',
            monster: combat.monster,
            heroHP: combat.hero.currentHP,
            round: combat.round,
            log: [...combat.log, ...roundLog]
          },
          rewards: {
            xp: xpGained,
            gold: goldGained,
            items: []
          },
          worldProgress: {
            clearedCount: hero.worldProgress.clearedSites.length,
            championsDefeated: hero.worldProgress.defeatedChampions.length,
            miniBossesDefeated: hero.worldProgress.defeatedMiniBosses.length,
            bossesDefeated: hero.worldProgress.defeatedBosses.length
          }
        }
      });
    }

    // Monster's turn
    const monsterHits = checkHit(combat.monster.stats, heroStats);
    let monsterDamage = 0;
    let monsterCrit = false;

    // Get damage multiplier for monster's attack type
    // (Hero weaknesses would be determined by equipment - for now, neutral)
    const monsterDamageMultiplier = 1.0;

    if (monsterHits) {
      monsterCrit = checkCrit(combat.monster.stats);
      monsterDamage = calculateDamage(combat.monster.stats, heroStats, combat.monster.damageType, monsterDamageMultiplier);
      if (monsterCrit) {
        monsterDamage = Math.floor(monsterDamage * 1.5);
      }
      combat.hero.currentHP = Math.max(0, combat.hero.currentHP - monsterDamage);

      roundLog.push({
        type: 'monster_attack',
        hit: true,
        crit: monsterCrit,
        damage: monsterDamage,
        damageType: combat.monster.damageType,
        message: monsterCrit
          ? `Critical hit! ${combat.monster.name} deals ${monsterDamage} damage to you!`
          : `${combat.monster.name} strikes you for ${monsterDamage} damage.`,
        heroHP: combat.hero.currentHP
      });
    } else {
      roundLog.push({
        type: 'monster_attack',
        hit: false,
        message: `${combat.monster.name}'s attack misses you!`,
        heroHP: combat.hero.currentHP
      });
    }

    // Update hero HP in database
    hero.currentHP = combat.hero.currentHP;
    await hero.save();

    // Check if hero is defeated
    if (combat.hero.currentHP <= 0) {
      roundLog.push({
        type: 'hero_defeated',
        message: 'You have been defeated...'
      });

      // Clean up combat state
      activeCombats.delete(heroId);

      // For now, respawn at last safe location
      // In full implementation, this would handle death penalty
      hero.currentHP = Math.floor(hero.stats.toughness * 5 * 0.5); // Respawn at 50% HP
      await hero.save();

      return res.json({
        success: true,
        data: {
          combat: {
            status: 'defeat',
            monster: combat.monster,
            heroHP: 0,
            round: combat.round,
            log: [...combat.log, ...roundLog]
          }
        }
      });
    }

    // Add round log to combat log
    combat.log.push(...roundLog);

    res.json({
      success: true,
      data: {
        combat: {
          status: 'ongoing',
          monster: combat.monster,
          heroHP: combat.hero.currentHP,
          heroMP: combat.hero.currentMP,
          heroStamina: combat.hero.currentStamina,
          round: combat.round,
          log: combat.log
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Attempt to flee from combat
 * @route   POST /api/combat/flee
 * @access  Private
 *
 * Body:
 * - heroId: string (required)
 */
const fleeCombat = async (req, res, next) => {
  try {
    const { heroId } = req.body;
    const accountId = req.user.id;

    if (!heroId) {
      return res.status(400).json({
        success: false,
        message: 'heroId is required'
      });
    }

    // Get combat state
    const combat = activeCombats.get(heroId);
    if (!combat) {
      return res.status(400).json({
        success: false,
        message: 'Hero is not in combat'
      });
    }

    // Get hero for ownership check
    const hero = await Hero.findById(heroId);
    if (!hero || hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Cannot flee from bosses
    if (['mini_boss', 'boss'].includes(combat.monster.tier)) {
      return res.status(400).json({
        success: false,
        message: `Cannot flee from a ${combat.monster.tier.replace('_', ' ')}!`
      });
    }

    // Flee chance based on Instinct
    const fleeChance = 40 + (hero.stats.instinct * 2);
    const roll = Math.random() * 100;
    const fleeSuccess = roll < Math.min(90, fleeChance);

    combat.round++;
    const roundLog = [];

    if (fleeSuccess) {
      roundLog.push({
        type: 'flee_success',
        message: `You successfully escape from ${combat.monster.name}!`
      });

      // Clean up combat state
      activeCombats.delete(heroId);

      // Update hero HP in database
      hero.currentHP = combat.hero.currentHP;
      await hero.save();

      return res.json({
        success: true,
        data: {
          combat: {
            status: 'fled',
            round: combat.round,
            log: [...combat.log, ...roundLog]
          }
        }
      });
    }

    // Failed to flee - monster gets a free attack
    roundLog.push({
      type: 'flee_failed',
      message: `You fail to escape! ${combat.monster.name} attacks!`
    });

    // Monster attack
    const heroStats = {
      power: hero.stats.power,
      toughness: hero.stats.toughness,
      acuity: hero.stats.acuity,
      instinct: hero.stats.instinct
    };

    const monsterHits = checkHit(combat.monster.stats, heroStats);
    if (monsterHits) {
      const monsterCrit = checkCrit(combat.monster.stats);
      let monsterDamage = calculateDamage(combat.monster.stats, heroStats, combat.monster.damageType, 1.0);
      if (monsterCrit) {
        monsterDamage = Math.floor(monsterDamage * 1.5);
      }
      combat.hero.currentHP = Math.max(0, combat.hero.currentHP - monsterDamage);

      roundLog.push({
        type: 'monster_attack',
        hit: true,
        crit: monsterCrit,
        damage: monsterDamage,
        message: monsterCrit
          ? `Critical! ${combat.monster.name} deals ${monsterDamage} damage!`
          : `${combat.monster.name} hits you for ${monsterDamage} damage!`,
        heroHP: combat.hero.currentHP
      });
    } else {
      roundLog.push({
        type: 'monster_attack',
        hit: false,
        message: `${combat.monster.name}'s attack misses!`,
        heroHP: combat.hero.currentHP
      });
    }

    // Update hero HP in database
    hero.currentHP = combat.hero.currentHP;
    await hero.save();

    // Check if hero is defeated
    if (combat.hero.currentHP <= 0) {
      roundLog.push({
        type: 'hero_defeated',
        message: 'You have been defeated while trying to flee...'
      });

      activeCombats.delete(heroId);
      hero.currentHP = Math.floor(hero.stats.toughness * 5 * 0.5);
      await hero.save();

      return res.json({
        success: true,
        data: {
          combat: {
            status: 'defeat',
            round: combat.round,
            log: [...combat.log, ...roundLog]
          }
        }
      });
    }

    combat.log.push(...roundLog);

    res.json({
      success: true,
      data: {
        combat: {
          status: 'ongoing',
          monster: combat.monster,
          heroHP: combat.hero.currentHP,
          round: combat.round,
          log: combat.log
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current combat status
 * @route   GET /api/combat/status/:heroId
 * @access  Private
 */
const getCombatStatus = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const accountId = req.user.id;

    // Verify hero ownership
    const hero = await Hero.findById(heroId);
    if (!hero || hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const combat = activeCombats.get(heroId);
    if (!combat) {
      return res.json({
        success: true,
        data: {
          inCombat: false
        }
      });
    }

    res.json({
      success: true,
      data: {
        inCombat: true,
        combat: {
          monster: combat.monster,
          heroHP: combat.hero.currentHP,
          heroMP: combat.hero.currentMP,
          heroStamina: combat.hero.currentStamina,
          round: combat.round,
          log: combat.log
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  startCombat,
  heroAttack,
  fleeCombat,
  getCombatStatus
};
