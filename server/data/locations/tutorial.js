/**
 * Tutorial Locations - Avandria (Origin) and The Crossroads (Hub)
 * These are always-safe locations that introduce the player to the world.
 */

const tutorialLocations = [
  // ========== AVANDRIA (ORIGIN) ==========
  {
    locationId: 'avandria',
    name: 'Avandria',
    locationType: 'origin',
    parentLocationId: null,
    siteType: null,
    alwaysSafe: true,
    connections: [
      { locationId: 'crossroads', passageType: 'road', isOneWay: true }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      corrupted: 'You open your eyes to a world both beautiful and broken — this is Avandria, and it has been waiting for you. A shadow lies across the land, a corruption that seeps into every forest, every city, every forgotten ruin. Once, these rolling hills and ancient woods thrived with life; now they hold their breath, waiting to see what you will become. The creatures of darkness grow bold, and the people of this world have all but lost hope for salvation. But you are here now, and every legend begins with a single step forward — will you take it?',
      cleansed: 'You open your eyes to a world reborn — Avandria stands healed, and it is because of you. Light fills the land where shadow once crept, and the air itself seems to hum with gratitude. The rolling hills and ancient woods burst with life once more, thriving as they were always meant to. The creatures of darkness have been vanquished, and the people speak your name in prayers of thanks. You came to this place a stranger; you leave it a legend — Avandria will never forget what you have done.'
    },
    biomeTags: ['wild', 'primal'],
    displayOrder: 0
  },

  // ========== THE CROSSROADS (HUB) ==========
  {
    locationId: 'crossroads',
    name: 'The Crossroads',
    locationType: 'hub',
    parentLocationId: null,
    siteType: null,
    alwaysSafe: true,
    connections: [
      // 7 Visible Regions (accessible from game start)
      { locationId: 'verdant_wilds', passageType: 'road' },
      { locationId: 'lawless_marches', passageType: 'road' },
      { locationId: 'blighted_moor', passageType: 'road' },
      { locationId: 'clockwork_wastes', passageType: 'road' },
      { locationId: 'hollow_kingdom', passageType: 'road' },
      { locationId: 'savage_wilds', passageType: 'road' },
      { locationId: 'obsidian_dominion', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      corrupted: 'Seven paths converge beneath an ancient stone marker, worn smooth by the countless travelers who came before you. The wind carries whispers from every direction — cries for help, warnings of danger, echoes of lands in turmoil. Each road stretches toward a distant horizon: verdant wilds, lawless marches, blighted moors, and realms stranger still. Corruption has touched every corner of Avandria, and each path leads to a region that desperately needs a champion. The choice is yours alone — where will you begin the journey that will define your legend?',
      cleansed: 'Seven paths converge beneath an ancient stone marker, its weathered surface now warm with renewed life. The wind carries laughter from every direction — songs of celebration, sounds of peace, echoes of lands restored. Each road stretches toward a distant horizon: verdant wilds thriving, lawless marches tamed, blighted moors cleansed, and wonders reclaimed. Travelers pass freely now, nodding to you with reverence — they know who walked these roads and saved them all. Every path you chose led to victory; every battle you fought brought healing — the crossroads remember.'
    },
    biomeTags: ['rural', 'wild'],
    displayOrder: 1
  }
];

module.exports = tutorialLocations;
