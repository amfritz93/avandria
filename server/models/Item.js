const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  // ========== IDENTITY ==========
  itemId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },

  // ========== CLASSIFICATION ==========
  itemType: {
    type: String,
    required: true,
    enum: ['weapon', 'armor', 'consumable', 'junk']
  },
  rarity: {
    type: String,
    required: true,
    enum: ['worn', 'common', 'uncommon', 'rare', 'epic'],
    default: 'common'
  },

  // ========== EQUIPMENT SPECIFIC ==========
  gearSlot: {
    type: String,
    enum: ['head', 'torso', 'arms', 'legs', 'feet', 'primaryWeapon', 'secondaryWeapon', null],
    default: null
  },
  gearArchetype: {
    type: String,
    enum: [
      // Weapons
      'sword', 'mace', 'axe', 'dagger', 'bow', 'staff', 'wand', 'focus',
      // Armor types
      'heavy', 'medium', 'light',
      null
    ],
    default: null
  },

  // ========== STAT MODIFIERS ==========
  statModifiers: {
    power: { type: Number, default: 0 },
    toughness: { type: Number, default: 0 },
    brilliance: { type: Number, default: 0 },
    spirit: { type: Number, default: 0 },
    acuity: { type: Number, default: 0 },
    instinct: { type: Number, default: 0 }
  },

  // ========== COMBAT MODIFIERS ==========
  attackModifier: { type: Number, default: 0 },  // Physical/Magical attack bonus
  defenseModifier: { type: Number, default: 0 }, // Physical/Magical defense bonus

  // ========== ECONOMY ==========
  purchasePrice: { type: Number, default: 0 },
  saleValue: { type: Number, default: 0 },

  // ========== CONSUMABLE SPECIFIC ==========
  consumptionEffect: {
    type: String,
    enum: ['heal_hp', 'restore_mp', 'restore_stamina', 'remove_status', 'buff_stat', 'unlock', null],
    default: null
  },
  effectValue: { type: Number, default: 0 },
  targetStat: {
    type: String,
    enum: ['hp', 'mp', 'stamina', 'power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct', 'all_status', null],
    default: null
  },
  duration: { type: Number, default: 0 }, // For draughts (turns)

  // ========== FLAGS ==========
  isStackable: { type: Boolean, default: false },
  isStarterItem: { type: Boolean, default: false },
  callingRestriction: {
    type: String,
    enum: ['warrior', 'paladin', 'hunter', 'rogue', 'mage', 'priest', 'bard', 'druid', null],
    default: null
  }
}, {
  timestamps: true
});

// Index for faster lookups
ItemSchema.index({ itemId: 1 });
ItemSchema.index({ itemType: 1 });
ItemSchema.index({ isStarterItem: 1 });
ItemSchema.index({ callingRestriction: 1 });

module.exports = mongoose.model('Item', ItemSchema);
