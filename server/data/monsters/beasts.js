/**
 * Beast Category Monsters
 * Difficulty Tier 1 (×1.0 stats, ×1.0 XP)
 * Combat Focus: Physical Power & Evasion (Instinct)
 * Weaknesses: Fire, Piercing | Resistance: Bludgeoning | Immunity: Arcane
 */

const beastMonsters = [
  // ========== TRASH TIER ==========
  {
    monsterId: 'wolf_pup',
    name: 'Wolf Pup',
    category: 'beast',
    tier: 'trash',
    level: 1,
    stats: { power: 9, toughness: 8, brilliance: 5, spirit: 6, acuity: 9, instinct: 10 },
    damageType: 'piercing',
    habitatTags: ['forest', 'mountain'],
    abilities: [
      { name: 'Yelp', trigger: 'on_defeat', effect: 'No mechanical effect (flavor)', effectType: 'flavor' }
    ],
    rewards: { xp: 4, goldMin: 1, goldMax: 3 },
    description: 'A young wolf separated from its pack. More scared than dangerous, but its teeth are still sharp.'
  },
  {
    monsterId: 'swarm_of_rats',
    name: 'Swarm of Rats',
    category: 'beast',
    tier: 'trash',
    level: 2,
    stats: { power: 10, toughness: 7, brilliance: 5, spirit: 5, acuity: 8, instinct: 11 },
    damageType: 'piercing',
    habitatTags: ['cave', 'crossroad', 'city', 'urban'],
    abilities: [
      { name: 'Scatter', trigger: 'below_25_hp', effect: '+3 Instinct for remainder of fight', effectType: 'stat_buff', effectValue: { instinct: 3 } }
    ],
    rewards: { xp: 5, goldMin: 1, goldMax: 4 },
    description: 'A writhing mass of diseased rodents. Individually weak, but overwhelming in numbers.'
  },
  {
    monsterId: 'feral_cat',
    name: 'Feral Cat',
    category: 'beast',
    tier: 'trash',
    level: 2,
    stats: { power: 8, toughness: 7, brilliance: 5, spirit: 6, acuity: 10, instinct: 12 },
    damageType: 'slashing',
    habitatTags: ['crossroad', 'city', 'ruin', 'urban'],
    abilities: [
      { name: 'Quick Slash', trigger: 'on_crit', effect: 'Double attack (hits twice)', effectType: 'extra_attack', effectValue: 2 }
    ],
    rewards: { xp: 5, goldMin: 1, goldMax: 4 },
    description: 'A cat gone wild, surviving on instinct and aggression. Quick and vicious when cornered.'
  },
  {
    monsterId: 'giant_marsh_toad',
    name: 'Giant Marsh Toad',
    category: 'beast',
    tier: 'trash',
    level: 3,
    stats: { power: 9, toughness: 10, brilliance: 6, spirit: 7, acuity: 7, instinct: 8 },
    damageType: 'poison',
    habitatTags: ['swamp', 'river'],
    abilities: [
      { name: 'Toxic Skin', trigger: 'when_hit', effect: 'Attacker takes 2 Poison damage', effectType: 'reflect_damage', effectValue: { damage: 2, type: 'poison' } }
    ],
    rewards: { xp: 5, goldMin: 2, goldMax: 5 },
    description: 'A bloated amphibian the size of a dog. Its skin secretes a mild toxin that burns on contact.'
  },
  {
    monsterId: 'swarm_of_bats',
    name: 'Swarm of Bats',
    category: 'beast',
    tier: 'trash',
    level: 3,
    stats: { power: 8, toughness: 6, brilliance: 5, spirit: 6, acuity: 9, instinct: 12 },
    damageType: 'piercing',
    habitatTags: ['cave', 'mountain', 'crypt'],
    abilities: [
      { name: 'Evasive Cloud', trigger: 'every_nth_turn', triggerValue: 3, effect: '+5 Instinct until next turn', effectType: 'stat_buff', effectValue: { instinct: 5, duration: 1 } }
    ],
    rewards: { xp: 6, goldMin: 2, goldMax: 5 },
    description: 'A screeching cloud of winged rodents. Hard to hit when they scatter, but fragile when caught.'
  },
  {
    monsterId: 'swarm_of_carrion',
    name: 'Swarm of Carrion',
    category: 'beast',
    tier: 'trash',
    level: 4,
    stats: { power: 10, toughness: 8, brilliance: 5, spirit: 5, acuity: 10, instinct: 11 },
    damageType: 'piercing',
    habitatTags: ['crossroad', 'swamp', 'cursed'],
    abilities: [
      { name: 'Peck Frenzy', trigger: 'below_50_hp', effect: '+2 Power for remainder of fight', effectType: 'stat_buff', effectValue: { power: 2 } }
    ],
    rewards: { xp: 6, goldMin: 2, goldMax: 6 },
    description: 'Crows and vultures driven mad by corruption. They feast on the living now, not just the dead.'
  },

  // ========== MINION TIER ==========
  {
    monsterId: 'dire_wolf',
    name: 'Dire Wolf',
    category: 'beast',
    tier: 'minion',
    level: 5,
    stats: { power: 14, toughness: 11, brilliance: 6, spirit: 8, acuity: 12, instinct: 13 },
    damageType: 'piercing',
    habitatTags: ['forest', 'mountain'],
    abilities: [
      { name: 'Pack Tactics', trigger: 'always', effect: '+2 Power if Hero below 75% HP', effectType: 'stat_buff', effectValue: { power: 2, condition: 'hero_below_75_hp' } }
    ],
    rewards: { xp: 12, goldMin: 4, goldMax: 10 },
    description: 'A wolf grown massive and cunning. It hunts alone now, having outgrown its pack.'
  },
  {
    monsterId: 'wild_boar',
    name: 'Wild Boar',
    category: 'beast',
    tier: 'minion',
    level: 5,
    stats: { power: 15, toughness: 13, brilliance: 5, spirit: 7, acuity: 10, instinct: 10 },
    damageType: 'bludgeoning',
    habitatTags: ['forest', 'swamp'],
    abilities: [
      { name: 'Gore Charge', trigger: 'first_attack', effect: '+5 Power on first attack of combat', effectType: 'stat_buff', effectValue: { power: 5, duration: 1 } }
    ],
    rewards: { xp: 12, goldMin: 4, goldMax: 10 },
    description: 'A tusked beast with more muscle than sense. It charges first and thinks never.'
  },
  {
    monsterId: 'venomous_snake',
    name: 'Venomous Snake',
    category: 'beast',
    tier: 'minion',
    level: 6,
    stats: { power: 12, toughness: 9, brilliance: 6, spirit: 8, acuity: 14, instinct: 14 },
    damageType: 'poison',
    habitatTags: ['swamp', 'desert', 'cave'],
    abilities: [
      { name: 'Venom Bite', trigger: 'on_crit', effect: 'Applies Weakened (-5 all stats, 3 turns)', effectType: 'status_apply', effectValue: { status: 'weakened', duration: 3 } }
    ],
    rewards: { xp: 13, goldMin: 5, goldMax: 12 },
    description: 'A serpent with fangs dripping venom. One bite won\'t kill you, but it will make everything harder.'
  },
  {
    monsterId: 'giant_rat',
    name: 'Giant Rat',
    category: 'beast',
    tier: 'minion',
    level: 6,
    stats: { power: 13, toughness: 12, brilliance: 5, spirit: 6, acuity: 11, instinct: 12 },
    damageType: 'piercing',
    habitatTags: ['cave', 'crossroad', 'crypt', 'urban'],
    abilities: [
      { name: 'Disease Carrier', trigger: 'on_crit', effect: 'Applies Bleeding (15% damage/turn, 3 turns)', effectType: 'status_apply', effectValue: { status: 'bleeding', duration: 3 } }
    ],
    rewards: { xp: 12, goldMin: 4, goldMax: 10 },
    description: 'A rat the size of a dog, with teeth to match. It carries diseases that linger long after the fight.'
  },
  {
    monsterId: 'swamp_gator',
    name: 'Swamp Gator',
    category: 'beast',
    tier: 'minion',
    level: 7,
    stats: { power: 16, toughness: 14, brilliance: 5, spirit: 7, acuity: 9, instinct: 9 },
    damageType: 'slashing',
    habitatTags: ['swamp', 'river', 'coast'],
    abilities: [
      { name: 'Death Roll', trigger: 'below_50_hp', effect: 'Next attack deals ×1.5 damage', effectType: 'damage', effectValue: { multiplier: 1.5, duration: 1 } }
    ],
    rewards: { xp: 14, goldMin: 5, goldMax: 14 },
    description: 'An armored reptile that lurks in murky water. It drags prey under and rolls until they stop struggling.'
  },
  {
    monsterId: 'hawk',
    name: 'Hawk',
    category: 'beast',
    tier: 'minion',
    level: 7,
    stats: { power: 11, toughness: 8, brilliance: 6, spirit: 9, acuity: 15, instinct: 16 },
    damageType: 'slashing',
    habitatTags: ['plains', 'mountain', 'bluff'],
    abilities: [
      { name: 'Dive Attack', trigger: 'every_nth_turn', triggerValue: 3, effect: 'Unavoidable attack (ignores Instinct)', effectType: 'unavoidable' }
    ],
    rewards: { xp: 13, goldMin: 4, goldMax: 12 },
    description: 'A raptor with razor talons and eyes that miss nothing. It strikes from above without warning.'
  },

  // ========== ELITE TIER ==========
  {
    monsterId: 'alpha_wolf',
    name: 'Alpha Wolf',
    category: 'beast',
    tier: 'elite',
    level: 9,
    stats: { power: 18, toughness: 15, brilliance: 7, spirit: 10, acuity: 16, instinct: 17 },
    damageType: 'piercing',
    habitatTags: ['forest', 'mountain'],
    abilities: [
      { name: 'Howl', trigger: 'start_of_combat', effect: '+3 to all stats for 3 turns', effectType: 'stat_buff', effectValue: { all: 3, duration: 3 } }
    ],
    rewards: { xp: 30, goldMin: 10, goldMax: 25 },
    description: 'The leader of the pack, grown powerful through countless hunts. Its howl commands respect and fear.'
  },
  {
    monsterId: 'giant_spider',
    name: 'Giant Spider',
    category: 'beast',
    tier: 'elite',
    level: 10,
    stats: { power: 16, toughness: 14, brilliance: 8, spirit: 12, acuity: 18, instinct: 15 },
    damageType: 'poison',
    habitatTags: ['forest', 'cave', 'swamp'],
    abilities: [
      { name: 'Web Trap', trigger: 'every_nth_turn', triggerValue: 4, effect: 'Applies Rooted (no physical abilities, 2 turns)', effectType: 'status_apply', effectValue: { status: 'rooted', duration: 2 } }
    ],
    rewards: { xp: 32, goldMin: 12, goldMax: 28 },
    description: 'A spider large enough to prey on humans. Its webs are strong as rope, and its venom numbs the mind.'
  },
  {
    monsterId: 'dune_stalker',
    name: 'Dune Stalker',
    category: 'beast',
    tier: 'elite',
    level: 11,
    stats: { power: 16, toughness: 13, brilliance: 7, spirit: 9, acuity: 17, instinct: 20 },
    damageType: 'slashing',
    habitatTags: ['desert', 'plains'],
    abilities: [
      { name: 'Sand Camouflage', trigger: 'start_of_combat', effect: 'First attack is guaranteed Crit', effectType: 'guaranteed_crit', effectValue: { duration: 1 } }
    ],
    rewards: { xp: 34, goldMin: 14, goldMax: 32 },
    description: 'A desert predator that buries itself in sand, waiting for prey to pass. You never see it until it strikes.'
  },
  {
    monsterId: 'ridge_prowler',
    name: 'Ridge Prowler',
    category: 'beast',
    tier: 'elite',
    level: 12,
    stats: { power: 20, toughness: 14, brilliance: 7, spirit: 10, acuity: 18, instinct: 19 },
    damageType: 'slashing',
    habitatTags: ['mountain', 'bluff'],
    abilities: [
      { name: 'Pounce', trigger: 'when_hero_misses', effect: 'Immediate counter-attack', effectType: 'counter_attack' }
    ],
    rewards: { xp: 34, goldMin: 14, goldMax: 34 },
    description: 'A great cat that hunts the mountain ridges. Patient and precise, it waits for the perfect moment to strike.'
  },
  {
    monsterId: 'shadow_panther',
    name: 'Shadow Panther',
    category: 'beast',
    tier: 'elite',
    level: 13,
    stats: { power: 21, toughness: 12, brilliance: 8, spirit: 11, acuity: 20, instinct: 22 },
    damageType: 'slashing',
    habitatTags: ['forest', 'cave'],
    abilities: [
      { name: 'Ambush', trigger: 'start_of_combat', effect: '+10 Acuity for first 2 turns', effectType: 'stat_buff', effectValue: { acuity: 10, duration: 2 } }
    ],
    rewards: { xp: 36, goldMin: 16, goldMax: 38 },
    description: 'A black-furred predator that melts into shadows. By the time you see it, the fight is already over.'
  },
  {
    monsterId: 'giant_crocodile',
    name: 'Giant Crocodile',
    category: 'beast',
    tier: 'elite',
    level: 14,
    stats: { power: 22, toughness: 20, brilliance: 6, spirit: 9, acuity: 14, instinct: 12 },
    damageType: 'slashing',
    habitatTags: ['swamp', 'river', 'coast'],
    abilities: [
      { name: 'Armored Hide', trigger: 'always', effect: '-25% damage from physical attacks', effectType: 'damage_reduction', effectValue: { physical: 0.25 } }
    ],
    rewards: { xp: 36, goldMin: 16, goldMax: 40 },
    description: 'An ancient reptile armored in scales like stone. It has survived millennia by being too tough to kill.'
  },

  // ========== CHAMPIONS ==========
  {
    monsterId: 'mossback_ancient_one',
    name: 'Mossback, the Ancient One',
    category: 'beast',
    tier: 'champion',
    level: 12,
    stats: { power: 24, toughness: 26, brilliance: 8, spirit: 14, acuity: 16, instinct: 14 },
    damageType: 'bludgeoning',
    habitatTags: ['forest'],
    fixedLocationId: 'heart_of_thorns',
    abilities: [
      { name: 'Thorned Hide', trigger: 'when_hit', effect: 'Attacker takes 10 Piercing damage', effectType: 'reflect_damage', effectValue: { damage: 10, type: 'piercing' } },
      { name: 'Ancient Resilience', trigger: 'below_50_hp', effect: 'Regenerates 15 HP per turn', effectType: 'regeneration', effectValue: { hp: 15 } },
      { name: 'Earthshaking Stomp', trigger: 'every_nth_turn', triggerValue: 4, effect: 'Deals damage and applies Dazed (15% miss, 2 turns)', effectType: 'status_apply', effectValue: { status: 'dazed', duration: 2 } },
      { name: 'Nature\'s Wrath', trigger: 'below_25_hp', effect: '+5 Power, +5 Toughness for remainder of fight', effectType: 'stat_buff', effectValue: { power: 5, toughness: 5 } }
    ],
    rewards: { xp: 80, goldMin: 40, goldMax: 80, remnant: null },
    description: 'An ancient beast that has roamed the Whispering Thicket for centuries. Its hide is covered in moss, vines, and thorns — more forest than flesh. Mossback moves slowly but strikes with devastating force.'
  },
  {
    monsterId: 'sandclaw_desert_champion',
    name: 'Sandclaw, the Desert Champion',
    category: 'beast',
    tier: 'champion',
    level: 14,
    stats: { power: 26, toughness: 20, brilliance: 7, spirit: 12, acuity: 22, instinct: 21 },
    damageType: 'slashing',
    habitatTags: ['desert', 'plains', 'urban'],
    fixedLocationId: 'proving_grounds',
    abilities: [
      { name: 'Arena Veteran', trigger: 'always', effect: 'Cannot be afflicted by the same status effect twice', effectType: 'status_immune', effectValue: { unique: true } },
      { name: 'Savage Combo', trigger: 'on_crit', effect: 'Attacks three times in succession', effectType: 'extra_attack', effectValue: 3 },
      { name: 'Desert Fury', trigger: 'below_50_hp', effect: '+8 Power, -3 Toughness (more aggressive)', effectType: 'stat_buff', effectValue: { power: 8, toughness: -3 } },
      { name: 'Crowd Roar', trigger: 'every_nth_turn', triggerValue: 5, effect: 'Heals 25 HP (crowd throws healing items)', effectType: 'heal', effectValue: { hp: 25 } }
    ],
    rewards: { xp: 88, goldMin: 50, goldMax: 100, remnant: null },
    description: 'Captured from the deep desert and forced to fight in the arena, Sandclaw has never been defeated. This massive lion-like beast with golden fur and obsidian claws fights with feral intelligence born from countless battles.'
  },
  {
    monsterId: 'thunderhoof_mountain_wrath',
    name: 'Thunderhoof, Wrath of the Mountain',
    category: 'beast',
    tier: 'champion',
    level: 15,
    stats: { power: 28, toughness: 24, brilliance: 6, spirit: 13, acuity: 18, instinct: 16 },
    damageType: 'bludgeoning',
    habitatTags: ['mountain'],
    fixedLocationId: 'alphas_peak',
    abilities: [
      { name: 'Earthshaker', trigger: 'every_nth_turn', triggerValue: 3, effect: 'All attacks this turn apply Prone (skip turn) on hit', effectType: 'status_apply', effectValue: { status: 'prone', duration: 1 } },
      { name: 'Lightning Antlers', trigger: 'on_crit', effect: 'Deals bonus Air damage equal to 50% of attack', effectType: 'damage', effectValue: { bonus: 0.5, type: 'air' } },
      { name: 'Mountain\'s Fury', trigger: 'below_50_hp', effect: 'Charge attack deals ×2 damage', effectType: 'damage', effectValue: { multiplier: 2 } },
      { name: 'Unyielding', trigger: 'below_25_hp', effect: 'Immune to status effects', effectType: 'status_immune', effectValue: { all: true } }
    ],
    rewards: { xp: 96, goldMin: 60, goldMax: 120, remnant: null },
    description: 'A colossal elk with stone-grey fur and antlers that crackle with static electricity. Thunderhoof rules the Stonepaw Highlands, and no beast dares challenge its dominion. The ground trembles with every step.'
  },

  // ========== MINI-BOSS ==========
  {
    monsterId: 'yarok_mountain_shaker',
    name: 'Yarok, Mountain Shaker',
    category: 'beast',
    tier: 'mini_boss',
    level: 16,
    stats: { power: 32, toughness: 30, brilliance: 8, spirit: 16, acuity: 20, instinct: 18 },
    damageType: 'bludgeoning',
    habitatTags: ['mountain'],
    fixedLocationId: 'shattered_summit',
    abilities: [
      { name: 'Boulder Throw', trigger: 'every_nth_turn', triggerValue: 4, effect: 'Ranged attack, unavoidable, applies Dazed', effectType: 'unavoidable', effectValue: { status: 'dazed', duration: 2 } },
      { name: 'Primal Rage', trigger: 'below_75_hp', effect: '+4 Power permanently', effectType: 'stat_buff', effectValue: { power: 4 } },
      { name: 'Earthsplitter', trigger: 'below_50_hp', effect: 'Next 3 attacks apply Prone on hit', effectType: 'status_apply', effectValue: { status: 'prone', count: 3 } },
      { name: 'Mountain\'s Endurance', trigger: 'below_25_hp', effect: '+10 Toughness, regenerates 20 HP per turn', effectType: 'regeneration', effectValue: { toughness: 10, hp: 20 } },
      { name: 'Avalanche', trigger: 'on_defeat', effect: 'Final attack deals ×3 damage', effectType: 'damage', effectValue: { multiplier: 3 } }
    ],
    rewards: { xp: 250, goldMin: 150, goldMax: 300, remnant: 'Mountain\'s Broken Crown' },
    description: 'A primordial ape-like beast of impossible size, Yarok has carved its domain into the mountain itself. Its fists shatter stone, and its roar causes avalanches. Only the most prepared heroes survive an encounter with the Mountain Shaker.'
  },

  // ========== BOSS ==========
  {
    monsterId: 'draug_maw_of_abyss',
    name: 'Draug, Maw of the Abyss',
    category: 'beast',
    tier: 'boss',
    level: 18,
    stats: { power: 40, toughness: 38, brilliance: 12, spirit: 20, acuity: 24, instinct: 16 },
    damageType: 'slashing',
    secondaryDamageType: 'water',
    habitatTags: ['coast', 'cave', 'abyssal'],
    fixedLocationId: 'sunken_depths',
    abilities: [
      { name: 'Abyssal Presence', trigger: 'start_of_combat', effect: 'Hero takes 10 Water damage per turn (drowning)', effectType: 'damage', effectValue: { damage: 10, type: 'water', perTurn: true } },
      { name: 'Crushing Jaws', trigger: 'on_crit', effect: 'Applies Crippled and Bleeding', effectType: 'status_apply', effectValue: { statuses: ['crippled', 'bleeding'], duration: 3 } },
      { name: 'Tidal Surge', trigger: 'every_nth_turn', triggerValue: 5, effect: 'Unavoidable Water attack, applies Frozen (skip turn)', effectType: 'unavoidable', effectValue: { type: 'water', status: 'frozen', duration: 1 } },
      { name: 'Regeneration', trigger: 'always', effect: 'Heals 25 HP per turn while above 50% HP', effectType: 'regeneration', effectValue: { hp: 25, condition: 'above_50_hp' } },
      { name: 'Fury of the Deep', trigger: 'below_50_hp', effect: '+10 Power, attacks twice per turn', effectType: 'extra_attack', effectValue: { power: 10, attacks: 2 } },
      { name: 'Death Throes', trigger: 'below_25_hp', effect: 'Abyssal Presence increases to 20 damage per turn', effectType: 'damage', effectValue: { damage: 20, type: 'water', perTurn: true } }
    ],
    rewards: { xp: 600, goldMin: 400, goldMax: 800, remnant: 'Fang of the Endless Maw' },
    description: 'An ancient leviathan that dwells in the flooded caves beneath the Mistfall Coast. Part eel, part shark, part nightmare — Draug has devoured ships, villages, and countless adventurers. Its hunger is eternal, and the abyss is its domain.'
  }
];

module.exports = beastMonsters;
