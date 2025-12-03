const Hero = require('../models/Hero');
const Account = require('../models/Account');
const Item = require('../models/Item');
const { species } = require('../data/species');
const { callings } = require('../data/callings');
const { items, getStarterEquipment } = require('../data/items');

/**
 * @desc    Create a new hero for the authenticated account
 * @route   POST /api/heroes
 * @access  Private
 *
 * Request Body:
 * - heroName: string (required, 2-20 chars)
 * - species: string (required, one of 12 species)
 * - calling: string (required, one of 8 callings)
 * - genderIdentity: string (required, male/female/non-binary/other)
 *
 * This endpoint:
 * 1. Validates max hero limit (5 per account)
 * 2. Calculates initial stats from species base + calling modifiers
 * 3. Sets starting gold and rations from species + calling bonuses
 * 4. Assigns worn starter equipment based on calling specializations
 * 5. Initializes skill tree with Stage 1 basic abilities
 * 6. Sets starting location to 'avandria'
 * 7. Calculates and sets initial HP/MP to full
 */
const createHero = async (req, res, next) => {
  try {
    const { heroName, species: speciesId, calling: callingId, genderIdentity } = req.body;
    const accountId = req.user.id;

    // Validate required fields
    if (!heroName || !speciesId || !callingId || !genderIdentity) {
      return res.status(400).json({
        success: false,
        message: 'Please provide heroName, species, calling, and genderIdentity'
      });
    }

    // Validate species exists
    const speciesData = species[speciesId];
    if (!speciesData) {
      return res.status(400).json({
        success: false,
        message: `Invalid species: ${speciesId}. Valid options: ${Object.keys(species).join(', ')}`
      });
    }

    // Validate calling exists
    const callingData = callings[callingId];
    if (!callingData) {
      return res.status(400).json({
        success: false,
        message: `Invalid calling: ${callingId}. Valid options: ${Object.keys(callings).join(', ')}`
      });
    }

    // Validate gender identity
    const validGenders = ['male', 'female', 'non-binary', 'other'];
    if (!validGenders.includes(genderIdentity)) {
      return res.status(400).json({
        success: false,
        message: `Invalid genderIdentity: ${genderIdentity}. Valid options: ${validGenders.join(', ')}`
      });
    }

    // Check hero limit (max 5 per account)
    const account = await Account.findById(accountId);
    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    if (account.heroes.length >= 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum hero limit reached (5 heroes per account)'
      });
    }

    // Calculate starting stats
    // Base stats come from species
    const baseStats = { ...speciesData.stats };

    // Calling modifiers are added on top
    const callingMods = {
      power: callingData.statModifiers.power || 0,
      toughness: callingData.statModifiers.toughness || 0,
      brilliance: callingData.statModifiers.brilliance || 0,
      spirit: callingData.statModifiers.spirit || 0,
      acuity: callingData.statModifiers.acuity || 0,
      instinct: callingData.statModifiers.instinct || 0
    };

    // Calculate starting resources (species + calling)
    const startingGold = speciesData.startingResources.gold + callingData.startingResources.gold;
    const startingRations = speciesData.startingResources.rations + callingData.startingResources.rations;

    // Get starter equipment IDs based on calling
    const starterEquipmentIds = getStarterEquipment(callingId);

    // Look up or create Item documents for starter equipment
    const equipmentObjectIds = {};
    for (const [slot, itemId] of Object.entries(starterEquipmentIds)) {
      // Check if item exists in database
      let item = await Item.findOne({ itemId });

      // If not, create it from our data
      if (!item && items[itemId]) {
        item = await Item.create(items[itemId]);
      }

      equipmentObjectIds[slot] = item ? item._id : null;
    }

    // Calculate initial HP, MP, and Stamina
    // Effective stats = base + calling mod (no level bonuses yet)
    const effectiveToughness = baseStats.toughness + callingMods.toughness;
    const effectiveSpirit = baseStats.spirit + callingMods.spirit;
    const maxHP = 10 + (effectiveToughness * 3);
    const maxMP = 10 + (effectiveSpirit * 3);
    const maxStamina = effectiveToughness * 5;

    // Create the hero
    const hero = await Hero.create({
      heroName,
      species: speciesId,
      calling: callingId,
      genderIdentity,
      account: accountId,

      // Progression
      level: 1,
      currentXP: 0,
      skillPoints: 1, // Start with 1 SP to spend
      gold: startingGold,

      // Vitality (start at full)
      currentHP: maxHP,
      currentMP: maxMP,
      currentStamina: maxStamina,
      currentRations: startingRations,

      // Stats
      stats: {
        base: baseStats,
        callingMods: callingMods,
        levelBonuses: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
        skillTreeBonuses: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 }
      },

      // Equipment
      equipment: equipmentObjectIds,

      // Inventory (calling starter items will be added separately)
      inventory: [],

      // Skill Tree (all at Stage 1 with basic abilities)
      skillTree: {
        power: { stage: 1, abilities: ['strike'] },
        toughness: { stage: 1, abilities: ['guard'] },
        brilliance: { stage: 1, abilities: ['spark'] },
        spirit: { stage: 1, abilities: ['fortify'] },
        acuity: { stage: 1, abilities: ['focus'] },
        instinct: { stage: 1, abilities: ['evade'] }
      },

      // Navigation (start at Avandria)
      navigation: {
        currentSite: 'avandria',
        pathStack: ['avandria']
      },

      // World Progress (nothing discovered yet except starting location)
      worldProgress: {
        discoveredSites: ['avandria'],
        clearedSites: [],
        defeatedChampions: [],
        defeatedMiniBosses: [],
        defeatedBosses: [],
        unlockedSecretRegions: []
      }
    });

    // Add hero to account's heroes array
    account.heroes.push(hero._id);
    await account.save();

    // Add starting inventory items (consumables and junk from calling)
    const startingInventory = callingData.startingInventory;
    if (startingInventory) {
      // Add consumables
      for (const consumable of startingInventory.consumables || []) {
        let item = await Item.findOne({ itemId: consumable.itemId });
        if (!item && items[consumable.itemId]) {
          item = await Item.create(items[consumable.itemId]);
        }
        if (item) {
          hero.inventory.push({
            item: item._id,
            quantity: consumable.quantity
          });
        }
      }
      await hero.save();
    }

    // Populate equipment for response
    const populatedHero = await Hero.findById(hero._id)
      .populate('equipment.head')
      .populate('equipment.torso')
      .populate('equipment.arms')
      .populate('equipment.legs')
      .populate('equipment.feet')
      .populate('equipment.primaryWeapon')
      .populate('equipment.secondaryWeapon')
      .populate('inventory.item');

    res.status(201).json({
      success: true,
      message: 'Hero created successfully',
      data: {
        hero: populatedHero.toSafeObject(),
        speciesInfo: {
          name: speciesData.name,
          description: speciesData.description
        },
        callingInfo: {
          name: callingData.name,
          description: callingData.description,
          skillTreePaths: callingData.skillTreePaths
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all heroes for the authenticated account
 * @route   GET /api/heroes
 * @access  Private
 *
 * Returns an array of heroes with basic info for the hero selection screen:
 * - Hero identity (name, species, calling, gender)
 * - Level and current location
 * - Last played timestamp
 */
const getHeroes = async (req, res, next) => {
  try {
    const accountId = req.user.id;

    const heroes = await Hero.find({ account: accountId })
      .select('heroName species calling genderIdentity level navigation.currentSite lastPlayedAt createdAt')
      .sort({ lastPlayedAt: -1 }); // Most recently played first

    // Enrich with species and calling display names
    const enrichedHeroes = heroes.map(hero => ({
      id: hero._id,
      heroName: hero.heroName,
      species: hero.species,
      speciesName: species[hero.species]?.name || hero.species,
      calling: hero.calling,
      callingName: callings[hero.calling]?.name || hero.calling,
      genderIdentity: hero.genderIdentity,
      level: hero.level,
      currentSite: hero.navigation.currentSite,
      lastPlayedAt: hero.lastPlayedAt,
      createdAt: hero.createdAt
    }));

    res.json({
      success: true,
      count: heroes.length,
      data: enrichedHeroes
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single hero by ID (full details)
 * @route   GET /api/heroes/:id
 * @access  Private
 *
 * Returns complete hero data including:
 * - All stats (base, modifiers, effective)
 * - Full equipment with item details
 * - Inventory contents
 * - Skill tree progress
 * - World progress
 * - Lifetime statistics
 *
 * Also updates lastPlayedAt timestamp
 */
const getHero = async (req, res, next) => {
  try {
    const heroId = req.params.id;
    const accountId = req.user.id;

    const hero = await Hero.findById(heroId)
      .populate('equipment.head')
      .populate('equipment.torso')
      .populate('equipment.arms')
      .populate('equipment.legs')
      .populate('equipment.feet')
      .populate('equipment.primaryWeapon')
      .populate('equipment.secondaryWeapon')
      .populate('inventory.item');

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
    }

    // Verify hero belongs to the authenticated account
    if (hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this hero'
      });
    }

    // Update last played timestamp
    hero.lastPlayedAt = new Date();
    await hero.save();

    // Get species and calling info for context
    const speciesData = species[hero.species];
    const callingData = callings[hero.calling];

    res.json({
      success: true,
      data: {
        hero: hero.toSafeObject(),
        speciesInfo: speciesData ? {
          name: speciesData.name,
          description: speciesData.description,
          archetype: speciesData.archetype
        } : null,
        callingInfo: callingData ? {
          name: callingData.name,
          description: callingData.description,
          specializations: callingData.specializations,
          skillTreePaths: callingData.skillTreePaths
        } : null
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a hero (save game state)
 * @route   PUT /api/heroes/:id
 * @access  Private
 *
 * Allowed updates:
 * - currentHP, currentMP, currentRations
 * - gold, currentXP, skillPoints
 * - navigation (currentSite, pathStack)
 * - worldProgress
 * - lifetimeStats
 * - inventory changes
 * - totalPlaytime
 *
 * Restricted updates (handled by other endpoints):
 * - level (handled by XP gain logic)
 * - stats (handled by level up and skill tree)
 * - skillTree (handled by skill point spending)
 * - equipment (handled by equip/unequip)
 */
const updateHero = async (req, res, next) => {
  try {
    const heroId = req.params.id;
    const accountId = req.user.id;

    const hero = await Hero.findById(heroId);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
    }

    // Verify hero belongs to the authenticated account
    if (hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this hero'
      });
    }

    // Define allowed update fields
    const allowedFields = [
      'currentHP',
      'currentMP',
      'currentRations',
      'gold',
      'currentXP',
      'navigation',
      'worldProgress',
      'lifetimeStats',
      'totalPlaytime'
    ];

    // Apply allowed updates
    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    // Validate HP doesn't exceed max
    if (updates.currentHP !== undefined) {
      const maxHP = hero.maxHP;
      updates.currentHP = Math.min(Math.max(0, updates.currentHP), maxHP);
    }

    // Validate MP doesn't exceed max
    if (updates.currentMP !== undefined) {
      const maxMP = hero.maxMP;
      updates.currentMP = Math.min(Math.max(0, updates.currentMP), maxMP);
    }

    // Validate gold isn't negative
    if (updates.gold !== undefined) {
      updates.gold = Math.max(0, updates.gold);
    }

    // Always update lastPlayedAt
    updates.lastPlayedAt = new Date();

    // Apply updates
    Object.assign(hero, updates);
    await hero.save();

    res.json({
      success: true,
      message: 'Hero updated successfully',
      data: hero.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a hero
 * @route   DELETE /api/heroes/:id
 * @access  Private
 *
 * This permanently deletes the hero and removes it from the account's heroes array.
 * This action cannot be undone.
 */
const deleteHero = async (req, res, next) => {
  try {
    const heroId = req.params.id;
    const accountId = req.user.id;

    const hero = await Hero.findById(heroId);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
    }

    // Verify hero belongs to the authenticated account
    if (hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this hero'
      });
    }

    // Remove hero from account's heroes array
    const account = await Account.findById(accountId);
    if (account) {
      account.heroes = account.heroes.filter(
        h => h.toString() !== heroId
      );
      await account.save();
    }

    // Delete the hero
    await Hero.findByIdAndDelete(heroId);

    res.json({
      success: true,
      message: `Hero "${hero.heroName}" has been deleted`,
      data: {
        deletedHeroId: heroId,
        deletedHeroName: hero.heroName,
        remainingHeroes: account ? account.heroes.length : 0
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get hero stats summary (for UI display)
 * @route   GET /api/heroes/:id/stats
 * @access  Private
 *
 * Returns calculated combat statistics:
 * - Effective stats (all bonuses combined)
 * - Max HP, MP, Stamina
 * - Hit chance formula components
 * - Critical hit chance
 * - Inventory capacity
 */
const getHeroStats = async (req, res, next) => {
  try {
    const heroId = req.params.id;
    const accountId = req.user.id;

    const hero = await Hero.findById(heroId);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
    }

    // Verify hero belongs to the authenticated account
    if (hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this hero'
      });
    }

    // Calculate effective stats
    const effectiveStats = hero.effectiveStats;

    // Calculate combat stats
    const maxHP = hero.maxHP;
    const maxMP = hero.maxMP;
    const maxStamina = hero.maxStamina;
    const inventoryCapacity = hero.inventoryCapacity;

    // Critical hit chance = Effective Acuity × 1.8%
    const critChance = (effectiveStats.acuity * 1.8).toFixed(1);

    // Stamina recovery per turn = 5 + (Toughness ÷ 5)
    const staminaRecovery = 5 + Math.floor(effectiveStats.toughness / 5);

    res.json({
      success: true,
      data: {
        heroName: hero.heroName,
        level: hero.level,
        baseStats: hero.stats.base,
        callingModifiers: hero.stats.callingMods,
        levelBonuses: hero.stats.levelBonuses,
        skillTreeBonuses: hero.stats.skillTreeBonuses,
        effectiveStats,
        vitality: {
          currentHP: hero.currentHP,
          maxHP,
          currentMP: hero.currentMP,
          maxMP,
          maxStamina,
          staminaRecovery
        },
        combat: {
          critChance: `${critChance}%`,
          baseHitChance: '50%',
          hitChanceFormula: '50 + (3 × Acuity) - (3 × Target Instinct)'
        },
        inventory: {
          capacity: inventoryCapacity,
          used: hero.inventory.length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createHero,
  getHeroes,
  getHero,
  updateHero,
  deleteHero,
  getHeroStats
};
