/**
 * Territory 2: The Whispering Thicket
 * Dense forest leading to Champion #1 and secret path to The Dreaming Woods
 * Sites: 6 | Champions: 1 | Secret Access: The Dreaming Woods
 */

const whisperingThicketLocations = [
  // ========== TERRITORY ENTRY ==========
  {
    locationId: 'whispering_thicket',
    name: 'The Whispering Thicket',
    locationType: 'territory',
    parentLocationId: 'verdant_wilds',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'verdant_wilds', passageType: 'road' },
      { locationId: 'shaded_path', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      corrupted: 'The forest thickens here, ancient trees pressing close until their branches weave a roof that blocks the sky. Whispers drift between the trunks — not wind, but something else, voices half-heard and never understood. Twisted roots break through the path like grasping hands, and the air grows heavy with moss and mystery. Something powerful has claimed these woods, and the trees themselves seem to warn you away. The thicket keeps its secrets — will you uncover them?',
      cleansed: 'The forest stands tall and proud, ancient trees forming a cathedral of green and gold where light dances through the leaves. The whispers remain, but now they speak of welcome, of gratitude, of peace restored. The winding paths feel inviting rather than treacherous, roots settling back into the earth. Whatever darkness claimed these woods has been driven out by your hand. The thicket remembers its champion.'
    },
    biomeTags: ['forest', 'wild', 'fey'],
    displayOrder: 110
  },

  // ========== SHADED PATH (Passage - Trash) ==========
  {
    locationId: 'shaded_path',
    name: 'Shaded Path',
    locationType: 'passage',
    parentLocationId: 'whispering_thicket',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'whispering_thicket', passageType: 'road' },
      { locationId: 'twisted_roots', passageType: 'road' }
    ],
    monsters: { tiers: ['trash'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The path narrows as trees crowd close, their branches interweaving overhead to block most of the light. Shadows pool in every hollow, and the air is thick with the smell of moss and decay. Something watches from the darkness between the trunks — you can feel eyes upon you. The whispers here are louder, almost forming words that slip away before understanding. This path leads deeper into the thicket — are you prepared for what waits?',
      cleansed: 'The path winds gently through towering trees, their branches creating a living canopy of green and gold. Dappled light plays across the forest floor, and the air smells fresh with moss and wildflowers. Small creatures rustle in the underbrush, going about their lives without fear. The whispers here are soft now, like the forest breathing in contentment. You cleared this path of darkness.'
    },
    biomeTags: ['forest', 'wild'],
    displayOrder: 111
  },

  // ========== TWISTED ROOTS (Sector - Minion) ==========
  {
    locationId: 'twisted_roots',
    name: 'Twisted Roots',
    locationType: 'sector',
    parentLocationId: 'whispering_thicket',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'shaded_path', passageType: 'road' },
      { locationId: 'mossheart_grove', passageType: 'road' }
    ],
    monsters: { tiers: ['minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The forest floor buckles and writhes with exposed roots, ancient trees lifting their foundations from the earth like grasping claws. The path becomes treacherous, forcing careful steps over tangled wood. Something has disturbed the natural order here — the roots move, slowly but perceptibly, as if seeking prey. The whispers grow urgent, warning of what lies ahead. Even the forest itself has turned hostile — will you press on?',
      cleansed: 'The great roots have settled back into the earth, forming natural steps and bridges through this ancient part of the forest. The trees stand patient and proud, their foundations once again at peace. Small flowers bloom in the gaps between roots, and mushrooms glow faintly in the deeper shadows. The whispers here are grateful, the forest acknowledging its debt. You untangled the corruption at the heart of these woods.'
    },
    biomeTags: ['forest', 'wild', 'corrupt'],
    displayOrder: 112
  },

  // ========== MOSSHEART GROVE (Clearing - Minion/Elite) ==========
  {
    locationId: 'mossheart_grove',
    name: 'Mossheart Grove',
    locationType: 'site',
    parentLocationId: 'whispering_thicket',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'twisted_roots', passageType: 'road' },
      { locationId: 'heart_of_thorns', passageType: 'road' },
      { locationId: 'veilwood', passageType: 'road' }
    ],
    monsters: { tiers: ['minion', 'elite'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'A clearing opens in the heart of the thicket, carpeted in deep moss that muffles all sound. Ancient stones rise from the green like teeth, their surfaces carved with symbols older than memory. The air feels charged here, heavy with power both natural and corrupted. Two paths lead deeper — one toward thorns and darkness, another toward something stranger still. The grove holds its breath, waiting to see which path you choose.',
      cleansed: 'The clearing breathes with life, deep moss carpeting the ground in shades of emerald and jade. Ancient stones stand sentinel, their carvings now clear — blessings in a language older than kingdoms. The air hums with natural magic, pure and peaceful. Both paths from here lead to places you have healed, thorns cut and veils lifted. Mossheart Grove remembers what you did for this forest.'
    },
    biomeTags: ['forest', 'arcane', 'wild'],
    displayOrder: 113
  },

  // ========== HEART OF THORNS (Landmark - Champion #1) ==========
  {
    locationId: 'heart_of_thorns',
    name: 'The Heart of Thorns',
    locationType: 'site',
    parentLocationId: 'whispering_thicket',
    siteType: 'landmark',
    alwaysSafe: false,
    connections: [
      { locationId: 'mossheart_grove', passageType: 'road' }
    ],
    monsters: {
      tiers: ['champion'],
      count: 1,
      fixedMonster: 'brambleclaw_alpha',
      respawns: false
    },
    flavorText: {
      corrupted: 'Thorns rise in twisted walls, forming a natural arena at the heart of the thicket. Something ancient has made its lair here, a creature of the wild grown monstrous with corruption. The ground is littered with bones — travelers who ventured too deep and never returned. The whispers here have fallen silent, as if the forest itself fears what dwells within. This is the heart of the corruption in these woods — will you cut it out?',
      cleansed: 'The thorns have receded, leaving behind a natural amphitheater ringed with wildflowers. The bones have been buried, given rest at last, and new growth covers the scars of battle. The forest whispers gratitude here, the ancient trees bowing their branches toward the center. Whatever monster claimed this place is gone, its corruption purged. You became the champion these woods needed.'
    },
    biomeTags: ['forest', 'corrupt', 'wild'],
    displayOrder: 114
  },

  // ========== THE VEILWOOD (Clearing - Elite) ==========
  {
    locationId: 'veilwood',
    name: 'The Veilwood',
    locationType: 'site',
    parentLocationId: 'whispering_thicket',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'mossheart_grove', passageType: 'road' },
      { locationId: 'withering_winterberry', passageType: 'portal', isHidden: true }
    ],
    monsters: { tiers: ['elite'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The forest grows strange here, trees twisting in shapes that hurt the eye. Colors shift at the edges of vision, and the air tastes of something sweet and wrong. This is a place between places, where the veil between worlds grows thin. The whispers here speak in languages that shouldn\'t exist, promising wonders and horrors in equal measure. Something powerful guards this liminal space — but what lies beyond?',
      cleansed: 'The trees still twist in otherworldly shapes, but now they feel wondrous rather than wrong. Colors dance at the edges of vision, hints of beauty from beyond the veil. This is a place between places, and you have made it safe to stand within. The whispers here speak of gratitude in languages older than mortal tongues. The guardian is gone — and the path beyond stands open to those brave enough to take it.'
    },
    biomeTags: ['forest', 'fey', 'arcane'],
    displayOrder: 115
  },

  // ========== WITHERING WINTERBERRY (Portal to Dreaming Woods) ==========
  {
    locationId: 'withering_winterberry',
    name: 'Withering Winterberry',
    locationType: 'passage',
    parentLocationId: 'whispering_thicket',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'veilwood', passageType: 'portal' },
      { locationId: 'dreaming_woods', passageType: 'portal', isOneWay: true }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      corrupted: 'A single winterberry bush grows where no winterberry should survive, its branches heavy with frost-white berries that glow with inner light. The air around it shimmers, reality growing thin as morning mist. This is a threshold, a door between worlds that should not exist in mortal lands. The berries whisper promises of a realm beyond — the Dreaming Woods, where the fey hold court. Step through, and you may not find your way back the same path.',
      cleansed: 'The winterberry bush blooms eternal, its frost-white berries casting gentle light across the threshold between worlds. The shimmer in the air feels welcoming now, an invitation rather than a warning. You cleared the path to this place, and now the door stands open for any brave enough to walk between realms. The Dreaming Woods await beyond — a secret region few mortals ever see. You earned this passage.'
    },
    biomeTags: ['fey', 'arcane'],
    displayOrder: 116
  }
];

module.exports = whisperingThicketLocations;
