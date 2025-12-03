/**
 * Territory 4: The Stonepaw Highlands
 * Mountain climb to Champion #3 and Mini-Boss Yarok
 * Sites: 6 | Champions: 1 | Mini-Boss: Yarok, Mountain Shaker
 */

const stonepawHighlandsLocations = [
  // ========== TERRITORY ENTRY ==========
  {
    locationId: 'stonepaw_highlands',
    name: 'The Stonepaw Highlands',
    locationType: 'territory',
    parentLocationId: 'verdant_wilds',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'verdant_wilds', passageType: 'road' },
      { locationId: 'tumblestone_pass', passageType: 'road' }
    ],
    monsters: { tiers: [], count: 0, respawns: false },
    flavorText: {
      corrupted: 'The land rises sharply here, gentle hills giving way to jagged stone and windswept ridges. The highlands loom above, their peaks lost in clouds that seem to watch your approach. Claw marks score the rocks — something large has marked this territory as its own. The wind carries howls from above, echoing off stone walls until they seem to come from everywhere. The climb will be dangerous — are you strong enough to reach the summit?',
      cleansed: 'The highlands rise majestic against a clear sky, their peaks proud sentinels watching over the lands below. The rocky paths feel solid underfoot, no longer treacherous with the threat of ambush. Eagles circle overhead where predators once prowled, the natural order restored to these heights. The wind carries only the whisper of stone and sky, peaceful and eternal. You conquered the highlands — they will not forget.'
    },
    biomeTags: ['mountain', 'wild'],
    displayOrder: 140
  },

  // ========== TUMBLESTONE PASS (Sector - Trash) ==========
  {
    locationId: 'tumblestone_pass',
    name: 'Tumblestone Pass',
    locationType: 'sector',
    parentLocationId: 'stonepaw_highlands',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'stonepaw_highlands', passageType: 'road' },
      { locationId: 'abandoned_mine', passageType: 'cave_mouth' },
      { locationId: 'winding_ascent', passageType: 'road' }
    ],
    monsters: { tiers: ['trash'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The pass winds between towering stone walls, loose rocks threatening to tumble with every step. This was once a trade route through the highlands, but rockslides and worse have made it treacherous. Something lurks among the fallen stones, using the unstable terrain to its advantage. The pass offers two paths — a dark opening in the cliff face, and a steep climb toward the peaks. Which danger will you choose?',
      cleansed: 'Tumblestone Pass winds through the highlands, its rocky walls now feeling protective rather than threatening. The loose stones have been cleared or stabilized, making the path safe for travelers once more. Caravans have begun to use this route again, their wheels leaving fresh tracks in the mountain dirt. Two paths branch from here — a mine entrance and the climb to the peaks. You made this pass passable again.'
    },
    biomeTags: ['mountain', 'cave'],
    displayOrder: 141
  },

  // ========== ABANDONED MINE (Clearing - Minion, Dead End, Loot) ==========
  {
    locationId: 'abandoned_mine',
    name: 'Abandoned Mine',
    locationType: 'site',
    parentLocationId: 'stonepaw_highlands',
    siteType: 'clearing',
    alwaysSafe: false,
    connections: [
      { locationId: 'tumblestone_pass', passageType: 'cave_mouth' }
    ],
    monsters: { tiers: ['minion'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The mine entrance yawns dark in the cliff face, old timbers creaking in the wind. Miners abandoned this place seasons ago, fleeing from something they dug up in the deep. Now something else has moved in, making a lair of the tunnels. Rusted tools and scattered ore carts speak of hasty departure. The mine offers no path forward — only whatever treasure was left behind, if you can claim it from the darkness.',
      cleansed: 'The old mine stands quiet, its darkness no longer threatening. The creature that claimed these tunnels is gone, and prospectors have begun to assess whether the veins might still be worth working. Rusted equipment is being cleared away, and new lanterns hang at the entrance. Whatever drove the miners out has been driven out in turn. The abandoned mine might not stay abandoned much longer, thanks to you.'
    },
    biomeTags: ['cave', 'underground', 'mountain'],
    displayOrder: 142
  },

  // ========== THE WINDING ASCENT (Passage - Minion/Elite) ==========
  {
    locationId: 'winding_ascent',
    name: 'The Winding Ascent',
    locationType: 'passage',
    parentLocationId: 'stonepaw_highlands',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'tumblestone_pass', passageType: 'road' },
      { locationId: 'alphas_peak', passageType: 'road' }
    ],
    monsters: { tiers: ['minion', 'elite'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'The path climbs steeply here, switchbacking up the mountainside through ever-thinner air. Each step brings you closer to the peaks — and to whatever claims this territory. The wind howls with something that might be voices, warnings in a language of stone and sky. Bones litter the trail, picked clean by scavengers or worse. The ascent is long and the danger grows with every step. Will you reach the peak?',
      cleansed: 'The winding path climbs toward the peaks, each switchback offering a more stunning view than the last. The air is thin but clean, carrying the scent of alpine flowers that have begun to bloom again. The trail is clear of bones now, the predators that hunted here driven off or slain. Climbers have begun to use this path again, seeking the summit views. You opened the way to the heights.'
    },
    biomeTags: ['mountain', 'wild'],
    displayOrder: 143
  },

  // ========== THE ALPHA'S PEAK (Landmark - Champion #3) ==========
  {
    locationId: 'alphas_peak',
    name: 'The Alpha\'s Peak',
    locationType: 'site',
    parentLocationId: 'stonepaw_highlands',
    siteType: 'landmark',
    alwaysSafe: false,
    connections: [
      { locationId: 'winding_ascent', passageType: 'road' },
      { locationId: 'scattered_scree', passageType: 'road' }
    ],
    monsters: {
      tiers: ['champion'],
      count: 1,
      fixedMonster: 'stonepaw_alpha',
      respawns: false
    },
    flavorText: {
      corrupted: 'The peak flattens into a natural arena of stone, the domain of the creature that rules these highlands. Claw marks gouge the rock, and the bones of challengers form a grim circle around the summit. The alpha waits here, grown massive and terrible, the apex predator of an entire mountain range. The wind falls silent as you approach, as if the highlands themselves hold their breath. Face the alpha, or turn back in shame.',
      cleansed: 'The peak stands proud and clear, the natural arena now a testament to your victory. The gouges in the stone remain, but they tell a story of triumph rather than terror. Eagles nest where the alpha once prowled, and the bones have been scattered by respectful winds. You stand where few have dared, having defeated the ruler of these heights. The Alpha\'s Peak knows a new champion now.'
    },
    biomeTags: ['mountain', 'wild'],
    displayOrder: 144
  },

  // ========== SCATTERED SCREE (Passage - Elite) ==========
  {
    locationId: 'scattered_scree',
    name: 'Scattered Scree',
    locationType: 'passage',
    parentLocationId: 'stonepaw_highlands',
    siteType: null,
    alwaysSafe: false,
    connections: [
      { locationId: 'alphas_peak', passageType: 'road' },
      { locationId: 'shattered_summit', passageType: 'road' }
    ],
    monsters: { tiers: ['elite'], count: 1, respawns: false },
    flavorText: {
      corrupted: 'Beyond the alpha\'s domain, the mountain grows treacherous. Loose stone shifts beneath every step, threatening to send you tumbling into the abyss. Something else hunts here — pack creatures that use the unstable terrain to isolate prey. The path ahead leads to the shattered summit, where something even more terrible waits. Only the strongest survive the scree. Will you prove yourself among them?',
      cleansed: 'The scree field remains challenging, but the predators that made it deadly are gone. Careful steps and marked trails make the passage possible, if not easy. The views from here are breathtaking, the world spread out below in miniature. The path to the shattered summit lies open, cleared by your victories. You crossed the scattered scree and lived to tell of it.'
    },
    biomeTags: ['mountain'],
    displayOrder: 145
  },

  // ========== THE SHATTERED SUMMIT (Lair - Mini-Boss: Yarok) ==========
  {
    locationId: 'shattered_summit',
    name: 'The Shattered Summit',
    locationType: 'site',
    parentLocationId: 'stonepaw_highlands',
    siteType: 'lair',
    alwaysSafe: false,
    connections: [
      { locationId: 'scattered_scree', passageType: 'road' }
    ],
    monsters: {
      tiers: ['mini_boss'],
      count: 1,
      fixedMonster: 'yarok_mountain_shaker',
      respawns: false
    },
    gate: {
      type: 'champions',
      regionId: 'verdant_wilds',
      requiredCount: 3
    },
    flavorText: {
      corrupted: 'The summit is shattered, broken by the creature that makes its lair among the ruins of what was once a peak. Yarok, the Mountain Shaker — a beast of legend, said to have broken the mountain itself in its fury. The ground trembles with each breath it takes, and the sky seems darker above its domain. This is the gate to the final challenge of the Verdant Wilds. Only those who have proven themselves against all three champions may face Yarok.',
      cleansed: 'The shattered summit stands quiet now, the mountain no longer trembling with each breath of its former master. Yarok is gone, defeated by a hero worthy of the challenge. The ruins of the peak have become a monument to courage, visited by climbers who wish to see where legend was made. The gate to the coast stands open below, the path to the final challenge cleared. You shattered the Mountain Shaker\'s reign.'
    },
    biomeTags: ['mountain', 'ruin'],
    displayOrder: 146
  }
];

module.exports = stonepawHighlandsLocations;
