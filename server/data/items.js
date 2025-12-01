/**
 * Items Data
 * Starting equipment, consumables, and junk items
 *
 * Worn items provide no stat bonuses - they are narrative placeholders
 * until players acquire better gear through purchase or loot
 */

const items = {
  // ========== WORN WEAPONS (Starter - No Bonuses) ==========

  // Swords
  WEAPON_SWORD_WORN: {
    itemId: 'WEAPON_SWORD_WORN',
    name: 'Worn Sword',
    description: 'A battle-worn blade with a dull edge and nicked hilt. It has seen better days.',
    itemType: 'weapon',
    rarity: 'worn',
    gearSlot: 'primaryWeapon',
    gearArchetype: 'sword',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },

  // Maces
  WEAPON_MACE_WORN: {
    itemId: 'WEAPON_MACE_WORN',
    name: 'Worn Mace',
    description: 'A crude bludgeon with a cracked wooden handle. The head is dented but functional.',
    itemType: 'weapon',
    rarity: 'worn',
    gearSlot: 'primaryWeapon',
    gearArchetype: 'mace',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },

  // Axes
  WEAPON_AXE_WORN: {
    itemId: 'WEAPON_AXE_WORN',
    name: 'Worn Axe',
    description: 'A rusted hatchet with a loose head. More intimidating than effective.',
    itemType: 'weapon',
    rarity: 'worn',
    gearSlot: 'primaryWeapon',
    gearArchetype: 'axe',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },

  // Daggers
  WEAPON_DAGGER_WORN: {
    itemId: 'WEAPON_DAGGER_WORN',
    name: 'Worn Dagger',
    description: 'A tarnished blade barely longer than a kitchen knife. Quick but unremarkable.',
    itemType: 'weapon',
    rarity: 'worn',
    gearSlot: 'primaryWeapon',
    gearArchetype: 'dagger',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },

  // Bows
  WEAPON_BOW_WORN: {
    itemId: 'WEAPON_BOW_WORN',
    name: 'Worn Bow',
    description: 'A weathered shortbow with a frayed string. Accurate enough for hunting small game.',
    itemType: 'weapon',
    rarity: 'worn',
    gearSlot: 'primaryWeapon',
    gearArchetype: 'bow',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },

  // Staves
  WEAPON_STAFF_WORN: {
    itemId: 'WEAPON_STAFF_WORN',
    name: 'Worn Staff',
    description: 'A gnarled wooden staff with faint, faded runes. Its magical potency has long waned.',
    itemType: 'weapon',
    rarity: 'worn',
    gearSlot: 'secondaryWeapon',
    gearArchetype: 'staff',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },

  // Wands
  WEAPON_WAND_WORN: {
    itemId: 'WEAPON_WAND_WORN',
    name: 'Worn Wand',
    description: 'A splintered focus of carved wood. The crystal tip is cracked and clouded.',
    itemType: 'weapon',
    rarity: 'worn',
    gearSlot: 'secondaryWeapon',
    gearArchetype: 'wand',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },

  // Foci
  WEAPON_FOCUS_WORN: {
    itemId: 'WEAPON_FOCUS_WORN',
    name: 'Worn Focus',
    description: 'A tarnished holy symbol on a frayed cord. Its divine connection feels distant.',
    itemType: 'weapon',
    rarity: 'worn',
    gearSlot: 'secondaryWeapon',
    gearArchetype: 'focus',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },

  // ========== WORN ARMOR (Starter - No Bonuses) ==========

  // Heavy Armor Set
  ARMOR_HEAVY_HEAD_WORN: {
    itemId: 'ARMOR_HEAVY_HEAD_WORN',
    name: 'Worn Plate Helm',
    description: 'A dented iron helm with rusted rivets. Offers minimal protection.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'head',
    gearArchetype: 'heavy',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 8,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_HEAVY_TORSO_WORN: {
    itemId: 'ARMOR_HEAVY_TORSO_WORN',
    name: 'Worn Plate Cuirass',
    description: 'Battered plate armor with missing rivets. The straps barely hold it together.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'torso',
    gearArchetype: 'heavy',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 12,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_HEAVY_ARMS_WORN: {
    itemId: 'ARMOR_HEAVY_ARMS_WORN',
    name: 'Worn Plate Vambraces',
    description: 'Scratched arm guards with bent clasps. They rattle with every movement.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'arms',
    gearArchetype: 'heavy',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 6,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_HEAVY_LEGS_WORN: {
    itemId: 'ARMOR_HEAVY_LEGS_WORN',
    name: 'Worn Plate Greaves',
    description: 'Heavy leg plates with dented knee guards. Movement is awkward at best.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'legs',
    gearArchetype: 'heavy',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 8,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_HEAVY_FEET_WORN: {
    itemId: 'ARMOR_HEAVY_FEET_WORN',
    name: 'Worn Plate Sabatons',
    description: 'Clunky iron boots with corroded hinges. They clang loudly with each step.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'feet',
    gearArchetype: 'heavy',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 6,
    saleValue: 2,
    isStarterItem: true
  },

  // Medium Armor Set
  ARMOR_MEDIUM_HEAD_WORN: {
    itemId: 'ARMOR_MEDIUM_HEAD_WORN',
    name: 'Worn Leather Hood',
    description: 'A faded leather hood with frayed edges. Offers shade more than protection.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'head',
    gearArchetype: 'medium',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 6,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_MEDIUM_TORSO_WORN: {
    itemId: 'ARMOR_MEDIUM_TORSO_WORN',
    name: 'Worn Leather Vest',
    description: 'A cracked leather jerkin with missing buckles. The hide has lost its toughness.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'torso',
    gearArchetype: 'medium',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 10,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_MEDIUM_ARMS_WORN: {
    itemId: 'ARMOR_MEDIUM_ARMS_WORN',
    name: 'Worn Leather Bracers',
    description: 'Stiff leather arm guards with loose lacing. They chafe more than they protect.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'arms',
    gearArchetype: 'medium',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_MEDIUM_LEGS_WORN: {
    itemId: 'ARMOR_MEDIUM_LEGS_WORN',
    name: 'Worn Leather Pants',
    description: 'Patched leather leggings with worn knees. Flexible but thin.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'legs',
    gearArchetype: 'medium',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 6,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_MEDIUM_FEET_WORN: {
    itemId: 'ARMOR_MEDIUM_FEET_WORN',
    name: 'Worn Leather Boots',
    description: 'Scuffed boots with thin soles. Good for travel, not for battle.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'feet',
    gearArchetype: 'medium',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 5,
    saleValue: 2,
    isStarterItem: true
  },

  // Light Armor Set
  ARMOR_LIGHT_HEAD_WORN: {
    itemId: 'ARMOR_LIGHT_HEAD_WORN',
    name: 'Worn Cloth Cap',
    description: 'A faded cloth cap with loose threading. Barely more than a head covering.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'head',
    gearArchetype: 'light',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 4,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_LIGHT_TORSO_WORN: {
    itemId: 'ARMOR_LIGHT_TORSO_WORN',
    name: 'Worn Cloth Robe',
    description: 'A threadbare robe with patched elbows. Its magical wards have long faded.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'torso',
    gearArchetype: 'light',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 8,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_LIGHT_ARMS_WORN: {
    itemId: 'ARMOR_LIGHT_ARMS_WORN',
    name: 'Worn Cloth Wraps',
    description: 'Simple arm wrappings of frayed cloth. They offer comfort, not protection.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'arms',
    gearArchetype: 'light',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 3,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_LIGHT_LEGS_WORN: {
    itemId: 'ARMOR_LIGHT_LEGS_WORN',
    name: 'Worn Cloth Leggings',
    description: 'Simple cloth pants with thin fabric. Movement is easy but defense is lacking.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'legs',
    gearArchetype: 'light',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 4,
    saleValue: 2,
    isStarterItem: true
  },
  ARMOR_LIGHT_FEET_WORN: {
    itemId: 'ARMOR_LIGHT_FEET_WORN',
    name: 'Worn Cloth Slippers',
    description: 'Soft slippers with worn soles. Quiet but offer no real protection.',
    itemType: 'armor',
    rarity: 'worn',
    gearSlot: 'feet',
    gearArchetype: 'light',
    statModifiers: { power: 0, toughness: 0, brilliance: 0, spirit: 0, acuity: 0, instinct: 0 },
    attackModifier: 0,
    defenseModifier: 0,
    purchasePrice: 3,
    saleValue: 2,
    isStarterItem: true
  },

  // ========== CONSUMABLES ==========

  // Health Elixirs
  CONS_HEALTH_LESSER: {
    itemId: 'CONS_HEALTH_LESSER',
    name: 'Lesser Health Elixir',
    description: 'A small vial of red liquid that restores a modest amount of health.',
    itemType: 'consumable',
    rarity: 'common',
    consumptionEffect: 'heal_hp',
    effectValue: 15,
    targetStat: 'hp',
    purchasePrice: 10,
    saleValue: 5,
    isStackable: true
  },
  CONS_HEALTH_REGULAR: {
    itemId: 'CONS_HEALTH_REGULAR',
    name: 'Health Elixir',
    description: 'A flask of crimson liquid that restores a moderate amount of health.',
    itemType: 'consumable',
    rarity: 'uncommon',
    consumptionEffect: 'heal_hp',
    effectValue: 35,
    targetStat: 'hp',
    purchasePrice: 25,
    saleValue: 12,
    isStackable: true
  },
  CONS_HEALTH_GREATER: {
    itemId: 'CONS_HEALTH_GREATER',
    name: 'Greater Health Elixir',
    description: 'A potent brew of deep scarlet that restores a large amount of health.',
    itemType: 'consumable',
    rarity: 'rare',
    consumptionEffect: 'heal_hp',
    effectValue: 60,
    targetStat: 'hp',
    purchasePrice: 50,
    saleValue: 25,
    isStackable: true
  },

  // Mana Elixirs
  CONS_MANA_LESSER: {
    itemId: 'CONS_MANA_LESSER',
    name: 'Lesser Mana Elixir',
    description: 'A small vial of blue liquid that restores a modest amount of mana.',
    itemType: 'consumable',
    rarity: 'common',
    consumptionEffect: 'restore_mp',
    effectValue: 15,
    targetStat: 'mp',
    purchasePrice: 10,
    saleValue: 5,
    isStackable: true
  },
  CONS_MANA_REGULAR: {
    itemId: 'CONS_MANA_REGULAR',
    name: 'Mana Elixir',
    description: 'A flask of azure liquid that restores a moderate amount of mana.',
    itemType: 'consumable',
    rarity: 'uncommon',
    consumptionEffect: 'restore_mp',
    effectValue: 35,
    targetStat: 'mp',
    purchasePrice: 25,
    saleValue: 12,
    isStackable: true
  },
  CONS_MANA_GREATER: {
    itemId: 'CONS_MANA_GREATER',
    name: 'Greater Mana Elixir',
    description: 'A potent brew of deep sapphire that restores a large amount of mana.',
    itemType: 'consumable',
    rarity: 'rare',
    consumptionEffect: 'restore_mp',
    effectValue: 60,
    targetStat: 'mp',
    purchasePrice: 50,
    saleValue: 25,
    isStackable: true
  },

  // Stamina Elixirs
  CONS_STAMINA_LESSER: {
    itemId: 'CONS_STAMINA_LESSER',
    name: 'Lesser Stamina Elixir',
    description: 'A small vial of green liquid that restores a modest amount of stamina.',
    itemType: 'consumable',
    rarity: 'common',
    consumptionEffect: 'restore_stamina',
    effectValue: 20,
    targetStat: 'stamina',
    purchasePrice: 10,
    saleValue: 5,
    isStackable: true
  },

  // Utility Consumables
  CONS_ANTIDOTE: {
    itemId: 'CONS_ANTIDOTE',
    name: 'Antidote',
    description: 'A bitter tonic that purges all harmful status effects from your body.',
    itemType: 'consumable',
    rarity: 'common',
    consumptionEffect: 'remove_status',
    effectValue: 0,
    targetStat: 'all_status',
    purchasePrice: 15,
    saleValue: 7,
    isStackable: true
  },
  CONS_LOCKPICK: {
    itemId: 'CONS_LOCKPICK',
    name: 'Lockpick',
    description: 'A thin metal tool for opening locked doors. Consumed on use.',
    itemType: 'consumable',
    rarity: 'common',
    consumptionEffect: 'unlock',
    effectValue: 1,
    targetStat: null,
    purchasePrice: 8,
    saleValue: 4,
    isStackable: true
  },

  // ========== JUNK/FLAVOR ITEMS ==========

  JUNK_SOLDIER_BADGE: {
    itemId: 'JUNK_SOLDIER_BADGE',
    name: 'Soldier\'s Badge',
    description: 'A worn military insignia marking past service. Worth a few coins to collectors.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 3,
    isStarterItem: true,
    callingRestriction: 'warrior'
  },
  JUNK_WHETSTONE: {
    itemId: 'JUNK_WHETSTONE',
    name: 'Whetstone',
    description: 'A smooth stone for sharpening blades. Essential gear for any warrior.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 2,
    isStarterItem: true,
    callingRestriction: 'warrior'
  },
  JUNK_HOLY_SYMBOL: {
    itemId: 'JUNK_HOLY_SYMBOL',
    name: 'Holy Symbol',
    description: 'A blessed pendant marking devotion to the divine. Comforting but not powerful.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 4,
    isStarterItem: true,
    callingRestriction: 'paladin'
  },
  JUNK_BANDAGES: {
    itemId: 'JUNK_BANDAGES',
    name: 'Bandages',
    description: 'Clean cloth strips for binding wounds. A paladin is always prepared.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 2,
    isStarterItem: true,
    callingRestriction: 'paladin'
  },
  JUNK_WORN_MAP: {
    itemId: 'JUNK_WORN_MAP',
    name: 'Worn Map Fragment',
    description: 'A torn piece of an old map. The landmarks are barely recognizable.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 2,
    isStarterItem: true,
    callingRestriction: 'hunter'
  },
  JUNK_SNARE_WIRE: {
    itemId: 'JUNK_SNARE_WIRE',
    name: 'Snare Wire',
    description: 'A coil of thin wire for setting traps. Every hunter carries spare wire.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 2,
    isStarterItem: true,
    callingRestriction: 'hunter'
  },
  JUNK_THIEVES_TOOLS: {
    itemId: 'JUNK_THIEVES_TOOLS',
    name: 'Thieves\' Tools',
    description: 'A small kit of specialized picks and tension wrenches. Essential for any rogue.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 5,
    isStarterItem: true,
    callingRestriction: 'rogue'
  },
  JUNK_LOADED_DICE: {
    itemId: 'JUNK_LOADED_DICE',
    name: 'Loaded Dice',
    description: 'A pair of weighted dice. A rogue\'s best friend in games of chance.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 3,
    isStarterItem: true,
    callingRestriction: 'rogue'
  },
  JUNK_SPELL_POUCH: {
    itemId: 'JUNK_SPELL_POUCH',
    name: 'Spell Component Pouch',
    description: 'A small bag filled with various arcane reagents. Mostly depleted.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 3,
    isStarterItem: true,
    callingRestriction: 'mage'
  },
  JUNK_CANDLE: {
    itemId: 'JUNK_CANDLE',
    name: 'Candle',
    description: 'A simple tallow candle. Essential for late-night studies.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 1,
    isStarterItem: true,
    callingRestriction: 'mage'
  },
  JUNK_PRAYER_BEADS: {
    itemId: 'JUNK_PRAYER_BEADS',
    name: 'Prayer Beads',
    description: 'A string of worn wooden beads used for meditation and prayer.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 3,
    isStarterItem: true,
    callingRestriction: 'priest'
  },
  JUNK_INCENSE: {
    itemId: 'JUNK_INCENSE',
    name: 'Incense',
    description: 'A bundle of fragrant incense sticks. The scent brings peace.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 2,
    isStarterItem: true,
    callingRestriction: 'priest'
  },
  JUNK_SONGBOOK: {
    itemId: 'JUNK_SONGBOOK',
    name: 'Worn Songbook',
    description: 'A tattered book of ballads and tavern songs. The pages are dog-eared.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 3,
    isStarterItem: true,
    callingRestriction: 'bard'
  },
  JUNK_FLASK_WINE: {
    itemId: 'JUNK_FLASK_WINE',
    name: 'Flask of Wine',
    description: 'A small flask of cheap wine. Liquid courage for performances.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 2,
    isStarterItem: true,
    callingRestriction: 'bard'
  },
  JUNK_HERB_POUCH: {
    itemId: 'JUNK_HERB_POUCH',
    name: 'Herb Pouch',
    description: 'A leather pouch containing various dried herbs. The scent of nature lingers.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 3,
    isStarterItem: true,
    callingRestriction: 'druid'
  },
  JUNK_SEED_BUNDLE: {
    itemId: 'JUNK_SEED_BUNDLE',
    name: 'Seed Bundle',
    description: 'A small cloth bundle of assorted seeds. Life waiting to be planted.',
    itemType: 'junk',
    rarity: 'common',
    purchasePrice: 0,
    saleValue: 2,
    isStarterItem: true,
    callingRestriction: 'druid'
  }
};

// Helper function to get starting equipment based on calling
const getStarterEquipment = (calling) => {
  const callingEquipment = {
    warrior: {
      primaryWeapon: 'WEAPON_SWORD_WORN',
      secondaryWeapon: 'WEAPON_STAFF_WORN',
      armor: 'heavy'
    },
    paladin: {
      primaryWeapon: 'WEAPON_MACE_WORN',
      secondaryWeapon: 'WEAPON_FOCUS_WORN',
      armor: 'heavy'
    },
    hunter: {
      primaryWeapon: 'WEAPON_BOW_WORN',
      secondaryWeapon: 'WEAPON_WAND_WORN',
      armor: 'medium'
    },
    rogue: {
      primaryWeapon: 'WEAPON_DAGGER_WORN',
      secondaryWeapon: 'WEAPON_WAND_WORN',
      armor: 'medium'
    },
    mage: {
      primaryWeapon: 'WEAPON_DAGGER_WORN',
      secondaryWeapon: 'WEAPON_STAFF_WORN',
      armor: 'light'
    },
    priest: {
      primaryWeapon: 'WEAPON_MACE_WORN',
      secondaryWeapon: 'WEAPON_FOCUS_WORN',
      armor: 'light'
    },
    bard: {
      primaryWeapon: 'WEAPON_SWORD_WORN',
      secondaryWeapon: 'WEAPON_WAND_WORN',
      armor: 'light'
    },
    druid: {
      primaryWeapon: 'WEAPON_MACE_WORN',
      secondaryWeapon: 'WEAPON_STAFF_WORN',
      armor: 'medium'
    }
  };

  const equipment = callingEquipment[calling];
  const armorPrefix = `ARMOR_${equipment.armor.toUpperCase()}`;

  return {
    primaryWeapon: equipment.primaryWeapon,
    secondaryWeapon: equipment.secondaryWeapon,
    head: `${armorPrefix}_HEAD_WORN`,
    torso: `${armorPrefix}_TORSO_WORN`,
    arms: `${armorPrefix}_ARMS_WORN`,
    legs: `${armorPrefix}_LEGS_WORN`,
    feet: `${armorPrefix}_FEET_WORN`
  };
};

module.exports = {
  items,
  itemsArray: Object.values(items),
  itemIds: Object.keys(items),
  getStarterEquipment
};
