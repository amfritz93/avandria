const mongoose = require('mongoose');

// ========== SUB-SCHEMAS ==========

// Connection to another location
const ConnectionSchema = new mongoose.Schema({
  locationId: { type: String, required: true },
  passageType: {
    type: String,
    enum: ['road', 'river', 'bridge', 'stairs', 'trapdoor', 'cave_mouth', 'portal'],
    default: 'road'
  },
  isHidden: { type: Boolean, default: false }, // Secret paths
  isOneWay: { type: Boolean, default: false }, // Can't go back this way
  requiresKey: { type: String, default: null } // Item ID needed to pass
}, { _id: false });

// Monster spawn configuration
const MonsterSpawnSchema = new mongoose.Schema({
  tiers: [{
    type: String,
    enum: ['trash', 'minion', 'elite', 'champion', 'mini_boss', 'boss']
  }],
  fixedMonster: { type: String, default: null }, // For Champions/Bosses - specific monster ID
  count: { type: Number, default: 1 }, // Number of monsters at this location
  respawns: { type: Boolean, default: false } // Whether monsters come back
}, { _id: false });

// Flavor text for different states
const FlavorTextSchema = new mongoose.Schema({
  corrupted: { type: String, default: '' },
  cleansed: { type: String, default: '' },
  welcome: { type: String, default: '' } // For always-safe locations
}, { _id: false });

// Services available at settlements
const ServicesSchema = new mongoose.Schema({
  merchant: { type: Boolean, default: false },
  inn: { type: Boolean, default: false },
  apothecary: { type: Boolean, default: false },
  trainer: { type: Boolean, default: false }
}, { _id: false });

// Gate requirements
const GateSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['none', 'champions', 'mini_boss', 'boss'],
    default: 'none'
  },
  regionId: { type: String, default: null }, // Which region's champions/bosses
  requiredCount: { type: Number, default: 0 } // How many must be defeated
}, { _id: false });

// ========== MAIN LOCATION SCHEMA ==========

const LocationSchema = new mongoose.Schema({
  // Unique identifier (slug format: "verdant_wilds", "sunlit_glades", etc.)
  locationId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  // Display name
  name: {
    type: String,
    required: true,
    trim: true
  },

  // Geographic hierarchy type
  locationType: {
    type: String,
    required: true,
    enum: ['origin', 'hub', 'region', 'territory', 'sector', 'site', 'passage']
  },

  // Parent location in hierarchy (null for Avandria origin)
  parentLocationId: {
    type: String,
    default: null
  },

  // Site-specific type (only for locationType: 'site')
  siteType: {
    type: String,
    enum: ['settlement', 'clearing', 'landmark', 'lair', 'dungeon', 'vault', null],
    default: null
  },

  // Settlement size (only for siteType: 'settlement')
  settlementSize: {
    type: String,
    enum: ['kingdom', 'city', 'village', null],
    default: null
  },

  // Services available (only for settlements)
  services: {
    type: ServicesSchema,
    default: () => ({})
  },

  // Connections to other locations
  connections: [ConnectionSchema],

  // Monster spawning configuration
  monsters: {
    type: MonsterSpawnSchema,
    default: () => ({ tiers: [], count: 0, respawns: false })
  },

  // Gate requirements (for Lair/Dungeon/Vault access)
  gate: {
    type: GateSchema,
    default: () => ({ type: 'none' })
  },

  // Narrative flavor text
  flavorText: {
    type: FlavorTextSchema,
    default: () => ({})
  },

  // Biome tags for thematic consistency and monster spawning
  biomeTags: [{
    type: String,
    enum: [
      'forest', 'mountain', 'swamp', 'desert', 'tundra',
      'coast', 'river', 'plains', 'cave', 'ruin',
      'arcane', 'holy', 'corrupt', 'volcanic', 'underground',
      'sky', 'urban', 'rural', 'wild', 'haunted',
      'mechanical', 'fey', 'abyssal', 'celestial', 'primal'
    ]
  }],

  // Region metadata (only for locationType: 'region')
  regionData: {
    monsterCategory: {
      type: String,
      enum: ['beast', 'humanoid', 'faerie', 'cursed', 'construct', 'undead', 'magical_beast', 'celestial', 'aberration', 'dragon', null],
      default: null
    },
    difficultyTier: {
      type: Number,
      min: 1,
      max: 5,
      default: null
    },
    isSecret: { type: Boolean, default: false },
    accessedFrom: { type: String, default: null } // Which region contains the secret entrance
  },

  // Is this location always safe (no monsters ever)?
  alwaysSafe: {
    type: Boolean,
    default: false
  },

  // Display order for UI (lower = appears first)
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// ========== INDEXES ==========

LocationSchema.index({ locationType: 1 });
LocationSchema.index({ parentLocationId: 1 });
LocationSchema.index({ 'regionData.monsterCategory': 1 });
LocationSchema.index({ biomeTags: 1 });

// ========== VIRTUALS ==========

// Get all child locations
LocationSchema.virtual('children', {
  ref: 'Location',
  localField: 'locationId',
  foreignField: 'parentLocationId'
});

// ========== METHODS ==========

// Check if a hero can access this location based on gates
LocationSchema.methods.canAccess = function(heroWorldProgress) {
  if (this.gate.type === 'none') return true;

  const regionId = this.gate.regionId;

  switch (this.gate.type) {
    case 'champions':
      // Check if required champions in this region are defeated
      const defeatedChampions = heroWorldProgress.defeatedChampions || [];
      // This would need to check against champion IDs for this region
      return defeatedChampions.length >= this.gate.requiredCount;

    case 'mini_boss':
      // Check if mini-boss for this region is defeated
      const defeatedMiniBosses = heroWorldProgress.defeatedMiniBosses || [];
      return defeatedMiniBosses.some(id => id.toString().includes(regionId));

    case 'boss':
      // Check if boss for this region is defeated
      const defeatedBosses = heroWorldProgress.defeatedBosses || [];
      return defeatedBosses.some(id => id.toString().includes(regionId));

    default:
      return true;
  }
};

// Get the current state (corrupted/cleansed/welcome) for a hero
LocationSchema.methods.getState = function(heroClearedSites) {
  if (this.alwaysSafe) return 'welcome';
  if (!this.monsters || this.monsters.count === 0) return 'welcome';

  const isCleared = heroClearedSites && heroClearedSites.includes(this.locationId);
  return isCleared ? 'cleansed' : 'corrupted';
};

// Get appropriate flavor text based on state
LocationSchema.methods.getFlavorText = function(heroClearedSites) {
  const state = this.getState(heroClearedSites);
  return this.flavorText[state] || this.flavorText.corrupted || '';
};

// Check if hero can move forward from this location
LocationSchema.methods.canProgressFrom = function(heroClearedSites) {
  // Always safe locations don't need clearing
  if (this.alwaysSafe) return true;

  // No monsters means can always progress
  if (!this.monsters || this.monsters.count === 0) return true;

  // Must clear monsters to progress forward
  return heroClearedSites && heroClearedSites.includes(this.locationId);
};

// ========== STATICS ==========

// Get all regions (visible from Crossroads)
LocationSchema.statics.getVisibleRegions = function() {
  return this.find({
    locationType: 'region',
    'regionData.isSecret': false
  }).sort({ displayOrder: 1 });
};

// Get all locations in a region hierarchy
LocationSchema.statics.getRegionHierarchy = async function(regionId) {
  const locations = await this.find({
    $or: [
      { locationId: regionId },
      { parentLocationId: regionId }
    ]
  });

  // Build a map for quick lookup
  const locationMap = new Map();
  locations.forEach(loc => locationMap.set(loc.locationId, loc));

  // Get nested children recursively
  const getChildren = async (parentId) => {
    const children = await this.find({ parentLocationId: parentId });
    for (const child of children) {
      locationMap.set(child.locationId, child);
      await getChildren(child.locationId);
    }
  };

  await getChildren(regionId);
  return Array.from(locationMap.values());
};

// Ensure virtuals are included in JSON output
LocationSchema.set('toJSON', { virtuals: true });
LocationSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Location', LocationSchema);
