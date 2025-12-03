/**
 * The Verdant Wilds - Region Entry
 * Beast Category, Tier 1 (Easiest), 5 Territories
 */

const verdantWildsRegion = {
  locationId: 'verdant_wilds',
  name: 'The Verdant Wilds',
  locationType: 'region',
  parentLocationId: 'crossroads',
  siteType: null,
  alwaysSafe: false,
  regionData: {
    monsterCategory: 'beast',
    difficultyTier: 1,
    isSecret: false,
    accessedFrom: null
  },
  connections: [
    { locationId: 'crossroads', passageType: 'road' },
    { locationId: 'sunlit_glades', passageType: 'road' },
    { locationId: 'whispering_thicket', passageType: 'road' },
    { locationId: 'windswept_plains', passageType: 'road' },
    { locationId: 'stonepaw_highlands', passageType: 'road' },
    { locationId: 'mistfall_coast', passageType: 'road' }
  ],
  monsters: { tiers: ['minion'], count: 1, respawns: false },
  flavorText: {
    corrupted: 'The Verdant Wilds stretches before you — rolling green hills and ancient forests, beautiful yet wounded. The air carries wildflowers and something feral beneath, a wrongness that has turned nature against itself. Five paths branch ahead: sunlit meadows, whispering woods, open plains, rocky highlands, and a misty shore. Tracks in the soft earth speak of beasts grown bold and hungry. This land was once a paradise — will you restore it?',
    cleansed: 'The Verdant Wilds stretches before you — a paradise reclaimed, thriving as it was meant to be. The air is sweet with wildflowers, and gentle sounds of nature surround you without threat. Five paths branch ahead, each leading to lands you have healed: peaceful meadows, singing woods, bustling plains, proud highlands, and tranquil shores. The beasts have returned to their natural ways, predator and prey in balance. You gave this land back to itself.'
  },
  biomeTags: ['forest', 'wild', 'primal'],
  displayOrder: 10
};

module.exports = verdantWildsRegion;
