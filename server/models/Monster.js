const mongoose = require('mongoose');

// ========== SUB-SCHEMAS ==========

// Stat block for monster base stats
const StatBlockSchema = new mongoose.Schema({
  power: { type: Number, default: 8 },
  toughness: { type: Number, default: 8 },
  brilliance: { type: Number, default: 8 },
  spirit: { type: Number, default: 8 },
  acuity: { type: Number, default: 8 },
  instinct: { type: Number, default: 8 }
}, { _id: false });

// Monster ability schema
const AbilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  trigger: {
    type: String,
    enum: [
      'always',           // Passive, always active
      'start_of_combat',  // Triggers at combat start
      'on_crit',          // Triggers on critical hit
      'on_hit',           // Triggers when monster hits
      'when_hit',         // Triggers when monster is hit
      'below_75_hp',      // Triggers when HP drops below 75%
      'below_50_hp',      // Triggers when HP drops below 50%
      'below_25_hp',      // Triggers when HP drops below 25%
      'on_defeat',        // Triggers when monster dies
      'every_nth_turn',   // Triggers every N turns
      'when_hero_misses', // Triggers when hero misses
      'first_attack'      // Triggers on first attack only
    ],
    required: true
  },
  triggerValue: { type: Number, default: null }, // For every_nth_turn, stores N
  effect: { type: String, required: true }, // Description of effect
  effectType: {
    type: String,
    enum: [
      'stat_buff',        // Increase stats
      'stat_debuff',      // Decrease stats (applies to hero)
      'damage',           // Deal extra damage
      'heal',             // Heal monster
      'status_apply',     // Apply status effect
      'status_immune',    // Become immune to status
      'damage_reduction', // Reduce incoming damage
      'extra_attack',     // Attack additional times
      'guaranteed_crit',  // Next attack is guaranteed crit
      'unavoidable',      // Attack ignores instinct
      'counter_attack',   // Attack when triggered
      'regeneration',     // Heal over time
      'reflect_damage',   // Reflect damage to attacker
      'flavor'            // No mechanical effect
    ],
    default: 'flavor'
  },
  effectValue: { type: mongoose.Schema.Types.Mixed, default: null } // Numeric or object value
}, { _id: false });

// Reward drop schema
const RewardSchema = new mongoose.Schema({
  xp: { type: Number, required: true },
  goldMin: { type: Number, default: 0 },
  goldMax: { type: Number, default: 0 },
  items: [{
    itemId: { type: String },
    dropChance: { type: Number, default: 0.1 } // 0-1 probability
  }],
  remnant: { type: String, default: null } // Special boss drop item name
}, { _id: false });

// ========== MAIN MONSTER SCHEMA ==========

const MonsterSchema = new mongoose.Schema({
  // Unique identifier (slug format)
  monsterId: {
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

  // Monster classification
  category: {
    type: String,
    required: true,
    enum: ['beast', 'humanoid', 'faerie', 'cursed', 'construct', 'undead', 'magical_beast', 'celestial', 'aberration', 'dragon']
  },

  // Difficulty tier within category
  tier: {
    type: String,
    required: true,
    enum: ['trash', 'minion', 'elite', 'champion', 'mini_boss', 'boss']
  },

  // Suggested level for encounter
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 20
  },

  // Base statistics
  stats: {
    type: StatBlockSchema,
    required: true
  },

  // Primary damage type
  damageType: {
    type: String,
    required: true,
    enum: ['slashing', 'piercing', 'bludgeoning', 'arcane', 'fire', 'water', 'air', 'earth', 'poison']
  },

  // Secondary damage type (for bosses with dual damage)
  secondaryDamageType: {
    type: String,
    enum: ['slashing', 'piercing', 'bludgeoning', 'arcane', 'fire', 'water', 'air', 'earth', 'poison', null],
    default: null
  },

  // Biome tags where this monster can spawn
  habitatTags: [{
    type: String,
    enum: [
      'forest', 'mountain', 'swamp', 'desert', 'tundra',
      'coast', 'river', 'plains', 'cave', 'ruin',
      'arcane', 'holy', 'corrupt', 'volcanic', 'underground',
      'sky', 'urban', 'rural', 'wild', 'haunted',
      'mechanical', 'fey', 'abyssal', 'celestial', 'primal',
      'crossroad', 'city', 'crypt', 'bluff', 'cursed'
    ]
  }],

  // Special abilities (Elite+ monsters)
  abilities: [AbilitySchema],

  // Rewards on defeat
  rewards: {
    type: RewardSchema,
    required: true
  },

  // Narrative description
  description: {
    type: String,
    default: ''
  },

  // For fixed location spawns (Champions, Mini-Bosses, Bosses)
  fixedLocationId: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// ========== VIRTUALS ==========

// HP multipliers by tier
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

// Max HP calculation
MonsterSchema.virtual('maxHP').get(function() {
  const multiplier = HP_MULTIPLIERS[this.tier] || 5;
  return this.stats.toughness * multiplier;
});

// Max MP calculation (Spirit × 5)
MonsterSchema.virtual('maxMP').get(function() {
  return this.stats.spirit * 5;
});

// Get effective stats with category modifier
MonsterSchema.virtual('effectiveStats').get(function() {
  const modifier = CATEGORY_MODIFIERS[this.category] || 1.0;
  return {
    power: Math.floor(this.stats.power * modifier),
    toughness: Math.floor(this.stats.toughness * modifier),
    brilliance: Math.floor(this.stats.brilliance * modifier),
    spirit: Math.floor(this.stats.spirit * modifier),
    acuity: Math.floor(this.stats.acuity * modifier),
    instinct: Math.floor(this.stats.instinct * modifier)
  };
});

// Get weaknesses for this monster's category
MonsterSchema.virtual('weaknesses').get(function() {
  return CATEGORY_DEFENSES[this.category]?.weaknesses || [];
});

// Get resistance for this monster's category
MonsterSchema.virtual('resistance').get(function() {
  return CATEGORY_DEFENSES[this.category]?.resistance || null;
});

// Get immunity for this monster's category
MonsterSchema.virtual('immunity').get(function() {
  return CATEGORY_DEFENSES[this.category]?.immunity || null;
});

// ========== METHODS ==========

// Calculate damage multiplier based on incoming damage type
MonsterSchema.methods.getDamageMultiplier = function(damageType) {
  const defenses = CATEGORY_DEFENSES[this.category];
  if (!defenses) return 1.0;

  if (defenses.weaknesses.includes(damageType)) return 1.5;
  if (defenses.resistance === damageType) return 0.5;
  if (defenses.immunity === damageType) return 0;
  return 1.0;
};

// Get combat-ready monster data
MonsterSchema.methods.toCombatObject = function() {
  return {
    id: this._id,
    monsterId: this.monsterId,
    name: this.name,
    category: this.category,
    tier: this.tier,
    level: this.level,
    stats: this.effectiveStats,
    maxHP: this.maxHP,
    maxMP: this.maxMP,
    damageType: this.damageType,
    secondaryDamageType: this.secondaryDamageType,
    abilities: this.abilities,
    weaknesses: this.weaknesses,
    resistance: this.resistance,
    immunity: this.immunity,
    description: this.description
  };
};

// ========== STATICS ==========

// Get random monster for biome and tier
MonsterSchema.statics.getRandomForBiome = async function(biomeTags, allowedTiers = ['trash', 'minion', 'elite']) {
  const monsters = await this.find({
    habitatTags: { $in: biomeTags },
    tier: { $in: allowedTiers },
    fixedLocationId: null // Exclude fixed spawns
  });

  if (monsters.length === 0) return null;
  return monsters[Math.floor(Math.random() * monsters.length)];
};

// Get fixed monster for location
MonsterSchema.statics.getForLocation = function(locationId) {
  return this.findOne({ fixedLocationId: locationId });
};

// ========== INDEXES ==========

MonsterSchema.index({ category: 1, tier: 1 });
MonsterSchema.index({ habitatTags: 1 });
MonsterSchema.index({ fixedLocationId: 1 });
MonsterSchema.index({ tier: 1 });

// Ensure virtuals are included in JSON output
MonsterSchema.set('toJSON', { virtuals: true });
MonsterSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Monster', MonsterSchema);
