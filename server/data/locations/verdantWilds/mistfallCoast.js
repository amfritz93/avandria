/**
 * Territory 5: The Mistfall Coast
 * Coastal zone leading to Boss Draug and the Vault
 * Sites: 9 | Services: Merchant, Inn | Boss: Draug | Vault: The Abyssal Vault
 */

const mistfallCoastLocations = [
  // ========== TERRITORY ENTRY ==========
  {
    locationId: 'mistfall_coast',
    name: 'The Mistfall Coast',
    locationType: 'territory',
    parentLocationId: 'verdant_wilds',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'verdant_wilds', passageType: 'road' },
      { locationId: 'driftwood_path', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      corrupted: 'The air grows thick with salt and mist as the land slopes toward a distant shore you can barely see. Fog rolls in from the water, swallowing the path ahead in grey uncertainty. The crash of waves mingles with sounds that don\'t belong — scraping, dragging, the movement of things that should stay in the deep. Fishermen speak of horrors rising from the abyss, of a darkness beneath the tides. The coast calls to you — will you answer?',
      cleansed: 'The mist has lifted from the coast, revealing a shoreline of breathtaking beauty beneath clear skies. Waves lap gently against white sand, and the call of gulls replaces the silence that once hung here. Fishing boats dot the water again, their crews hauling nets without fear of what lurks below. The abyss has been sealed, its horrors driven back to the depths where they belong. You brought peace to the Mistfall Coast.'
    },
    biomeTags: ['coast', 'swamp', 'wild'],
    displayOrder: 150
  },

  // ========== DRIFTWOOD PATH (Passage - Trash) ==========
  {
    locationId: 'driftwood_path',
    name: 'Driftwood Path',
    locationType: 'passage',
    parentLocationId: 'mistfall_coast',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'mistfall_coast', passageType: 'road' },
      { locationId: 'tidecallers_watch', passageType: 'road' },
      { locationId: 'bleached_sands', passageType: 'road' }
    ],
    monsters: { tiers: ['trash'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The path is lined with driftwood — not artfully arranged, but piled in barriers that speak of desperate defense. The villagers tried to block something from coming inland. The wood is scored with claw marks, and dark stains suggest they failed. Mist curls between the barriers, hiding what waits beyond. The path splits ahead — toward a fishing village, and toward the beach. Neither feels safe.',
      cleansed: 'Driftwood lines the path in decorative arrangements, the desperate barriers now dismantled and repurposed. Children have built forts among the weathered wood, and lovers have carved their names into the silvered logs. The mist is just mist now, atmospheric rather than ominous. The path to the village is busy with foot traffic, while the beach beckons with promise of rest. You made this coastline welcoming again.'
    },
    biomeTags: ['coast', 'rural'],
    displayOrder: 151
  },

  // ========== TIDECALLER'S WATCH (Settlement - Village) ==========
  {
    locationId: 'tidecallers_watch',
    name: 'Tidecaller\'s Watch',
    locationType: 'site',
    parentLocationId: 'mistfall_coast',
    siteType: 'settlement',
    settlementSize: 'village',
    alwaysSafe: true,
    services: {
      merchant: true,
      inn: true,
      apothecary: false,
      trainer: false
    },
    connections: [
      { locationId: 'driftwood_path', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'Tidecaller\'s Watch clings to the cliffs above the sea, a fishing village that has weathered storms both natural and otherwise. The lighthouse stands dark — no keeper has tended it since the troubles began — but the village itself endures. A weathered merchant sells what the sea provides, and a small inn offers beds to travelers brave enough to visit. The villagers watch the water constantly, waiting for the next horror to rise. They pray for a hero.'
    },
    biomeTags: ['coast', 'rural', 'urban'],
    displayOrder: 152
  },

  // ========== BLEACHED SANDS (Sector - Minion) ==========
  {
    locationId: 'bleached_sands',
    name: 'Bleached Sands',
    locationType: 'sector',
    parentLocationId: 'mistfall_coast',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'driftwood_path', passageType: 'road' },
      { locationId: 'wreck_of_seaspray', passageType: 'road' },
      { locationId: 'abyssal_approach', passageType: 'road' }
    ],
    monsters: { tiers: ['minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The beach stretches white and empty, sand bleached by sun and salt until it glows beneath the mist. But the emptiness is wrong — no crabs scuttle, no birds cry, no life disturbs the pristine surface. Something hunts here, something that has claimed the sands as its territory. A wrecked ship lies in the distance, and beyond it, the sea caves beckon. The bleached sands offer no shelter and no mercy.',
      cleansed: 'The beach stretches beautiful beneath clearing skies, the sand warm and inviting underfoot. Crabs scuttle along the waterline, and gulls wheel overhead crying to each other. Families from the village have begun to picnic here again, children building castles in the sand. The wreck in the distance has become a landmark rather than a warning. You gave the people back their beach.'
    },
    biomeTags: ['coast', 'desert'],
    displayOrder: 153
  },

  // ========== THE WRECK OF THE SEASPRAY (Clearing - Elite, Dead End, Loot) ==========
  {
    locationId: 'wreck_of_seaspray',
    name: 'The Wreck of the Seaspray',
    locationType: 'site',
    parentLocationId: 'mistfall_coast',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'bleached_sands', passageType: 'road' }
    ],
    monsters: { tiers: ['elite'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The Seaspray lies broken on the rocks, a merchant vessel that met its end in the mist. Something has made a lair in its rotting hull, drawn by the cargo that still fills the hold. Salvagers who approached never returned, and the villagers have marked the wreck as cursed. But treasure lies within for those brave enough to claim it. The wreck offers no path forward — only risk and reward.',
      cleansed: 'The Seaspray\'s skeleton rests peacefully on the rocks, stripped of its curse along with its monster. Salvagers have claimed what cargo remained, and the hull has become a curiosity rather than a danger. Children dare each other to explore its rotting chambers, finding only adventure where horror once lurked. The wreck will eventually crumble to nothing, but for now it stands as proof that even cursed things can be redeemed.'
    },
    biomeTags: ['coast', 'ruin'],
    displayOrder: 154
  },

  // ========== ABYSSAL APPROACH (Passage - Elite) ==========
  {
    locationId: 'abyssal_approach',
    name: 'Abyssal Approach',
    locationType: 'passage',
    parentLocationId: 'mistfall_coast',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'bleached_sands', passageType: 'road' },
      { locationId: 'drowned_caves', passageType: 'cave_mouth' }
    ],
    monsters: { tiers: ['elite'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The beach narrows as cliffs rise on either side, funneling toward a dark opening in the stone — the entrance to the sea caves. The water grows darker here, deeper, hiding things that should never see sunlight. Tracks in the wet sand lead toward the caves and never return. This is the approach to the abyss, the path to whatever horror rules these waters. Only the worthy — or the foolish — proceed.',
      cleansed: 'The passage to the caves feels solemn rather than threatening, a natural corridor between land and sea. The water runs clear now, fish darting in the shallows where shadows once lurked. The cave entrance ahead is just an entrance, dark but not menacing. What waits within has been faced and defeated. You walked the abyssal approach and emerged victorious.'
    },
    biomeTags: ['coast', 'cave'],
    displayOrder: 155
  },

  // ========== THE DROWNED CAVES (Sector) ==========
  {
    locationId: 'drowned_caves',
    name: 'The Drowned Caves',
    locationType: 'sector',
    parentLocationId: 'mistfall_coast',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'abyssal_approach', passageType: 'cave_mouth' },
      { locationId: 'flooded_grotto', passageType: 'road' },
      { locationId: 'sunken_depths', passageType: 'stairs' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      corrupted: 'The caves swallow you in darkness, the sound of dripping water echoing from unseen chambers. The tide has claimed these tunnels, filling them with sea water that rises and falls with the moon. Phosphorescent algae provides sickly light, revealing walls covered in strange carvings — warnings in languages older than humanity. Something ancient dwells in these caves, something that was worshipped before it was feared.',
      cleansed: 'The caves are beautiful in their darkness, bioluminescent life painting the walls in soft blues and greens. The tide still rises and falls, but it feels natural now, the breath of the sea rather than the pulse of something hungry. The ancient carvings remain, but they read as history rather than warning. You brought light to the drowned caves — figuratively, if not literally.'
    },
    biomeTags: ['cave', 'underground', 'coast'],
    displayOrder: 156
  },

  // ========== THE FLOODED GROTTO (Clearing - Elite) ==========
  {
    locationId: 'flooded_grotto',
    name: 'The Flooded Grotto',
    locationType: 'site',
    parentLocationId: 'mistfall_coast',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'drowned_caves', passageType: 'road' }
    ],
    monsters: { tiers: ['elite'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The cave opens into a vast grotto, half-flooded with dark water that conceals its depths. Columns of stone rise like the ribs of some massive creature, and the ceiling is lost in shadow. Something moves in the water — ripples spreading from no visible source. This is the antechamber to the abyss, the last rest before the final challenge. Whatever lurks here guards the way to the depths below.',
      cleansed: 'The grotto is magnificent, a cathedral carved by water over countless ages. The pool is clear now, revealing colorful formations beneath the surface and fish that swim without fear. Light filters through cracks in the ceiling, painting the water in shifting patterns. The guardian is gone, and the grotto has returned to the peaceful wonder it was always meant to be. You cleared the way to the depths.'
    },
    biomeTags: ['cave', 'underground', 'coast'],
    displayOrder: 157
  },

  // ========== THE SUNKEN DEPTHS (Dungeon - Boss: Draug) ==========
  {
    locationId: 'sunken_depths',
    name: 'The Sunken Depths',
    locationType: 'site',
    parentLocationId: 'mistfall_coast',
    siteType: 'dungeon',
    alwaysSafe: false,
    connections: [
      { locationId: 'drowned_caves', passageType: 'stairs' },
      { locationId: 'abyssal_vault', passageType: 'road' }
    ],
    monsters: {
      tiers: ['boss'],
      count: 1,
      fixedMonster: 'draug_maw_of_abyss',
      respawns: false
    },
    gate: {
      type: 'mini_boss',
      regionId: 'verdant_wilds',
      requiredCount: 1
    },
    flavorText: {
      corrupted: 'Stairs descend into absolute darkness, into depths where no light has shone since the world was young. Here dwells Draug, the Maw of the Abyss — a beast of nightmare that has terrorized this coast since before memory. The water here is black as ink, and the cold seeps into your bones. This is the heart of the corruption that has claimed the Verdant Wilds. Only those who defeated Yarok may challenge the Maw.',
      cleansed: 'The sunken depths are quiet now, the darkness merely darkness rather than a living thing. Draug is gone, the Maw of the Abyss closed forever by your hand. The water has begun to clear, and already small creatures venture into spaces that were death for so long. The stairs lead down to treasure now, not terror. You descended into the abyss and emerged victorious.'
    },
    biomeTags: ['underground', 'cave', 'abyssal'],
    displayOrder: 158
  },

  // ========== THE ABYSSAL VAULT (Vault - Treasures) ==========
  {
    locationId: 'abyssal_vault',
    name: 'The Abyssal Vault',
    locationType: 'site',
    parentLocationId: 'mistfall_coast',
    siteType: 'vault',
    alwaysSafe: true,
    connections: [
      { locationId: 'sunken_depths', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    gate: {
      type: 'boss',
      regionId: 'verdant_wilds',
      requiredCount: 1
    },
    flavorText: {
      welcome: 'Beyond the Maw\'s lair lies the Abyssal Vault — a cavern of wonders accumulated over ages by the creature that once ruled here. Treasures from sunken ships, offerings from forgotten cults, and artifacts of power beyond mortal craft fill the chamber. This is your reward for conquering the Verdant Wilds, for driving back the darkness and restoring balance to the land. Take what you will — you have earned it.'
    },
    biomeTags: ['underground', 'cave', 'arcane'],
    displayOrder: 159
  }
];

module.exports = mistfallCoastLocations;
