/**
 * Callings Data
 * 8 playable callings with stat modifiers, specializations, and skill tree paths
 *
 * Calling Stat Modifiers (applied at character creation):
 * - Primary: +2
 * - Secondary: +1
 * - Tertiary: +1
 */

const callings = {
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    description: 'The quintessential master of arms. Warriors rely on raw strength and physical training to dominate the front lines, shrugging off damage while delivering forceful, reliable attacks.',
    statModifiers: {
      power: 2,       // Primary
      toughness: 1,   // Secondary
      brilliance: 0,
      spirit: 0,
      acuity: 1,      // Tertiary
      instinct: 0
    },
    modifierRoles: {
      primary: 'power',
      secondary: 'toughness',
      tertiary: 'acuity'
    },
    specializations: {
      physical1: 'sword',
      physical2: 'mace',
      magical: 'staff',
      armor: 'heavy'
    },
    startingResources: {
      gold: 10,
      rations: 8
    },
    resourceRationale: 'Soldier\'s pay, military rations',
    startingInventory: {
      flavorItems: ['Soldier\'s Badge', 'Whetstone'],
      consumables: [
        { itemId: 'CONS_HEALTH_LESSER', quantity: 2 }
      ]
    },
    skillTreePaths: {
      power: 'Path of the Berserker',
      toughness: 'Path of the Bulwark',
      brilliance: 'Path of the Spellblade',
      spirit: 'Path of the Unyielding',
      acuity: 'Path of the Weaponmaster',
      instinct: 'Path of the Veteran'
    }
  },

  paladin: {
    id: 'paladin',
    name: 'Paladin',
    description: 'Holy defenders sworn to protect the innocent. Their faith grants them incredible physical and magical fortitude, allowing them to shield allies while delivering righteous, measured justice.',
    statModifiers: {
      power: 1,       // Tertiary
      toughness: 2,   // Primary
      brilliance: 0,
      spirit: 1,      // Secondary
      acuity: 0,
      instinct: 0
    },
    modifierRoles: {
      primary: 'toughness',
      secondary: 'spirit',
      tertiary: 'power'
    },
    specializations: {
      physical1: 'mace',
      physical2: 'axe',
      magical: 'focus',
      armor: 'heavy'
    },
    startingResources: {
      gold: 15,
      rations: 6
    },
    resourceRationale: 'Church funding',
    startingInventory: {
      flavorItems: ['Holy Symbol', 'Bandages'],
      consumables: [
        { itemId: 'CONS_HEALTH_LESSER', quantity: 2 }
      ]
    },
    skillTreePaths: {
      power: 'Path of the Crusader',
      toughness: 'Path of the Aegis',
      brilliance: 'Path of Sacred Flame',
      spirit: 'Path of the Faithful',
      acuity: 'Path of Judgment',
      instinct: 'Path of Vigilance'
    }
  },

  hunter: {
    id: 'hunter',
    name: 'Hunter',
    description: 'Apex trackers and ambush specialists. Hunters combine precise aim with knowledge of the land, focusing on landing accurate, debilitating attacks from a distance or exploiting a foe\'s weakness.',
    statModifiers: {
      power: 1,       // Tertiary
      toughness: 0,
      brilliance: 0,
      spirit: 0,
      acuity: 2,      // Primary
      instinct: 1     // Secondary
    },
    modifierRoles: {
      primary: 'acuity',
      secondary: 'instinct',
      tertiary: 'power'
    },
    specializations: {
      physical1: 'bow',
      physical2: 'dagger',
      magical: 'wand',
      armor: 'medium'
    },
    startingResources: {
      gold: 5,
      rations: 12
    },
    resourceRationale: 'Lives off the land',
    startingInventory: {
      flavorItems: ['Worn Map Fragment', 'Snare Wire'],
      consumables: [
        { itemId: 'CONS_HEALTH_LESSER', quantity: 1 },
        { itemId: 'CONS_LOCKPICK', quantity: 1 }
      ]
    },
    skillTreePaths: {
      power: 'Path of the Gorilla',
      toughness: 'Path of the Rhino',
      brilliance: 'Path of the Whale',
      spirit: 'Path of the Wolf',
      acuity: 'Path of the Owl',
      instinct: 'Path of the Hawk'
    }
  },

  rogue: {
    id: 'rogue',
    name: 'Rogue',
    description: 'Masters of stealth, misdirection, and evasion. Rogues survive by being impossible to hit, positioning themselves for deadly backstabs and relying on quick wits over brute force.',
    statModifiers: {
      power: 1,       // Tertiary
      toughness: 0,
      brilliance: 0,
      spirit: 0,
      acuity: 1,      // Secondary
      instinct: 2     // Primary
    },
    modifierRoles: {
      primary: 'instinct',
      secondary: 'acuity',
      tertiary: 'power'
    },
    specializations: {
      physical1: 'dagger',
      physical2: 'bow',
      magical: 'wand',
      armor: 'medium'
    },
    startingResources: {
      gold: 20,
      rations: 5
    },
    resourceRationale: 'Stolen goods',
    startingInventory: {
      flavorItems: ['Thieves\' Tools', 'Loaded Dice'],
      consumables: [
        { itemId: 'CONS_HEALTH_LESSER', quantity: 1 },
        { itemId: 'CONS_LOCKPICK', quantity: 3 }
      ]
    },
    skillTreePaths: {
      power: 'Path of the Assassin',
      toughness: 'Path of Evasion',
      brilliance: 'Path of the Trickster',
      spirit: 'Path of the Ghost',
      acuity: 'Path of the Viper',
      instinct: 'Path of Second Sight'
    }
  },

  mage: {
    id: 'mage',
    name: 'Mage',
    description: 'Scholars and practitioners of the arcane arts. Mages channel pure magical energy to devastating effect, requiring intense focus to deliver complex spells that bypass physical defenses.',
    statModifiers: {
      power: 0,
      toughness: 0,
      brilliance: 2,  // Primary
      spirit: 1,      // Tertiary
      acuity: 1,      // Secondary
      instinct: 0
    },
    modifierRoles: {
      primary: 'brilliance',
      secondary: 'acuity',
      tertiary: 'spirit'
    },
    specializations: {
      physical1: 'dagger',
      physical2: 'axe',
      magical: 'staff',
      armor: 'light'
    },
    startingResources: {
      gold: 15,
      rations: 4
    },
    resourceRationale: 'Academic stipend',
    startingInventory: {
      flavorItems: ['Spell Component Pouch', 'Candle'],
      consumables: [
        { itemId: 'CONS_MANA_LESSER', quantity: 2 }
      ]
    },
    skillTreePaths: {
      power: 'Path of Destruction',
      toughness: 'Path of Warding',
      brilliance: 'Path of the Arcanist',
      spirit: 'Path of the Sage',
      acuity: 'Path of the Evoker',
      instinct: 'Path of Spellbreaking'
    }
  },

  priest: {
    id: 'priest',
    name: 'Priest',
    description: 'Devoted healers and protectors of the soul. Priests specialize in magical resistance and support, bolstering their allies and using divine energy to mend wounds or ward off magical threats.',
    statModifiers: {
      power: 0,
      toughness: 1,   // Tertiary
      brilliance: 1,  // Secondary
      spirit: 2,      // Primary
      acuity: 0,
      instinct: 0
    },
    modifierRoles: {
      primary: 'spirit',
      secondary: 'brilliance',
      tertiary: 'toughness'
    },
    specializations: {
      physical1: 'mace',
      physical2: 'bow',
      magical: 'focus',
      armor: 'light'
    },
    startingResources: {
      gold: 10,
      rations: 6
    },
    resourceRationale: 'Temple support',
    startingInventory: {
      flavorItems: ['Prayer Beads', 'Incense'],
      consumables: [
        { itemId: 'CONS_HEALTH_LESSER', quantity: 1 },
        { itemId: 'CONS_MANA_LESSER', quantity: 1 }
      ]
    },
    skillTreePaths: {
      power: 'Path of the Exorcist',
      toughness: 'Path of the Martyr',
      brilliance: 'Path of the Healer',
      spirit: 'Path of the Blessed',
      acuity: 'Path of the Mender',
      instinct: 'Path of the Judicator'
    }
  },

  bard: {
    id: 'bard',
    name: 'Bard',
    description: 'Wandering minstrels and inspiring leaders. Bards weave music, poetry, and charisma into powerful magical effects, relying on their captivating stage presence to bolster allies, confuse foes, and turn the tide of battle with a song.',
    statModifiers: {
      power: 1,       // Secondary
      toughness: 0,
      brilliance: 0,
      spirit: 2,      // Primary
      acuity: 1,      // Tertiary
      instinct: 0
    },
    modifierRoles: {
      primary: 'spirit',
      secondary: 'power',
      tertiary: 'acuity'
    },
    specializations: {
      physical1: 'sword',
      physical2: 'dagger',
      magical: 'wand',
      armor: 'light'
    },
    startingResources: {
      gold: 15,
      rations: 5
    },
    resourceRationale: 'Performance income',
    startingInventory: {
      flavorItems: ['Worn Songbook', 'Flask of Wine'],
      consumables: [
        { itemId: 'CONS_HEALTH_LESSER', quantity: 1 },
        { itemId: 'CONS_MANA_LESSER', quantity: 1 }
      ]
    },
    skillTreePaths: {
      power: 'Path of the Warcry',
      toughness: 'Path of the Shield Song',
      brilliance: 'Path of the Siren',
      spirit: 'Path of the Muse',
      acuity: 'Path of Mockery',
      instinct: 'Path of the Virtuoso'
    }
  },

  druid: {
    id: 'druid',
    name: 'Druid',
    description: 'Keepers of the wild and shapeshifting protectors. Druids draw their power from the primal forces of nature, shifting their form to embody animal strength or calling upon the elements to mend life, unleash storms, and enforce the balance of the natural world.',
    statModifiers: {
      power: 0,
      toughness: 0,
      brilliance: 2,  // Primary
      spirit: 1,      // Secondary
      acuity: 0,
      instinct: 1     // Tertiary
    },
    modifierRoles: {
      primary: 'brilliance',
      secondary: 'spirit',
      tertiary: 'instinct'
    },
    specializations: {
      physical1: 'mace',
      physical2: 'sword',
      magical: 'staff',
      armor: 'medium'
    },
    startingResources: {
      gold: 5,
      rations: 10
    },
    resourceRationale: 'Nature provides',
    startingInventory: {
      flavorItems: ['Herb Pouch', 'Seed Bundle'],
      consumables: [
        { itemId: 'CONS_HEALTH_LESSER', quantity: 1 },
        { itemId: 'CONS_ANTIDOTE', quantity: 1 }
      ]
    },
    skillTreePaths: {
      power: 'Path of Wildfire',
      toughness: 'Path of Stone',
      brilliance: 'Path of the Stars',
      spirit: 'Path of Spores',
      acuity: 'Path of Thorns',
      instinct: 'Path of Wildshape'
    }
  }
};

// Export as array for iteration and as object for lookup
module.exports = {
  callings,
  callingsArray: Object.values(callings),
  callingIds: Object.keys(callings)
};
