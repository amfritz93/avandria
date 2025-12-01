/**
 * Species Data
 * 12 playable species with stat distributions, descriptions, and starting resources
 *
 * Stat Distribution System:
 * - Primary (P): 13
 * - Secondary (S): 10
 * - Weakness (W): 5
 * - Neutral: 8
 */

const species = {
  human: {
    id: 'human',
    name: 'Human',
    description: 'Most widespread and adaptable. Fierce drive to overcome challenges through quick wit and resilience.',
    stats: {
      power: 10,      // Secondary
      toughness: 8,   // Neutral
      brilliance: 5,  // Weakness
      spirit: 8,      // Neutral
      acuity: 13,     // Primary
      instinct: 8     // Neutral
    },
    archetype: {
      primary: 'acuity',
      secondary: 'power',
      weakness: 'brilliance'
    },
    startingResources: {
      gold: 15,
      rations: 5
    },
    rationale: 'Adaptable, well-prepared'
  },

  elf: {
    id: 'elf',
    name: 'Elf',
    description: 'Graceful, ancient beings of the deep woods. Keen eyesight grants precision; spirit resists magic, but frail in combat.',
    stats: {
      power: 8,       // Neutral
      toughness: 5,   // Weakness
      brilliance: 8,  // Neutral
      spirit: 10,     // Secondary
      acuity: 13,     // Primary
      instinct: 8     // Neutral
    },
    archetype: {
      primary: 'acuity',
      secondary: 'spirit',
      weakness: 'toughness'
    },
    startingResources: {
      gold: 10,
      rations: 8
    },
    rationale: 'Woodland foragers'
  },

  dwarf: {
    id: 'dwarf',
    name: 'Dwarf',
    description: 'Stout, incredibly hardy masters of stonework and forging. Withstand enormous punishment but lack grace.',
    stats: {
      power: 10,      // Secondary
      toughness: 13,  // Primary
      brilliance: 8,  // Neutral
      spirit: 8,      // Neutral
      acuity: 8,      // Neutral
      instinct: 5     // Weakness
    },
    archetype: {
      primary: 'toughness',
      secondary: 'power',
      weakness: 'instinct'
    },
    startingResources: {
      gold: 25,
      rations: 3
    },
    rationale: 'Wealthy miners, less travel'
  },

  gnome: {
    id: 'gnome',
    name: 'Gnome',
    description: 'Tiny masters of magic and invention. Devastating casters but lack physical might.',
    stats: {
      power: 5,       // Weakness
      toughness: 8,   // Neutral
      brilliance: 13, // Primary
      spirit: 8,      // Neutral
      acuity: 10,     // Secondary
      instinct: 8     // Neutral
    },
    archetype: {
      primary: 'brilliance',
      secondary: 'acuity',
      weakness: 'power'
    },
    startingResources: {
      gold: 20,
      rations: 4
    },
    rationale: 'Inventors, traders'
  },

  orc: {
    id: 'orc',
    name: 'Orc',
    description: 'Massive, physically overwhelming brutes. Shatter bone with a blow but vulnerable to spells.',
    stats: {
      power: 13,      // Primary
      toughness: 10,  // Secondary
      brilliance: 8,  // Neutral
      spirit: 5,      // Weakness
      acuity: 8,      // Neutral
      instinct: 8     // Neutral
    },
    archetype: {
      primary: 'power',
      secondary: 'toughness',
      weakness: 'spirit'
    },
    startingResources: {
      gold: 5,
      rations: 10
    },
    rationale: 'Survivalists, poor wealth'
  },

  goliath: {
    id: 'goliath',
    name: 'Goliath',
    description: 'Towering nomads from mountain peaks. Hardened skin but struggle with fine motor skills.',
    stats: {
      power: 10,      // Secondary
      toughness: 13,  // Primary
      brilliance: 8,  // Neutral
      spirit: 8,      // Neutral
      acuity: 5,      // Weakness
      instinct: 8     // Neutral
    },
    archetype: {
      primary: 'toughness',
      secondary: 'power',
      weakness: 'acuity'
    },
    startingResources: {
      gold: 5,
      rations: 12
    },
    rationale: 'Mountain nomads'
  },

  tiefling: {
    id: 'tiefling',
    name: 'Tiefling',
    description: 'Marked by fiendish heritage. Intuitive dark magic talent at the cost of physical force.',
    stats: {
      power: 5,       // Weakness
      toughness: 8,   // Neutral
      brilliance: 13, // Primary
      spirit: 10,     // Secondary
      acuity: 8,      // Neutral
      instinct: 8     // Neutral
    },
    archetype: {
      primary: 'brilliance',
      secondary: 'spirit',
      weakness: 'power'
    },
    startingResources: {
      gold: 15,
      rations: 5
    },
    rationale: 'Outcasts but resourceful'
  },

  goblin: {
    id: 'goblin',
    name: 'Goblin',
    description: 'Small, manic, and surprisingly quick. Survive through evasion but fragile.',
    stats: {
      power: 5,       // Weakness
      toughness: 8,   // Neutral
      brilliance: 8,  // Neutral
      spirit: 10,     // Secondary
      acuity: 8,      // Neutral
      instinct: 13    // Primary
    },
    archetype: {
      primary: 'instinct',
      secondary: 'spirit',
      weakness: 'power'
    },
    startingResources: {
      gold: 10,
      rations: 8
    },
    rationale: 'Scavengers'
  },

  aarakocra: {
    id: 'aarakocra',
    name: 'Aarakocra',
    description: 'Winged humanoids from high skies. Powerful aerial strikes but no magical affinity.',
    stats: {
      power: 13,      // Primary
      toughness: 8,   // Neutral
      brilliance: 5,  // Weakness
      spirit: 8,      // Neutral
      acuity: 10,     // Secondary
      instinct: 8     // Neutral
    },
    archetype: {
      primary: 'power',
      secondary: 'acuity',
      weakness: 'brilliance'
    },
    startingResources: {
      gold: 5,
      rations: 6
    },
    rationale: 'Sky dwellers, minimal possessions'
  },

  vulpine: {
    id: 'vulpine',
    name: 'Vulpine',
    description: 'Fox-like race with sharp senses and high precision. Evasive but fragile in prolonged fights.',
    stats: {
      power: 5,       // Weakness
      toughness: 8,   // Neutral
      brilliance: 8,  // Neutral
      spirit: 10,     // Secondary
      acuity: 13,     // Primary
      instinct: 8     // Neutral
    },
    archetype: {
      primary: 'acuity',
      secondary: 'spirit',
      weakness: 'power'
    },
    startingResources: {
      gold: 15,
      rations: 6
    },
    rationale: 'Clever traders'
  },

  sylvan: {
    id: 'sylvan',
    name: 'Sylvan',
    description: 'Ancient, tree-like beings. Incredible magical resistance but ponderous.',
    stats: {
      power: 8,       // Neutral
      toughness: 10,  // Secondary
      brilliance: 8,  // Neutral
      spirit: 13,     // Primary
      acuity: 8,      // Neutral
      instinct: 5     // Weakness
    },
    archetype: {
      primary: 'spirit',
      secondary: 'toughness',
      weakness: 'instinct'
    },
    startingResources: {
      gold: 5,
      rations: 15
    },
    rationale: 'One with nature, no need for gold'
  },

  sprite: {
    id: 'sprite',
    name: 'Sprite',
    description: 'Diminutive beings of light. Magical powerhouses lacking physical mass.',
    stats: {
      power: 5,       // Weakness
      toughness: 8,   // Neutral
      brilliance: 13, // Primary
      spirit: 8,      // Neutral
      acuity: 10,     // Secondary
      instinct: 8     // Neutral
    },
    archetype: {
      primary: 'brilliance',
      secondary: 'acuity',
      weakness: 'power'
    },
    startingResources: {
      gold: 10,
      rations: 4
    },
    rationale: 'Tiny, can\'t carry much'
  }
};

// Export as array for iteration and as object for lookup
module.exports = {
  species,
  speciesArray: Object.values(species),
  speciesIds: Object.keys(species)
};
