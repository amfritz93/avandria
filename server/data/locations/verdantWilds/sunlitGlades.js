/**
 * Territory 1: The Sunlit Glades
 * Tutorial zone - gentle introduction to exploration and combat
 * Sites: 7 | Services: Merchant, Inn, Apothecary
 */

const sunlitGladesLocations = [
  // ========== TERRITORY ENTRY ==========
  {
    locationId: 'sunlit_glades',
    name: 'The Sunlit Glades',
    locationType: 'territory',
    parentLocationId: 'verdant_wilds',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'verdant_wilds', passageType: 'road' },
      { locationId: 'dawnbreak_trail', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      corrupted: 'Golden sunlight filters through the canopy, but shadows linger where they shouldn\'t in these gentle glades. The meadows roll softly ahead, dotted with wildflowers that have begun to wilt at their edges. Birdsong falters here, replaced by uneasy silence and the rustle of things moving through tall grass. A settlement\'s rooftops peek above the distant treeline — perhaps safety, perhaps answers. Even paradise can fall to corruption — will you see what haunts these sunlit fields?',
      cleansed: 'Golden sunlight bathes the glades in warmth, every shadow now soft and welcoming. The meadows roll gently ahead, carpeted in wildflowers swaying in a peaceful breeze. Birdsong fills the air, a chorus celebrating the return of safety to these lands. The settlement\'s rooftops rise above the treeline, smoke curling from chimneys where families gather without fear. You brought the sun back to the Sunlit Glades.'
    },
    biomeTags: ['forest', 'plains', 'rural'],
    displayOrder: 100
  },

  // ========== DAWNBREAK TRAIL (Passage - Trash) ==========
  {
    locationId: 'dawnbreak_trail',
    name: 'Dawnbreak Trail',
    locationType: 'passage',
    parentLocationId: 'sunlit_glades',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'sunlit_glades', passageType: 'road' },
      { locationId: 'mossy_overlook', passageType: 'road' },
      { locationId: 'willowbrook_clearing', passageType: 'road' }
    ],
    monsters: { tiers: ['trash'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The trail winds beneath a canopy of young oaks, shafts of golden light breaking through to warm the forest floor. It should feel peaceful, but something moves in the underbrush — too large, too bold. The path ahead is well-worn by travelers, though fewer seem to pass this way lately. Broken branches and scattered feathers tell a story of small hunts, small deaths. Dawn breaks beautiful here, but beauty can hide danger — will you walk this trail?',
      cleansed: 'The trail winds beneath a canopy of young oaks, golden light warming the forest floor exactly as it should. Squirrels chatter in the branches, and a rabbit watches from the underbrush before hopping away unafraid. The path is well-worn again, footprints of travelers coming and going in peace. Wildflowers have begun to reclaim the edges of the trail, nodding in a gentle breeze. You made this path safe to walk once more.'
    },
    biomeTags: ['forest', 'rural'],
    displayOrder: 101
  },

  // ========== MOSSY OVERLOOK (Clearing - Trash) ==========
  {
    locationId: 'mossy_overlook',
    name: 'Mossy Overlook',
    locationType: 'site',
    parentLocationId: 'sunlit_glades',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'dawnbreak_trail', passageType: 'road' },
      { locationId: 'honeybee_hollow', passageType: 'road' }
    ],
    monsters: { tiers: ['trash'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The path rises to a mossy clearing where ancient stones form a natural overlook above the glades. The view should be breathtaking, but a haze hangs over the land, dulling the colors below. The moss here grows thick and undisturbed — few have rested in this place recently. Claw marks score the stones, and tufts of fur cling to the bark of nearby trees. Something claims this overlook now — will you challenge it?',
      cleansed: 'The path rises to a mossy clearing where ancient stones offer a stunning view of the glades below. Sunlight paints the rolling hills in gold and green, a patchwork of meadow and forest stretching to the horizon. The moss is soft beneath your feet, inviting rest and reflection. Birds perch on the stones, unafraid, singing to the wind. This overlook belongs to travelers again, thanks to you.'
    },
    biomeTags: ['forest', 'mountain'],
    displayOrder: 102
  },

  // ========== HONEYBEE HOLLOW (Clearing - Minion, Dead End) ==========
  {
    locationId: 'honeybee_hollow',
    name: 'Honeybee Hollow',
    locationType: 'site',
    parentLocationId: 'sunlit_glades',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'mossy_overlook', passageType: 'road' }
    ],
    monsters: { tiers: ['trash', 'minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The hollow opens into a bowl of wildflowers surrounding the hollow trunks of ancient trees — old hives, abandoned now. A strange buzzing fills the air, deeper and angrier than any bee you\'ve known. The flowers have wilted at their centers, drained of something vital, and the honey that once drew travelers here has turned dark and foul. Whatever corrupted this place guards it jealously. The hollow offers no path forward — only confrontation.',
      cleansed: 'The hollow hums with life, wildflowers swaying as bees drift lazily between blossoms and ancient hive-trees. Golden honey drips from the hollow trunks, sweet and pure, a treasure of the glades restored. The air smells of nectar and warm summer days, peaceful and perfect. This is a place of abundance again, a gift for those who wander here. You returned the hollow to its keepers.'
    },
    biomeTags: ['forest', 'wild'],
    displayOrder: 103
  },

  // ========== WILLOWBROOK CLEARING (Sector - Minion) ==========
  {
    locationId: 'willowbrook_clearing',
    name: 'Willowbrook Clearing',
    locationType: 'sector',
    parentLocationId: 'sunlit_glades',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'dawnbreak_trail', passageType: 'road' },
      { locationId: 'hearthstone', passageType: 'road' },
      { locationId: 'old_orchard', passageType: 'road' }
    ],
    monsters: { tiers: ['trash', 'minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'Willow branches hang low over a brook that winds through this broad clearing, their trailing leaves brushing the water\'s surface. The stream runs clear, but the willows themselves seem to shiver despite the still air. Paths branch from here toward distant rooftops and shadowed groves, choices waiting to be made. The grass is trampled in patterns that speak of struggle, of things dragged toward the water. What waits beneath the willows?',
      cleansed: 'Willow branches sway gently over a brook that sings as it winds through the clearing, crystal water catching the light. The trees stand graceful and calm, their trailing leaves dancing rather than shivering. Paths branch from here toward a welcoming settlement and peaceful groves, all roads safe now. Deer drink from the brook\'s edge, lifting their heads to watch you pass without fear. You brought peace to Willowbrook.'
    },
    biomeTags: ['forest', 'river', 'rural'],
    displayOrder: 104
  },

  // ========== HEARTHSTONE (Settlement - City, Safe) ==========
  {
    locationId: 'hearthstone',
    name: 'Hearthstone',
    locationType: 'site',
    parentLocationId: 'sunlit_glades',
    siteType: 'settlement',
    settlementSize: 'city',
    alwaysSafe: true,
    services: {
      merchant: true,
      inn: true,
      apothecary: true,
      trainer: false
    },
    connections: [
      { locationId: 'willowbrook_clearing', passageType: 'road' },
      { locationId: 'foggy_graveyard', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'Hearthstone rises from the glades like a promise kept — timber walls and thatched roofs surrounding a central square where merchants call their wares. Smoke curls from chimneys, carrying the scent of fresh bread and roasting meat to greet weary travelers. The streets bustle with farmers, craftsmen, and adventurers alike, all moving with the easy pace of a town at peace. A merchant waves from his stall, an innkeeper sweeps her doorstep, and an apothecary arranges herbs in her window. Whatever you need, Hearthstone provides.'
    },
    biomeTags: ['urban', 'rural'],
    displayOrder: 105
  },

  // ========== FOGGY GRAVEYARD (Clearing - Minion) ==========
  {
    locationId: 'foggy_graveyard',
    name: 'Foggy Graveyard',
    locationType: 'site',
    parentLocationId: 'sunlit_glades',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'hearthstone', passageType: 'road' }
    ],
    monsters: { tiers: ['trash', 'minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'Weathered headstones rise from the fog that clings to this quiet cemetery on Hearthstone\'s edge. The mist is unnatural, cold and thick even when the sun shines bright beyond the iron fence. Flowers left by mourners have wilted overnight, and the groundskeeper refuses to tend the graves after dark. Shapes move between the stones — too solid to be fog, too silent to be living. The dead should rest peacefully here — will you ensure they do?',
      cleansed: 'Weathered headstones stand in peaceful rows, the fog lifted to reveal a quiet cemetery dappled in gentle sunlight. Fresh flowers rest on well-tended graves, and the iron fence gleams with new paint. The groundskeeper hums as he works, no longer afraid of what the mist might hide. Mourners visit openly now, remembering their loved ones without fear. You gave the dead their rest, and the living their peace.'
    },
    biomeTags: ['haunted', 'urban'],
    displayOrder: 106
  },

  // ========== THE OLD ORCHARD (Clearing - Minion, Dead End) ==========
  {
    locationId: 'old_orchard',
    name: 'The Old Orchard',
    locationType: 'site',
    parentLocationId: 'sunlit_glades',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'willowbrook_clearing', passageType: 'road' }
    ],
    monsters: { tiers: ['trash', 'minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'Gnarled apple trees stand in crooked rows, their branches heavy with fruit that has grown dark and wrong. The orchard was abandoned seasons ago, and nature has begun to reclaim it — but something else moved in first. Rotting apples carpet the ground, their smell sickly sweet, and the buzz of flies is constant. Shadows gather thick beneath the branches despite the hour. The orchard offers no path forward — only secrets buried among the roots.',
      cleansed: 'The old apple trees stand tall again, their branches heavy with fruit that blushes red and gold in the sunlight. The orchard has found new life, wildflowers growing between the rows while birds nest in the canopy. Fallen apples feed deer that wander through without fear, the cycle of nature turning as it should. Someone has cleared the brush and marked a path for future visitors. You gave this forgotten place a second chance.'
    },
    biomeTags: ['forest', 'rural'],
    displayOrder: 107
  }
];

module.exports = sunlitGladesLocations;
