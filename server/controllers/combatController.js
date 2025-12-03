const Hero = require('../models/Hero');
const Monster = require('../models/Monster');
const Location = require('../models/Location');

// Import location data for seeding/lookup
const tutorialLocations = require('../data/locations/tutorial');
const verdantWilds = require('../data/locations/verdantWilds');

// Import monster data for seeding/lookup
const monsterData = require('../data/monsters');

// Import ability data
const { getAbility, getHeroAbilities } = require('../data/abilities');

/**
 * Combat State Storage (in-memory for now)
 * In production, this would be stored in Redis or similar
 */
const activeCombats = new Map();

// HP multipliers by tier (used for seed data monsters)
const HP_MULTIPLIERS = {
  trash: 5,
  minion: 6,
  elite: 8,
  champion: 10,
  mini_boss: 15,
  boss: 20
};

// Category difficulty modifiers
const CATEGORY_MODIFIERS = {
  beast: 1.0,
  humanoid: 1.0,
  faerie: 1.05,
  cursed: 1.05,
  construct: 1.10,
  undead: 1.10,
  magical_beast: 1.15,
  celestial: 1.15,
  aberration: 1.20,
  dragon: 1.20
};

// Category weaknesses, resistances, immunities
const CATEGORY_DEFENSES = {
  beast: { weaknesses: ['fire', 'piercing'], resistance: 'bludgeoning', immunity: 'arcane' },
  humanoid: { weaknesses: ['slashing', 'air'], resistance: 'bludgeoning', immunity: 'earth' },
  faerie: { weaknesses: ['bludgeoning', 'arcane'], resistance: 'air', immunity: 'water' },
  cursed: { weaknesses: ['fire', 'slashing'], resistance: 'poison', immunity: 'earth' },
  construct: { weaknesses: ['bludgeoning', 'water'], resistance: 'piercing', immunity: 'poison' },
  undead: { weaknesses: ['arcane', 'air'], resistance: 'piercing', immunity: 'bludgeoning' },
  magical_beast: { weaknesses: ['earth', 'arcane'], resistance: 'air', immunity: 'fire' },
  celestial: { weaknesses: ['poison', 'earth'], resistance: 'fire', immunity: 'air' },
  aberration: { weaknesses: ['bludgeoning', 'water'], resistance: 'arcane', immunity: 'poison' },
  dragon: { weaknesses: ['piercing', 'poison'], resistance: 'fire', immunity: 'slashing' }
};

/**
 * Helper: Create a monster object from seed data matching the schema
 */
const createMonsterFromSeed = (seedData) => {
  const modifier = CATEGORY_MODIFIERS[seedData.category] || 1.0;
  const hpMultiplier = HP_MULTIPLIERS[seedData.tier] || 5;
  const defenses = CATEGORY_DEFENSES[seedData.category] || { weaknesses: [], resistance: null, immunity: null };

  // Calculate effective stats
  const effectiveStats = {
    power: Math.floor(seedData.stats.power * modifier),
    toughness: Math.floor(seedData.stats.toughness * modifier),
    brilliance: Math.floor(seedData.stats.brilliance * modifier),
    spirit: Math.floor(seedData.stats.spirit * modifier),
    acuity: Math.floor(seedData.stats.acuity * modifier),
    instinct: Math.floor(seedData.stats.instinct * modifier)
  };

  return {
    ...seedData,
    _id: seedData.monsterId, // Use monsterId as a pseudo-ID
    effectiveStats,
    maxHP: seedData.stats.toughness * hpMultiplier,
    maxMP: seedData.stats.spirit * 5,
    weaknesses: defenses.weaknesses,
    resistance: defenses.resistance,
    immunity: defenses.immunity,
    isFromSeed: true
  };
};

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
 * Helper: Get monster from database or seed data by monsterId
 */
const getMonsterData = async (monsterId) => {
  let monster = await Monster.findOne({ monsterId });
  if (!monster) {
    const allMonsters = monsterData.getAllMonsters();
    const seedData = allMonsters.find(m => m.monsterId === monsterId);
    if (seedData) {
      return createMonsterFromSeed(seedData);
    }
  }
  return monster;
};

/**
 * Helper: Get random monster from database or seed data for biome
 */
const getRandomMonsterForBiome = async (biomeTags, allowedTiers) => {
  // Try database first
  const dbMonster = await Monster.getRandomForBiome(biomeTags, allowedTiers);
  if (dbMonster) return dbMonster;

  // Fall back to seed data
  const allMonsters = monsterData.getAllMonsters();
  const eligibleMonsters = allMonsters.filter(m =>
    allowedTiers.includes(m.tier) &&
    m.habitatTags.some(tag => biomeTags.includes(tag)) &&
    !m.fixedLocationId // Exclude fixed spawns
  );

  if (eligibleMonsters.length === 0) return null;

  const randomMonster = eligibleMonsters[Math.floor(Math.random() * eligibleMonsters.length)];
  return createMonsterFromSeed(randomMonster);
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
 * XP Thresholds for leveling
 * Pattern: 20, 20, 25, 25, 30 (repeating every 5 levels)
 */
const XP_THRESHOLDS = [20, 20, 25, 25, 30];

/**
 * Get XP required for next level
 * @param {number} currentLevel - Hero's current level
 */
const getXPForNextLevel = (currentLevel) => {
  // Use pattern index (0-4) based on level
  const patternIndex = (currentLevel - 1) % 5;
  return XP_THRESHOLDS[patternIndex];
};

/**
 * Check and apply level up(s) if hero has enough XP
 * @param {Object} hero - Hero document
 * @returns {Object} Level up info { levelsGained, newLevel, statGains }
 */
const checkLevelUp = (hero) => {
  let levelsGained = 0;
  let totalStatGains = {
    power: 0,
    toughness: 0,
    brilliance: 0,
    spirit: 0,
    acuity: 0,
    instinct: 0
  };

  // Keep leveling up while hero has enough XP
  while (true) {
    const xpNeeded = getXPForNextLevel(hero.level);
    if (hero.experience.current < xpNeeded) break;

    // Level up!
    hero.experience.current -= xpNeeded;
    hero.experience.total = (hero.experience.total || 0) + xpNeeded;
    hero.level += 1;
    levelsGained += 1;

    // Grant stat points based on calling
    // Each level grants +1 to primary stat and +1 to a secondary stat
    const statGains = getStatGainsForLevel(hero);
    for (const [stat, gain] of Object.entries(statGains)) {
      // Add level bonuses to the levelBonuses sub-object
      hero.stats.levelBonuses[stat] = (hero.stats.levelBonuses[stat] || 0) + gain;
      totalStatGains[stat] += gain;
    }

    // Restore HP/MP to full using the virtual max values
    hero.currentHP = hero.maxHP;
    hero.currentMP = hero.maxMP;

    // Max level cap (for now)
    if (hero.level >= 20) break;
  }

  return {
    levelsGained,
    newLevel: hero.level,
    statGains: totalStatGains
  };
};

/**
 * Get stat gains for a level up based on hero's calling
 * @param {Object} hero - Hero document
 */
const getStatGainsForLevel = (hero) => {
  // Default stat gains (will be customized by calling later)
  // For now, +1 to two stats based on level parity
  const level = hero.level;
  const gains = {};

  // Primary stat based on calling (matches callings.js)
  const callingPrimary = {
    warrior: 'power',
    paladin: 'toughness',
    hunter: 'acuity',
    rogue: 'instinct',
    mage: 'brilliance',
    priest: 'spirit',
    bard: 'spirit',
    druid: 'brilliance'
  };

  // Secondary stat rotation
  const secondaryStats = ['power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct'];
  const secondaryIndex = (level - 1) % 6;

  const primaryStat = callingPrimary[hero.calling] || 'power';
  const secondaryStat = secondaryStats[secondaryIndex];

  gains[primaryStat] = (gains[primaryStat] || 0) + 1;
  if (secondaryStat !== primaryStat) {
    gains[secondaryStat] = (gains[secondaryStat] || 0) + 1;
  } else {
    // If same as primary, give +2 to primary
    gains[primaryStat] += 1;
  }

  return gains;
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

    // Get monster for combat (uses seed data fallback)
    let monster;
    if (location.monsters.fixedMonster) {
      // Fixed spawn (Champion, Mini-Boss, Boss)
      monster = await getMonsterData(location.monsters.fixedMonster);
    } else {
      // Random spawn based on location biome and allowed tiers
      monster = await getRandomMonsterForBiome(
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
        currentStamina: hero.currentStamina || 100,
        buffs: [],      // Active buffs (Focus crit bonus, Evade dodge bonus)
        debuffs: []     // Active debuffs (for Fortify to cleanse)
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

    // Get hero's available abilities from skill tree
    const heroAbilities = getHeroAbilities(hero.skillTree);

    res.json({
      success: true,
      message: `Combat started with ${monster.name}`,
      data: {
        combat: {
          monster: combatState.monster,
          heroHP: combatState.hero.currentHP,
          heroMP: combatState.hero.currentMP,
          heroStamina: combatState.hero.currentStamina,
          heroMaxHP: hero.maxHP,
          heroMaxMP: hero.maxMP,
          heroMaxStamina: hero.maxStamina,
          abilities: heroAbilities,
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

    // Get hero effective stats (sum of base + callingMods + levelBonuses + skillTreeBonuses)
    const heroStats = hero.effectiveStats;

    // Get ability if specified
    const ability = abilityId ? getAbility(abilityId) : null;

    // Validate ability costs
    if (ability) {
      if (ability.mpCost > 0 && combat.hero.currentMP < ability.mpCost) {
        return res.status(400).json({
          success: false,
          message: `Not enough MP to use ${ability.name}. Need ${ability.mpCost}, have ${combat.hero.currentMP}.`
        });
      }
      if (ability.staminaCost > 0 && combat.hero.currentStamina < ability.staminaCost) {
        return res.status(400).json({
          success: false,
          message: `Not enough Stamina to use ${ability.name}. Need ${ability.staminaCost}, have ${combat.hero.currentStamina}.`
        });
      }

      // Deduct costs
      combat.hero.currentMP -= ability.mpCost;
      combat.hero.currentStamina -= ability.staminaCost;
    }

    // Initialize buffs array if not present
    if (!combat.hero.buffs) combat.hero.buffs = [];
    if (!combat.hero.debuffs) combat.hero.debuffs = [];

    // Determine damage type and multipliers based on ability or basic attack
    let heroDamageType = ability?.damageType || 'physical';
    let abilityDamageMultiplier = ability?.damageMultiplier || 1.0;
    let hitModifier = ability?.hitModifier || 0;
    let critModifier = ability?.critModifier || 0;
    let skipHeroAttack = false;

    // Check for active Focus buff (crit bonus) and apply it
    const focusBuffIndex = combat.hero.buffs.findIndex(b => b.type === 'critBonus');
    if (focusBuffIndex !== -1) {
      critModifier += combat.hero.buffs[focusBuffIndex].value;
      combat.hero.buffs.splice(focusBuffIndex, 1); // Consume the buff
      roundLog.push({
        type: 'buff_consumed',
        message: 'Focus bonus applied to this attack!'
      });
    }

    // Handle special ability effects
    if (ability) {
      if (ability.effect === 'defend') {
        // Guard: Reduce incoming damage by 25% this turn
        combat.hero.buffs.push({
          type: 'damageReduction',
          value: ability.damageReduction || 0.25,
          duration: 1,
          source: ability.name
        });
        skipHeroAttack = true;
        roundLog.push({
          type: 'hero_defend',
          ability: ability.name,
          message: `You take a defensive stance with ${ability.name}! Incoming damage reduced by 25%.`
        });
      } else if (ability.effect === 'cleanse') {
        // Fortify: Remove one debuff
        skipHeroAttack = true;
        if (combat.hero.debuffs.length > 0) {
          const cleansedDebuff = combat.hero.debuffs.shift();
          roundLog.push({
            type: 'hero_cleanse',
            ability: ability.name,
            cleansed: cleansedDebuff.type,
            message: `You use ${ability.name} and remove ${cleansedDebuff.type}!`
          });
        } else {
          roundLog.push({
            type: 'hero_cleanse',
            ability: ability.name,
            message: `You use ${ability.name}, but have no debuffs to remove.`
          });
        }
      } else if (ability.effect === 'buff') {
        // Focus or Evade: Apply buff for next action
        skipHeroAttack = true;
        if (ability.buffType === 'critBonus') {
          // Focus: +15% crit on next attack
          combat.hero.buffs.push({
            type: 'critBonus',
            value: ability.critBonus || 15,
            duration: 1,
            source: ability.name
          });
          roundLog.push({
            type: 'hero_buff',
            ability: ability.name,
            buffType: 'critBonus',
            message: `You focus intently. Your next attack has +${ability.critBonus || 15}% Critical Hit Chance!`
          });
        } else if (ability.buffType === 'dodgeBonus') {
          // Evade: +25% dodge on next incoming attack
          combat.hero.buffs.push({
            type: 'dodgeBonus',
            value: ability.dodgeBonus || 25,
            duration: 1,
            source: ability.name
          });
          roundLog.push({
            type: 'hero_buff',
            ability: ability.name,
            buffType: 'dodgeBonus',
            message: `You prepare to evade. +${ability.dodgeBonus || 25}% chance to dodge the next attack!`
          });
        }
      }
    }

    // Calculate weakness/resistance multiplier
    let weaknessMultiplier = 1.0;
    if (heroDamageType && combat.monster.weaknesses?.includes(heroDamageType)) {
      weaknessMultiplier = 1.5;
    } else if (heroDamageType && combat.monster.resistance === heroDamageType) {
      weaknessMultiplier = 0.5;
    } else if (heroDamageType && combat.monster.immunity === heroDamageType) {
      weaknessMultiplier = 0;
    }

    const totalDamageMultiplier = abilityDamageMultiplier * weaknessMultiplier;

    // Hero attack (if ability deals damage and not a buff/defensive action)
    let heroDamage = 0;
    let heroCrit = false;

    if (!skipHeroAttack && (!ability || ability.effect === 'damage')) {
      // Calculate hit chance with modifiers
      const modifiedHeroStats = {
        ...heroStats,
        acuity: heroStats.acuity + Math.floor(hitModifier / 2)
      };

      const heroHits = checkHit(modifiedHeroStats, combat.monster.stats);

      if (heroHits) {
        // Calculate crit with modifiers
        const modifiedCritStats = {
          ...heroStats,
          acuity: heroStats.acuity + critModifier
        };
        heroCrit = checkCrit(modifiedCritStats);

        // Use ability's stat for damage if specified
        const attackStats = ability?.statUsed && ability.statUsed !== 'power'
          ? { ...heroStats, power: heroStats[ability.statUsed] }
          : heroStats;

        heroDamage = calculateDamage(attackStats, combat.monster.stats, heroDamageType, totalDamageMultiplier);
        if (heroCrit) {
          heroDamage = Math.floor(heroDamage * 1.5);
        }
        combat.monster.currentHP = Math.max(0, combat.monster.currentHP - heroDamage);

        const abilityName = ability ? ability.name : 'Attack';
        roundLog.push({
          type: 'hero_attack',
          hit: true,
          crit: heroCrit,
          damage: heroDamage,
          damageType: heroDamageType,
          ability: ability?.name,
          multiplier: totalDamageMultiplier,
          message: heroCrit
            ? `Critical ${abilityName}! You deal ${heroDamage} damage to ${combat.monster.name}!`
            : `Your ${abilityName} hits ${combat.monster.name} for ${heroDamage} damage.`,
          monsterHP: combat.monster.currentHP
        });
      } else {
        const abilityName = ability ? ability.name : 'attack';
        roundLog.push({
          type: 'hero_attack',
          hit: false,
          ability: ability?.name,
          message: `Your ${abilityName} misses ${combat.monster.name}!`,
          monsterHP: combat.monster.currentHP
        });
      }
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

      // Store previous level for comparison
      const previousLevel = hero.level;

      // Update hero
      hero.experience.current += xpGained;
      hero.inventory.gold += goldGained;
      hero.lifetimeStats.totalMonstersSlain = (hero.lifetimeStats.totalMonstersSlain || 0) + 1;

      // Check for level up
      const levelUpResult = checkLevelUp(hero);

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

      // Build response with level up info if applicable
      const responseData = {
        combat: {
          status: 'victory',
          monster: combat.monster,
          heroHP: levelUpResult.levelsGained > 0 ? hero.currentHP : combat.hero.currentHP,
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
      };

      // Add level up info if hero leveled
      if (levelUpResult.levelsGained > 0) {
        const effectiveStats = hero.effectiveStats;
        responseData.levelUp = {
          levelsGained: levelUpResult.levelsGained,
          previousLevel: previousLevel,
          newLevel: levelUpResult.newLevel,
          statGains: levelUpResult.statGains,
          newStats: effectiveStats,
          newMaxHP: hero.maxHP,
          newMaxMP: hero.maxMP
        };
      }

      // Add XP progress info
      responseData.xpProgress = {
        current: hero.experience.current,
        needed: getXPForNextLevel(hero.level),
        total: hero.experience.total || 0
      };

      return res.json({
        success: true,
        data: responseData
      });
    }

    // Monster's turn
    let monsterDamage = 0;
    let monsterCrit = false;
    let monsterHits = false;

    // Check for Evade dodge bonus buff
    let dodgeBonus = 0;
    const dodgeBuffIndex = combat.hero.buffs.findIndex(b => b.type === 'dodgeBonus');
    if (dodgeBuffIndex !== -1) {
      dodgeBonus = combat.hero.buffs[dodgeBuffIndex].value;
      combat.hero.buffs.splice(dodgeBuffIndex, 1); // Consume the buff
    }

    // Roll for dodge (base chance from Instinct + Evade bonus)
    const baseDodgeChance = heroStats.instinct; // Base dodge from Instinct
    const totalDodgeChance = Math.min(75, baseDodgeChance + dodgeBonus); // Cap at 75%
    const dodgeRoll = Math.random() * 100;
    const heroDodged = dodgeBonus > 0 && dodgeRoll < totalDodgeChance;

    if (heroDodged) {
      roundLog.push({
        type: 'hero_dodge',
        message: `You evade ${combat.monster.name}'s attack!`,
        heroHP: combat.hero.currentHP
      });
    } else {
      monsterHits = checkHit(combat.monster.stats, heroStats);

      // Get damage multiplier for monster's attack type
      // (Hero weaknesses would be determined by equipment - for now, neutral)
      let monsterDamageMultiplier = 1.0;

      // Check for Guard damage reduction buff
      const damageReductionIndex = combat.hero.buffs.findIndex(b => b.type === 'damageReduction');
      let hadGuard = false;
      if (damageReductionIndex !== -1) {
        const reductionBuff = combat.hero.buffs[damageReductionIndex];
        monsterDamageMultiplier *= (1 - reductionBuff.value); // 25% reduction = 0.75 multiplier
        combat.hero.buffs.splice(damageReductionIndex, 1); // Consume the buff
        hadGuard = true;
      }

      if (monsterHits) {
        monsterCrit = checkCrit(combat.monster.stats);
        monsterDamage = calculateDamage(combat.monster.stats, heroStats, combat.monster.damageType, monsterDamageMultiplier);
        if (monsterCrit) {
          monsterDamage = Math.floor(monsterDamage * 1.5);
        }
        combat.hero.currentHP = Math.max(0, combat.hero.currentHP - monsterDamage);

        const defendText = hadGuard ? ' (reduced by Guard)' : '';
        roundLog.push({
          type: 'monster_attack',
          hit: true,
          crit: monsterCrit,
          damage: monsterDamage,
          damageType: combat.monster.damageType,
          message: monsterCrit
            ? `Critical hit! ${combat.monster.name} deals ${monsterDamage} damage to you!${defendText}`
            : `${combat.monster.name} strikes you for ${monsterDamage} damage.${defendText}`,
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
    }

    // Update hero HP, MP, and Stamina in database
    hero.currentHP = combat.hero.currentHP;
    hero.currentMP = combat.hero.currentMP;
    hero.currentStamina = combat.hero.currentStamina;
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
      hero.currentHP = Math.floor(hero.maxHP * 0.5); // Respawn at 50% HP
      hero.currentMP = hero.currentMP; // Keep current MP
      hero.currentStamina = hero.maxStamina; // Restore stamina
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

    // Flee chance based on Instinct (use effectiveStats)
    const fleeChance = 40 + (hero.effectiveStats.instinct * 2);
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

    // Monster attack (use effectiveStats)
    const heroStats = hero.effectiveStats;

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
