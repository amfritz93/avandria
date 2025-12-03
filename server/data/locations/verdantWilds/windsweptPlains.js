/**
 * Territory 3: The Windswept Plains
 * Civilization hub - Goldgrass City (Kingdom) with four distinct districts
 * Sites: 16 | Services: Full | Champions: 1
 */

const windsweptPlainsLocations = [
  // ========== TERRITORY ENTRY ==========
  {
    locationId: 'windswept_plains',
    name: 'The Windswept Plains',
    locationType: 'territory',
    parentLocationId: 'verdant_wilds',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'verdant_wilds', passageType: 'road' },
      { locationId: 'goldgrass_city', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      corrupted: 'The plains open before you, endless waves of golden grass rippling beneath a vast sky. In the distance, the walls of a great city rise — but even here, corruption has crept into the fields. The grass hides predators now, and travelers hurry along the roads with fear in their eyes. Smoke rises from the city, though whether from hearths or something worse, you cannot tell. Civilization endures, but barely — will you help it stand?',
      cleansed: 'The plains stretch golden and free beneath an endless sky, the grass swaying in waves like a peaceful sea. The great city\'s walls rise proudly in the distance, banners snapping in the wind. Travelers walk the roads openly now, merchants and families moving without fear between farm and market. Smoke rises from a thousand hearths, the breath of a city alive and thriving. You gave these plains back to their people.'
    },
    biomeTags: ['plains', 'rural', 'urban'],
    displayOrder: 120
  },

  // ========== GOLDGRASS CITY (Settlement - Kingdom, Hub) ==========
  {
    locationId: 'goldgrass_city',
    name: 'Goldgrass City',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'settlement',
    settlementSize: 'kingdom',
    alwaysSafe: true,
    services: {
      merchant: true,
      inn: true,
      apothecary: true,
      trainer: true
    },
    connections: [
      { locationId: 'windswept_plains', passageType: 'road' },
      { locationId: 'maritime_district', passageType: 'road' },
      { locationId: 'royal_district', passageType: 'road' },
      { locationId: 'market_district', passageType: 'road' },
      { locationId: 'beggars_district', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'Goldgrass City sprawls before you, a kingdom unto itself with walls that have stood for centuries. Four great districts fan out from the central square: the Maritime with its salt air and sailor songs, the Royal with its gleaming spires, the Market with its endless stalls, and the Beggar\'s with its desperate hopes. Every service imaginable awaits within these walls — merchants, innkeepers, apothecaries, and trainers who can help you grow stronger. The heart of civilization in the Verdant Wilds welcomes you.'
    },
    biomeTags: ['urban'],
    displayOrder: 121
  },

  // ========== MARITIME DISTRICT (Sector) ==========
  {
    locationId: 'maritime_district',
    name: 'The Maritime District',
    locationType: 'sector',
    parentLocationId: 'windswept_plains',
    siteType: null,
    alwaysSafe: true,
    connections: [
      { locationId: 'goldgrass_city', passageType: 'road' },
      { locationId: 'salted_barrel', passageType: 'road' },
      { locationId: 'busy_docks', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'Salt hangs heavy in the air as you enter the Maritime District, where the river meets the city in a tangle of docks, warehouses, and sailor taverns. Gulls wheel overhead, their cries mixing with the shouts of longshoremen and the creak of ship rigging. The smell of fish and tar mingles with cooking food from dockside vendors. This is where the wealth of distant lands flows into Goldgrass City, carried on boats that brave the river\'s length.'
    },
    biomeTags: ['urban', 'coast', 'river'],
    displayOrder: 122
  },

  // ========== THE SALTED BARREL (Site - Inn) ==========
  {
    locationId: 'salted_barrel',
    name: 'The Salted Barrel',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'settlement',
    settlementSize: 'village',
    alwaysSafe: true,
    services: {
      merchant: false,
      inn: true,
      apothecary: false,
      trainer: false
    },
    connections: [
      { locationId: 'maritime_district', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Salted Barrel leans against the waterfront like a sailor after a long voyage — weathered but welcoming. Inside, lantern light glows warm against walls covered in nautical maps and mounted fish. The innkeeper, a retired captain with stories to spare, keeps the ale flowing and the beds clean. Sailors and merchants share tables, swapping tales of distant ports. A safe harbor in the bustle of the docks.'
    },
    biomeTags: ['urban', 'coast'],
    displayOrder: 123
  },

  // ========== BUSY DOCKS (Passage - Minion) ==========
  {
    locationId: 'busy_docks',
    name: 'Busy Docks',
    locationType: 'passage',
    parentLocationId: 'windswept_plains',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'maritime_district', passageType: 'road' },
      { locationId: 'amber_sea', passageType: 'road' }
    ],
    monsters: { tiers: ['minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The docks stretch along the waterfront in organized chaos, but something is wrong. Workers hurry with eyes down, and guards patrol in pairs. Crates sit unloaded, ships unmanned — the usual bustle replaced by nervous silence. Whispers speak of things lurking in the warehouse shadows, of workers who ventured in and didn\'t come out. The lifeblood of the city\'s trade is clotting. Will you clear the docks?',
      cleansed: 'The docks hum with honest labor, longshoremen hauling crates while merchants argue prices and captains oversee their cargo. The chaos is productive now, ships coming and going with the efficiency that made Goldgrass City wealthy. Guards patrol with easy smiles, their vigilance no longer tinged with fear. You cleared whatever shadows lurked here, and trade flows freely once more.'
    },
    biomeTags: ['urban', 'coast'],
    displayOrder: 124
  },

  // ========== THE AMBER SEA (Clearing - Trash/Minion) ==========
  {
    locationId: 'amber_sea',
    name: 'The Amber Sea',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'busy_docks', passageType: 'road' }
    ],
    monsters: { tiers: ['trash', 'minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'Beyond the docks, the river widens into a bay the locals call the Amber Sea for how the setting sun turns its waters to gold. But the beauty is marred by what lurks at the water\'s edge — beasts drawn to the easy prey of distracted fishermen. Abandoned nets litter the shore, and overturned boats speak of hasty retreats. The Amber Sea should be a treasure — will you reclaim it?',
      cleansed: 'The Amber Sea stretches before you, living up to its name as sunlight turns the water to liquid gold. Fishing boats bob peacefully, their crews hauling nets heavy with the day\'s catch. Children play along the shore while their parents watch without fear. The beasts are gone, driven back to wilder waters, and the bay belongs to the city once more. You gave them back their sea.'
    },
    biomeTags: ['coast', 'river', 'plains'],
    displayOrder: 125
  },

  // ========== ROYAL DISTRICT (Sector) ==========
  {
    locationId: 'royal_district',
    name: 'The Royal District',
    locationType: 'sector',
    parentLocationId: 'windswept_plains',
    siteType: null,
    alwaysSafe: true,
    connections: [
      { locationId: 'goldgrass_city', passageType: 'road' },
      { locationId: 'gilded_chapel', passageType: 'road' },
      { locationId: 'magistrates_hall', passageType: 'road' },
      { locationId: 'royal_gardens', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'Gleaming spires rise above immaculate streets in the Royal District, where the nobility of Goldgrass City makes its home. Guards in polished armor patrol past mansions with iron gates and manicured gardens. The air smells of perfume and privilege, a stark contrast to the earthier districts. Here decisions are made that affect the entire region — for better or worse. Power has its own kind of beauty.'
    },
    biomeTags: ['urban'],
    displayOrder: 126
  },

  // ========== THE GILDED CHAPEL (Site - Flavor) ==========
  {
    locationId: 'gilded_chapel',
    name: 'The Gilded Chapel',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'landmark',
    alwaysSafe: true,
    connections: [
      { locationId: 'royal_district', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Gilded Chapel rises in soaring arches of white stone and golden filigree, a monument to faith and wealth in equal measure. Stained glass windows cast rainbow light across marble floors, and the scent of incense hangs in the still air. Nobles kneel beside commoners here, all equal before whatever powers they pray to. The chapel offers no services beyond peace — sometimes that is enough.'
    },
    biomeTags: ['urban', 'holy'],
    displayOrder: 127
  },

  // ========== THE MAGISTRATE'S HALL (Site - Flavor) ==========
  {
    locationId: 'magistrates_hall',
    name: 'The Magistrate\'s Hall',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'landmark',
    alwaysSafe: true,
    connections: [
      { locationId: 'royal_district', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Magistrate\'s Hall stands stern and imposing, its facade carved with scales of justice and the laws of the land. Inside, bureaucrats shuffle papers and petitioners wait for audiences that may never come. This is where order is maintained — or at least, where people believe it is maintained. The wheels of governance turn slowly here, grinding through cases and complaints. Justice, such as it is, lives in these halls.'
    },
    biomeTags: ['urban'],
    displayOrder: 128
  },

  // ========== THE ROYAL GARDENS (Clearing - Minion) ==========
  {
    locationId: 'royal_gardens',
    name: 'The Royal Gardens',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'royal_district', passageType: 'road' }
    ],
    monsters: { tiers: ['minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The Royal Gardens were once the crown jewel of the district, a maze of topiaries and fountains where nobles strolled at leisure. Now the hedges have grown wild, the fountains run dry, and something has made its den among the overgrown roses. Gardeners refuse to enter, and the nobility whispers of curses. Even privilege cannot protect against the corruption spreading through the land. Will you restore the gardens to their glory?',
      cleansed: 'The Royal Gardens bloom in manicured splendor, every hedge trimmed and every fountain flowing. Nobles stroll the paths once more, their laughter echoing through the sculpted greenery. Gardeners tend the roses with pride, no longer afraid of what lurks in the shadows. The crown jewel of the district shines again, a testament to what can be when darkness is driven out. You made this place beautiful once more.'
    },
    biomeTags: ['urban', 'wild'],
    displayOrder: 129
  },

  // ========== MARKET DISTRICT (Sector) ==========
  {
    locationId: 'market_district',
    name: 'The Market District',
    locationType: 'sector',
    parentLocationId: 'windswept_plains',
    siteType: null,
    alwaysSafe: true,
    connections: [
      { locationId: 'goldgrass_city', passageType: 'road' },
      { locationId: 'traders_square', passageType: 'road' },
      { locationId: 'wildheart_apothecary', passageType: 'road' },
      { locationId: 'wayfarers_guild', passageType: 'road' },
      { locationId: 'the_grove', passageType: 'road' },
      { locationId: 'proving_grounds', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Market District assaults your senses with color, sound, and smell — a maze of stalls and shops where anything can be bought for the right price. Merchants hawk their wares over the din of haggling customers, while food vendors fill the air with the scent of roasting meat and fresh bread. Pickpockets work the crowds alongside honest traders, everyone chasing coin in their own way. This is the beating heart of commerce in Goldgrass City.'
    },
    biomeTags: ['urban'],
    displayOrder: 130
  },

  // ========== THE TRADER'S SQUARE (Site - Merchant) ==========
  {
    locationId: 'traders_square',
    name: 'The Trader\'s Square',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'settlement',
    settlementSize: 'village',
    alwaysSafe: true,
    services: {
      merchant: true,
      inn: false,
      apothecary: false,
      trainer: false
    },
    connections: [
      { locationId: 'market_district', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Trader\'s Square anchors the Market District, a permanent marketplace where established merchants sell quality goods at fair prices. Unlike the chaos of the surrounding stalls, here you\'ll find reliable stock and honest scales. Weapons, armor, supplies, and curiosities from across the region fill the shops. The merchants know adventurers well and stock accordingly. Whatever you need for the road ahead, you\'ll find it here.'
    },
    biomeTags: ['urban'],
    displayOrder: 131
  },

  // ========== WILDHEART APOTHECARY (Site - Apothecary) ==========
  {
    locationId: 'wildheart_apothecary',
    name: 'Wildheart Apothecary',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'settlement',
    settlementSize: 'village',
    alwaysSafe: true,
    services: {
      merchant: false,
      inn: false,
      apothecary: true,
      trainer: false
    },
    connections: [
      { locationId: 'market_district', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Wildheart Apothecary smells of herbs and strange medicines, its shelves lined with bottles of every color and size. The proprietor, an elderly herbalist with knowing eyes, can cure most ailments and craft potions to aid your journey. Dried plants hang from the rafters, and a mortar and pestle sits ready on the counter. Healing has a price, but it\'s a fair one. Your wounds and afflictions can find treatment here.'
    },
    biomeTags: ['urban'],
    displayOrder: 132
  },

  // ========== THE WAYFARER'S GUILD (Site - Trainer: Hunter) ==========
  {
    locationId: 'wayfarers_guild',
    name: 'The Wayfarer\'s Guild',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'landmark',
    alwaysSafe: true,
    connections: [
      { locationId: 'market_district', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Wayfarer\'s Guild occupies a sturdy building decorated with trophies of legendary hunts — antlers, pelts, and mounted heads that speak of dangers conquered. Inside, hunters share stories and techniques, comparing scars like badges of honor. A grizzled veteran offers training to those who would master the bow and the wild. The guild welcomes all who respect the hunt and understand the balance between predator and prey.'
    },
    biomeTags: ['urban', 'wild'],
    displayOrder: 133
  },

  // ========== THE GROVE (Site - Trainer: Druid) ==========
  {
    locationId: 'the_grove',
    name: 'The Grove',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'landmark',
    alwaysSafe: true,
    connections: [
      { locationId: 'market_district', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Grove is an anomaly in the urban landscape — a circle of ancient trees that predates the city itself, protected by laws older than memory. Druids gather here to commune with nature and train those who would walk the wild path. The air is fresher within the circle, and the sounds of the city fade to whispers. Those who respect the natural world can learn its secrets here, taught by masters of root and branch.'
    },
    biomeTags: ['urban', 'forest', 'wild'],
    displayOrder: 134
  },

  // ========== THE PROVING GROUNDS (Landmark - Champion #2) ==========
  {
    locationId: 'proving_grounds',
    name: 'The Proving Grounds',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'landmark',
    alwaysSafe: false,
    connections: [
      { locationId: 'market_district', passageType: 'road' }
    ],
    monsters: {
      tiers: ['champion'],
      count: 1,
      fixedMonster: 'arena_beast',
      respawns: false
    },
    gate: {
      type: 'none'
    },
    flavorText: {
      corrupted: 'The Proving Grounds were once an arena where warriors tested their mettle in honorable combat. Now something else holds court here — a beast that claimed the arena as its territory and slaughters all challengers. The sand is stained dark, and the stands sit empty save for carrion birds. The people whisper that whoever defeats the arena beast will be hailed as a true champion. Will you enter the arena?',
      cleansed: 'The Proving Grounds ring with cheers once more as warriors test their skills in honorable combat. The sand has been cleaned, the stands filled with eager spectators. You defeated the beast that claimed this place, and now the arena serves its true purpose again. Your victory here is legend — they still tell the tale of how you strode onto the sand and emerged triumphant. Champion of the Proving Grounds.'
    },
    biomeTags: ['urban'],
    displayOrder: 135
  },

  // ========== BEGGAR'S DISTRICT (Sector) ==========
  {
    locationId: 'beggars_district',
    name: 'The Beggar\'s District',
    locationType: 'sector',
    parentLocationId: 'windswept_plains',
    siteType: null,
    alwaysSafe: true,
    connections: [
      { locationId: 'goldgrass_city', passageType: 'road' },
      { locationId: 'broken_cup', passageType: 'road' },
      { locationId: 'ratcatchers_alley', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Beggar\'s District huddles in the shadow of the city\'s prosperity, a maze of cramped streets and desperate lives. Here the poor scratch out existence, the forgotten and the fallen making homes in crumbling tenements. But there\'s life here too — resilience and community among those who have nothing but each other. The district asks nothing of you but awareness. Not all of Goldgrass City glitters.'
    },
    biomeTags: ['urban'],
    displayOrder: 136
  },

  // ========== THE BROKEN CUP (Site - Gambling) ==========
  {
    locationId: 'broken_cup',
    name: 'The Broken Cup',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'landmark',
    alwaysSafe: true,
    connections: [
      { locationId: 'beggars_district', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      welcome: 'The Broken Cup is exactly what it sounds like — a tavern that\'s seen better days, its sign a cracked ceramic mug. Inside, the desperate and the daring gather around gambling tables, hoping luck will change their fortunes. The games are honest enough, as these things go, and the house takes a fair cut. Winners walk away with gold; losers walk away with lessons. Fortune favors the bold — or so they say here.'
    },
    biomeTags: ['urban'],
    displayOrder: 137
  },

  // ========== RATCATCHER'S ALLEY (Passage - Minion) ==========
  {
    locationId: 'ratcatchers_alley',
    name: 'Ratcatcher\'s Alley',
    locationType: 'passage',
    parentLocationId: 'windswept_plains',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'beggars_district', passageType: 'road' },
      { locationId: 'undercroft', passageType: 'stairs' }
    ],
    monsters: { tiers: ['minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The alley winds between crumbling buildings, its cobblestones slick with things best not examined. They call it Ratcatcher\'s Alley, though the rats here have grown bold and large, and those who hunt them often become the hunted. Stairs at the end descend into darkness — the Undercroft, where worse things lurk. Even the beggars avoid this place after dark. Will you brave the alley?',
      cleansed: 'Ratcatcher\'s Alley still winds through the poorest part of the district, but the rats here are just rats now — pests, not predators. The locals have reclaimed the passage, using it as a shortcut rather than a death trap. The stairs to the Undercroft remain, but they\'re just stairs now, not a threshold to terror. You cleaned up this alley, and the people who live here are grateful.'
    },
    biomeTags: ['urban', 'underground'],
    displayOrder: 138
  },

  // ========== THE UNDERCROFT (Clearing - Elite) ==========
  {
    locationId: 'undercroft',
    name: 'The Undercroft',
    locationType: 'site',
    parentLocationId: 'windswept_plains',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'ratcatchers_alley', passageType: 'stairs' }
    ],
    monsters: { tiers: ['elite'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'Beneath the Beggar\'s District lies the Undercroft — ancient tunnels that predate the city, now home to things that shun the light. The air is thick with decay, and your footsteps echo in ways that suggest vast spaces in the darkness. Something has claimed these depths as its territory, growing fat on those foolish enough to descend. The Undercroft holds secrets and danger in equal measure. Will you face what lurks below?',
      cleansed: 'The Undercroft still stretches dark beneath the district, but the terror that dwelt here is gone. Torches have been placed at intervals, and the tunnels serve as shelter for the homeless during harsh weather. The echoes are just echoes now, and the only things in the darkness are shadows. You drove out the horror that claimed this place, making it safe for those who have nowhere else to go.'
    },
    biomeTags: ['underground', 'urban', 'cave'],
    displayOrder: 139
  }
];

module.exports = windsweptPlainsLocations;
