const mongoose = require('mongoose');

// Stat sub-schema for reuse
const StatBlockSchema = new mongoose.Schema({
  power: { type: Number, default: 0 },
  toughness: { type: Number, default: 0 },
  brilliance: { type: Number, default: 0 },
  spirit: { type: Number, default: 0 },
  acuity: { type: Number, default: 0 },
  instinct: { type: Number, default: 0 }
}, { _id: false });

// Skill branch sub-schema
const SkillBranchSchema = new mongoose.Schema({
  stage: { type: Number, default: 1, min: 1, max: 6 },
  abilities: [{ type: String }]
}, { _id: false });

// Inventory item sub-schema
const InventoryItemSchema = new mongoose.Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  quantity: { type: Number, default: 1 }
}, { _id: false });

// Monster discovery sub-schema
const MonsterDiscoverySchema = new mongoose.Schema({
  monsterId: { type: mongoose.Schema.Types.ObjectId },
  firstEncounter: { type: Date, default: Date.now }
}, { _id: false });

const HeroSchema = new mongoose.Schema({
  // ========== IDENTITY ==========
  heroName: {
    type: String,
    required: [true, 'Please provide a hero name'],
    trim: true,
    minlength: [2, 'Hero name must be at least 2 characters'],
    maxlength: [20, 'Hero name cannot exceed 20 characters']
  },
  species: {
    type: String,
    required: [true, 'Please select a species'],
    enum: ['human', 'elf', 'dwarf', 'gnome', 'orc', 'goliath', 'tiefling', 'goblin', 'aarakocra', 'vulpine', 'sylvan', 'sprite']
  },
  calling: {
    type: String,
    required: [true, 'Please select a calling'],
    enum: ['warrior', 'paladin', 'hunter', 'rogue', 'mage', 'priest', 'bard', 'druid']
  },
  genderIdentity: {
    type: String,
    required: [true, 'Please select a gender identity'],
    enum: ['male', 'female', 'non-binary', 'other']
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },

  // ========== PROGRESSION ==========
  level: { type: Number, default: 1, min: 1, max: 20 },
  currentXP: { type: Number, default: 0 },
  skillPoints: { type: Number, default: 1 }, // Start with 1 SP
  gold: { type: Number, default: 0 },

  // ========== VITALITY ==========
  currentHP: { type: Number, default: 0 },
  currentMP: { type: Number, default: 0 },
  currentRations: { type: Number, default: 0 },

  // ========== STATISTICS ==========
  stats: {
    base: { type: StatBlockSchema, default: () => ({}) },
    callingMods: { type: StatBlockSchema, default: () => ({}) },
    levelBonuses: { type: StatBlockSchema, default: () => ({}) },
    skillTreeBonuses: { type: StatBlockSchema, default: () => ({}) }
  },

  // ========== EQUIPMENT ==========
  equipment: {
    head: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
    torso: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
    arms: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
    legs: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
    feet: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
    primaryWeapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
    secondaryWeapon: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null }
  },

  // ========== INVENTORY ==========
  inventory: [InventoryItemSchema],

  // ========== SKILL TREE ==========
  skillTree: {
    power: { type: SkillBranchSchema, default: () => ({ stage: 1, abilities: ['strike'] }) },
    toughness: { type: SkillBranchSchema, default: () => ({ stage: 1, abilities: ['guard'] }) },
    brilliance: { type: SkillBranchSchema, default: () => ({ stage: 1, abilities: ['spark'] }) },
    spirit: { type: SkillBranchSchema, default: () => ({ stage: 1, abilities: ['fortify'] }) },
    acuity: { type: SkillBranchSchema, default: () => ({ stage: 1, abilities: ['focus'] }) },
    instinct: { type: SkillBranchSchema, default: () => ({ stage: 1, abilities: ['evade'] }) }
  },

  // ========== NAVIGATION ==========
  navigation: {
    currentSite: { type: String, default: 'avandria' },
    pathStack: [{ type: String }]
  },

  // ========== WORLD PROGRESS ==========
  worldProgress: {
    discoveredSites: [{ type: String }],
    clearedSites: [{ type: String }],
    defeatedChampions: [{ type: mongoose.Schema.Types.ObjectId }],
    defeatedMiniBosses: [{ type: mongoose.Schema.Types.ObjectId }],
    defeatedBosses: [{ type: mongoose.Schema.Types.ObjectId }],
    unlockedSecretRegions: [{ type: String }]
  },

  // ========== MONSTER MANUAL ==========
  monsterManual: {
    discovered: [MonsterDiscoverySchema],
    slainCounts: { type: Map, of: Number, default: {} }
  },

  // ========== LIFETIME STATISTICS ==========
  lifetimeStats: {
    totalMonstersSlain: { type: Number, default: 0 },
    totalDamageDealt: { type: Number, default: 0 },
    totalDamageReceived: { type: Number, default: 0 },
    totalGoldEarned: { type: Number, default: 0 },
    totalGoldSpent: { type: Number, default: 0 },
    totalDeaths: { type: Number, default: 0 },
    totalCriticalHits: { type: Number, default: 0 },
    totalStatusEffectsInflicted: { type: Number, default: 0 },
    totalElixirsConsumed: { type: Number, default: 0 },
    totalLockpicksUsed: { type: Number, default: 0 },
    bossesDefeated: { type: Number, default: 0 },
    regionsCompleted: { type: Number, default: 0 }
  },

  // ========== META ==========
  lastPlayedAt: { type: Date, default: Date.now },
  totalPlaytime: { type: Number, default: 0 }
}, {
  timestamps: true
});

// ========== VIRTUALS (Calculated Values) ==========

// Effective stats (sum of all stat components)
HeroSchema.virtual('effectiveStats').get(function() {
  const stats = ['power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct'];
  const effective = {};

  stats.forEach(stat => {
    effective[stat] =
      (this.stats.base[stat] || 0) +
      (this.stats.callingMods[stat] || 0) +
      (this.stats.levelBonuses[stat] || 0) +
      (this.stats.skillTreeBonuses[stat] || 0);
  });

  return effective;
});

// Max HP = 10 + (Effective Toughness × 3)
HeroSchema.virtual('maxHP').get(function() {
  const effectiveToughness =
    (this.stats.base.toughness || 0) +
    (this.stats.callingMods.toughness || 0) +
    (this.stats.levelBonuses.toughness || 0) +
    (this.stats.skillTreeBonuses.toughness || 0);
  return 10 + (effectiveToughness * 3);
});

// Max MP = 10 + (Effective Spirit × 3)
HeroSchema.virtual('maxMP').get(function() {
  const effectiveSpirit =
    (this.stats.base.spirit || 0) +
    (this.stats.callingMods.spirit || 0) +
    (this.stats.levelBonuses.spirit || 0) +
    (this.stats.skillTreeBonuses.spirit || 0);
  return 10 + (effectiveSpirit * 3);
});

// Max Stamina = Toughness × 5
HeroSchema.virtual('maxStamina').get(function() {
  const effectiveToughness =
    (this.stats.base.toughness || 0) +
    (this.stats.callingMods.toughness || 0) +
    (this.stats.levelBonuses.toughness || 0) +
    (this.stats.skillTreeBonuses.toughness || 0);
  return effectiveToughness * 5;
});

// Inventory Capacity = 10 + floor(Toughness / 3) + (Level - 1)
HeroSchema.virtual('inventoryCapacity').get(function() {
  const effectiveToughness =
    (this.stats.base.toughness || 0) +
    (this.stats.callingMods.toughness || 0) +
    (this.stats.levelBonuses.toughness || 0) +
    (this.stats.skillTreeBonuses.toughness || 0);
  return 10 + Math.floor(effectiveToughness / 3) + (this.level - 1);
});

// Ensure virtuals are included in JSON output
HeroSchema.set('toJSON', { virtuals: true });
HeroSchema.set('toObject', { virtuals: true });

// ========== METHODS ==========

// Get safe hero data for client
HeroSchema.methods.toSafeObject = function() {
  return {
    id: this._id,
    heroName: this.heroName,
    species: this.species,
    calling: this.calling,
    genderIdentity: this.genderIdentity,
    level: this.level,
    currentXP: this.currentXP,
    skillPoints: this.skillPoints,
    gold: this.gold,
    currentHP: this.currentHP,
    currentMP: this.currentMP,
    currentRations: this.currentRations,
    maxHP: this.maxHP,
    maxMP: this.maxMP,
    maxStamina: this.maxStamina,
    effectiveStats: this.effectiveStats,
    stats: this.stats,
    equipment: this.equipment,
    inventory: this.inventory,
    skillTree: this.skillTree,
    navigation: this.navigation,
    worldProgress: this.worldProgress,
    lifetimeStats: this.lifetimeStats,
    inventoryCapacity: this.inventoryCapacity,
    createdAt: this.createdAt,
    lastPlayedAt: this.lastPlayedAt,
    totalPlaytime: this.totalPlaytime
  };
};

module.exports = mongoose.model('Hero', HeroSchema);
