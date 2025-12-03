const Hero = require('../models/Hero');
const Location = require('../models/Location');
const Monster = require('../models/Monster');

// Import location data for seeding/lookup
const tutorialLocations = require('../data/locations/tutorial');
const verdantWilds = require('../data/locations/verdantWilds');

/**
 * Helper: Get location from database or seed data
 * Falls back to seed data if not in database (for development)
 */
const getLocationData = async (locationId) => {
  // Try database first
  let location = await Location.findOne({ locationId });

  if (!location) {
    // Fall back to seed data
    const allLocations = [
      ...tutorialLocations,
      ...verdantWilds.getAllLocations()
    ];
    const seedData = allLocations.find(loc => loc.locationId === locationId);
    if (seedData) {
      // Return a mock location object that matches the schema
      return {
        ...seedData,
        _id: null,
        isFromSeed: true
      };
    }
  }

  return location;
};

/**
 * @desc    Get location details with connections
 * @route   GET /api/navigation/location/:locationId
 * @access  Private
 *
 * Returns location info including:
 * - Basic info (name, type, description)
 * - Flavor text based on hero's cleared status
 * - Available connections/destinations
 * - Services (if settlement)
 * - Monster info (if has monsters)
 */
const getLocation = async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const heroId = req.query.heroId;
    const accountId = req.user.id;

    // Get location data
    const location = await getLocationData(locationId);
    if (!location) {
      return res.status(404).json({
        success: false,
        message: `Location not found: ${locationId}`
      });
    }

    // Get hero for context (cleared sites, discovered sites)
    let heroContext = null;
    if (heroId) {
      const hero = await Hero.findById(heroId);
      if (hero && hero.account.toString() === accountId) {
        heroContext = {
          clearedSites: hero.worldProgress.clearedSites || [],
          discoveredSites: hero.worldProgress.discoveredSites || [],
          defeatedChampions: hero.worldProgress.defeatedChampions || [],
          defeatedMiniBosses: hero.worldProgress.defeatedMiniBosses || [],
          defeatedBosses: hero.worldProgress.defeatedBosses || []
        };
      }
    }

    // Determine location state
    const isCleared = heroContext?.clearedSites.includes(locationId);
    const state = location.alwaysSafe ? 'welcome' : (isCleared ? 'cleansed' : 'corrupted');

    // Get appropriate flavor text
    const flavorText = location.flavorText?.[state] || location.flavorText?.corrupted || '';

    // Get available connections
    const connections = await Promise.all(
      (location.connections || []).map(async (conn) => {
        const connLocation = await getLocationData(conn.locationId);
        const isDiscovered = heroContext?.discoveredSites.includes(conn.locationId);
        const isAccessible = !conn.isHidden || isDiscovered;

        return {
          locationId: conn.locationId,
          name: connLocation?.name || conn.locationId,
          passageType: conn.passageType,
          isHidden: conn.isHidden || false,
          isOneWay: conn.isOneWay || false,
          isDiscovered,
          isAccessible
        };
      })
    );

    // Check for monsters at this location
    let monsterInfo = null;
    if (location.monsters && location.monsters.count > 0 && !isCleared) {
      if (location.monsters.fixedMonster) {
        // Fixed spawn (Champion, Mini-Boss, Boss)
        const monster = await Monster.findOne({ monsterId: location.monsters.fixedMonster });
        if (monster) {
          monsterInfo = {
            type: 'fixed',
            tier: monster.tier,
            name: monster.name,
            level: monster.level
          };
        }
      } else {
        // Random spawn
        monsterInfo = {
          type: 'random',
          tiers: location.monsters.tiers,
          count: location.monsters.count
        };
      }
    }

    // Check gate requirements
    let gateInfo = null;
    if (location.gate && location.gate.type !== 'none') {
      const regionId = location.gate.regionId;
      let isUnlocked = false;

      switch (location.gate.type) {
        case 'champions':
          // Need to check how many champions defeated in this region
          // For now, simplified check
          isUnlocked = (heroContext?.defeatedChampions.length || 0) >= (location.gate.requiredCount || 3);
          break;
        case 'mini_boss':
          isUnlocked = heroContext?.defeatedMiniBosses.length > 0;
          break;
        case 'boss':
          isUnlocked = heroContext?.defeatedBosses.length > 0;
          break;
      }

      gateInfo = {
        type: location.gate.type,
        requiredCount: location.gate.requiredCount,
        isUnlocked
      };
    }

    res.json({
      success: true,
      data: {
        location: {
          locationId: location.locationId,
          name: location.name,
          locationType: location.locationType,
          siteType: location.siteType,
          settlementSize: location.settlementSize,
          alwaysSafe: location.alwaysSafe,
          biomeTags: location.biomeTags,
          state,
          flavorText,
          services: location.services,
          regionData: location.regionData
        },
        connections: connections.filter(c => c.isAccessible),
        hiddenConnections: connections.filter(c => !c.isAccessible && c.isHidden),
        monsters: monsterInfo,
        gate: gateInfo,
        heroContext: heroContext ? {
          isCleared,
          canProgress: location.alwaysSafe || isCleared || (location.monsters?.count === 0)
        } : null
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Move hero to a new location
 * @route   POST /api/navigation/move
 * @access  Private
 *
 * Body:
 * - heroId: string (required)
 * - destinationId: string (required)
 *
 * Validates:
 * - Hero owns the request
 * - Destination is connected to current location
 * - Current location is cleared (for forward movement)
 * - Gate requirements met (for Lair/Dungeon/Vault)
 */
const moveHero = async (req, res, next) => {
  try {
    const { heroId, destinationId } = req.body;
    const accountId = req.user.id;

    if (!heroId || !destinationId) {
      return res.status(400).json({
        success: false,
        message: 'heroId and destinationId are required'
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
    const currentLocation = await getLocationData(currentLocationId);
    if (!currentLocation) {
      return res.status(404).json({
        success: false,
        message: `Current location not found: ${currentLocationId}`
      });
    }

    // Get destination location
    const destinationLocation = await getLocationData(destinationId);
    if (!destinationLocation) {
      return res.status(404).json({
        success: false,
        message: `Destination not found: ${destinationId}`
      });
    }

    // Check if destination is connected
    const connection = (currentLocation.connections || []).find(
      c => c.locationId === destinationId
    );

    // Also check reverse connection (for backtracking)
    const reverseConnection = (destinationLocation.connections || []).find(
      c => c.locationId === currentLocationId
    );

    if (!connection && !reverseConnection) {
      return res.status(400).json({
        success: false,
        message: `Cannot travel from ${currentLocationId} to ${destinationId} - not connected`
      });
    }

    // Determine if this is forward movement or backtracking
    const isBacktracking = hero.worldProgress.discoveredSites.includes(destinationId);

    // For forward movement, check if current location is cleared
    if (!isBacktracking) {
      const isCurrentCleared = hero.worldProgress.clearedSites.includes(currentLocationId);
      const canProgress = currentLocation.alwaysSafe || isCurrentCleared ||
                         (currentLocation.monsters?.count === 0);

      if (!canProgress) {
        return res.status(400).json({
          success: false,
          message: 'Must clear all monsters at current location before advancing'
        });
      }
    }

    // Check gate requirements for destination
    if (destinationLocation.gate && destinationLocation.gate.type !== 'none') {
      let isUnlocked = false;

      switch (destinationLocation.gate.type) {
        case 'champions':
          isUnlocked = (hero.worldProgress.defeatedChampions.length || 0) >=
                       (destinationLocation.gate.requiredCount || 3);
          break;
        case 'mini_boss':
          isUnlocked = hero.worldProgress.defeatedMiniBosses.length > 0;
          break;
        case 'boss':
          isUnlocked = hero.worldProgress.defeatedBosses.length > 0;
          break;
      }

      if (!isUnlocked) {
        return res.status(400).json({
          success: false,
          message: `This location is locked. Requirement: ${destinationLocation.gate.type}`,
          gate: destinationLocation.gate
        });
      }
    }

    // Check for hidden path requirements
    if (connection?.isHidden && !hero.worldProgress.discoveredSites.includes(destinationId)) {
      // Hidden paths need to be discovered first (through combat or exploration)
      return res.status(400).json({
        success: false,
        message: 'This path has not been discovered yet'
      });
    }

    // Update hero navigation
    hero.navigation.currentSite = destinationId;

    // Update path stack for backtracking
    if (isBacktracking) {
      // Remove locations from stack until we find destination
      while (hero.navigation.pathStack.length > 0 &&
             hero.navigation.pathStack[hero.navigation.pathStack.length - 1] !== destinationId) {
        hero.navigation.pathStack.pop();
      }
    } else {
      // Add new location to stack
      hero.navigation.pathStack.push(destinationId);
    }

    // Add to discovered sites if new
    if (!hero.worldProgress.discoveredSites.includes(destinationId)) {
      hero.worldProgress.discoveredSites.push(destinationId);
    }

    // Update last played
    hero.lastPlayedAt = new Date();

    await hero.save();

    // Get destination details for response
    const destinationDetails = await getLocationData(destinationId);
    const isCleared = hero.worldProgress.clearedSites.includes(destinationId);
    const state = destinationDetails.alwaysSafe ? 'welcome' : (isCleared ? 'cleansed' : 'corrupted');

    res.json({
      success: true,
      message: `Traveled to ${destinationDetails.name}`,
      data: {
        previousLocation: currentLocationId,
        currentLocation: {
          locationId: destinationId,
          name: destinationDetails.name,
          locationType: destinationDetails.locationType,
          siteType: destinationDetails.siteType,
          state,
          flavorText: destinationDetails.flavorText?.[state] || '',
          alwaysSafe: destinationDetails.alwaysSafe
        },
        pathStack: hero.navigation.pathStack,
        isBacktracking
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get hero's discovered map data
 * @route   GET /api/navigation/map/:heroId
 * @access  Private
 *
 * Returns all discovered locations organized by region
 * for the Map tab display
 */
const getHeroMap = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const accountId = req.user.id;

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
        message: 'Not authorized to access this hero'
      });
    }

    const discoveredSites = hero.worldProgress.discoveredSites || [];
    const clearedSites = hero.worldProgress.clearedSites || [];

    // Build map data for discovered locations
    const mapData = await Promise.all(
      discoveredSites.map(async (locationId) => {
        const location = await getLocationData(locationId);
        if (!location) return null;

        return {
          locationId: location.locationId,
          name: location.name,
          locationType: location.locationType,
          siteType: location.siteType,
          parentLocationId: location.parentLocationId,
          isCleared: clearedSites.includes(locationId),
          isCurrent: hero.navigation.currentSite === locationId,
          alwaysSafe: location.alwaysSafe
        };
      })
    );

    // Filter out nulls and organize by parent
    const validLocations = mapData.filter(Boolean);

    // Group by region/parent for hierarchical display
    const hierarchy = {};
    validLocations.forEach(loc => {
      const parent = loc.parentLocationId || 'root';
      if (!hierarchy[parent]) {
        hierarchy[parent] = [];
      }
      hierarchy[parent].push(loc);
    });

    res.json({
      success: true,
      data: {
        currentLocation: hero.navigation.currentSite,
        totalDiscovered: discoveredSites.length,
        totalCleared: clearedSites.length,
        locations: validLocations,
        hierarchy,
        pathStack: hero.navigation.pathStack
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Mark current location as cleared
 * @route   POST /api/navigation/clear
 * @access  Private
 *
 * Called after defeating all monsters at a location
 * Body:
 * - heroId: string (required)
 */
const clearLocation = async (req, res, next) => {
  try {
    const { heroId } = req.body;
    const accountId = req.user.id;

    if (!heroId) {
      return res.status(400).json({
        success: false,
        message: 'heroId is required'
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

    // Check if already cleared
    if (hero.worldProgress.clearedSites.includes(currentLocationId)) {
      return res.json({
        success: true,
        message: 'Location already cleared',
        data: { locationId: currentLocationId, alreadyCleared: true }
      });
    }

    // Get location to check for special clears (Champions, Bosses)
    const location = await getLocationData(currentLocationId);

    // Add to cleared sites
    hero.worldProgress.clearedSites.push(currentLocationId);

    // Check for Champion/Mini-Boss/Boss defeat tracking
    if (location?.monsters?.fixedMonster) {
      const monster = await Monster.findOne({ monsterId: location.monsters.fixedMonster });
      if (monster) {
        switch (monster.tier) {
          case 'champion':
            if (!hero.worldProgress.defeatedChampions.includes(monster._id)) {
              hero.worldProgress.defeatedChampions.push(monster._id);
            }
            break;
          case 'mini_boss':
            if (!hero.worldProgress.defeatedMiniBosses.includes(monster._id)) {
              hero.worldProgress.defeatedMiniBosses.push(monster._id);
            }
            break;
          case 'boss':
            if (!hero.worldProgress.defeatedBosses.includes(monster._id)) {
              hero.worldProgress.defeatedBosses.push(monster._id);
            }
            break;
        }
      }
    }

    // Reveal any hidden connections
    const revealedPaths = [];
    if (location?.connections) {
      for (const conn of location.connections) {
        if (conn.isHidden && !hero.worldProgress.discoveredSites.includes(conn.locationId)) {
          hero.worldProgress.discoveredSites.push(conn.locationId);
          revealedPaths.push(conn.locationId);
        }
      }
    }

    // Update lifetime stats
    hero.lifetimeStats.totalMonstersSlain = (hero.lifetimeStats.totalMonstersSlain || 0) + 1;

    hero.lastPlayedAt = new Date();
    await hero.save();

    res.json({
      success: true,
      message: `${location?.name || currentLocationId} has been cleared!`,
      data: {
        locationId: currentLocationId,
        locationName: location?.name,
        revealedPaths,
        worldProgress: {
          clearedCount: hero.worldProgress.clearedSites.length,
          championsDefeated: hero.worldProgress.defeatedChampions.length,
          miniBossesDefeated: hero.worldProgress.defeatedMiniBosses.length,
          bossesDefeated: hero.worldProgress.defeatedBosses.length
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLocation,
  moveHero,
  getHeroMap,
  clearLocation
};
