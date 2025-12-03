/**
 * Skill Trees Data
 * Complete skill tree structure for all 8 callings
 *
 * Structure:
 * - 6 branches per calling (one per stat: power, toughness, brilliance, spirit, acuity, instinct)
 * - 6 stages per branch
 * - Stage 1: Basic ability (free, universal)
 * - Stage 2: Active ability (1 SP)
 * - Stage 3: Passive buff (2 SP)
 * - Stage 4: Improved basic ability (3 SP)
 * - Stage 5: Passive mastery (4 SP)
 * - Stage 6: Heroic ultimate (5 SP)
 */

// SP costs by stage
const STAGE_COSTS = {
  1: 0,  // Free at character creation
  2: 1,  // Entry-level upgrade
  3: 2,  // First passive buff
  4: 3,  // Improved basic ability
  5: 4,  // Mastery passive
  6: 5   // Ultimate ability
};

// Universal Stage 1 abilities (same for all callings)
const BASIC_ABILITIES = {
  power: {
    id: 'strike',
    name: 'Strike',
    description: 'A basic physical attack that deals damage based on your Power stat.',
    type: 'active',
    resource: 'stamina',
    cost: 0
  },
  toughness: {
    id: 'guard',
    name: 'Guard',
    description: 'A defensive stance that reduces incoming damage for this turn.',
    type: 'active',
    resource: 'stamina',
    cost: 0
  },
  brilliance: {
    id: 'spark',
    name: 'Spark',
    description: 'A basic magical attack that deals damage based on your Brilliance stat.',
    type: 'active',
    resource: 'mana',
    cost: 0
  },
  spirit: {
    id: 'fortify',
    name: 'Fortify',
    description: 'Bolster your magical defenses, increasing Spirit-based resistance.',
    type: 'active',
    resource: 'mana',
    cost: 0
  },
  acuity: {
    id: 'focus',
    name: 'Focus',
    description: 'Concentrate to increase your hit chance for the next attack.',
    type: 'active',
    resource: 'stamina',
    cost: 0
  },
  instinct: {
    id: 'evade',
    name: 'Evade',
    description: 'Prepare to dodge, increasing your chance to avoid the next attack.',
    type: 'active',
    resource: 'stamina',
    cost: 0
  }
};

// ============================================================
// WARRIOR SKILL TREE
// ============================================================
const warriorSkillTree = {
  power: {
    pathName: 'Path of the Berserker',
    description: 'Embrace raw fury to overwhelm enemies with devastating attacks.',
    stages: {
      1: { ...BASIC_ABILITIES.power },
      2: { id: 'rending_blow', name: 'Rending Blow', type: 'active', description: 'A powerful strike that causes bleeding damage over time.' },
      3: { id: 'bloodlust', name: 'Bloodlust', type: 'passive', description: 'Gain increased Power when your HP drops below 50%.' },
      4: { id: 'execution', name: 'Execution', type: 'active', description: 'An enhanced Strike with bonus damage against wounded enemies.' },
      5: { id: 'berserker_rage', name: 'Berserker Rage', type: 'passive', description: 'Critical hits restore a portion of your Stamina.' },
      6: { id: 'cataclysm', name: 'Cataclysm', type: 'active', description: 'Unleash a devastating blow that deals massive damage to the enemy.' }
    }
  },
  toughness: {
    pathName: 'Path of the Bulwark',
    description: 'Become an immovable fortress that withstands any assault.',
    stages: {
      1: { ...BASIC_ABILITIES.toughness },
      2: { id: 'shield_bash', name: 'Shield Bash', type: 'active', description: 'Bash an enemy with your shield, stunning them briefly.' },
      3: { id: 'iron_skin', name: 'Iron Skin', type: 'passive', description: 'Permanently increase your physical damage reduction.' },
      4: { id: 'fortified_guard', name: 'Fortified Guard', type: 'active', description: 'An enhanced Guard that also reflects damage to attackers.' },
      5: { id: 'unbreakable', name: 'Unbreakable', type: 'passive', description: 'Gain a chance to ignore lethal damage once per combat.' },
      6: { id: 'last_stand', name: 'Last Stand', type: 'active', description: 'Become invulnerable for 2 turns but cannot attack.' }
    }
  },
  brilliance: {
    pathName: 'Path of the Spellblade',
    description: 'Infuse your weapons with arcane energy for magical warfare.',
    stages: {
      1: { ...BASIC_ABILITIES.brilliance },
      2: { id: 'arcane_edge', name: 'Arcane Edge', type: 'active', description: 'Enchant your weapon to deal bonus magical damage.' },
      3: { id: 'mana_conduit', name: 'Mana Conduit', type: 'passive', description: 'Physical attacks restore a small amount of Mana.' },
      4: { id: 'elemental_spark', name: 'Elemental Spark', type: 'active', description: 'An enhanced Spark that can apply elemental effects.' },
      5: { id: 'spell_integration', name: 'Spell Integration', type: 'passive', description: 'Increase magical damage based on your Power stat.' },
      6: { id: 'blade_storm', name: 'Blade Storm', type: 'active', description: 'Unleash a whirlwind of enchanted blades hitting the enemy multiple times.' }
    }
  },
  spirit: {
    pathName: 'Path of the Unyielding',
    description: 'Steel your mind against magical assault and mental manipulation.',
    stages: {
      1: { ...BASIC_ABILITIES.spirit },
      2: { id: 'battle_cry', name: 'Battle Cry', type: 'active', description: 'Let out a fierce cry that removes fear and boosts morale.' },
      3: { id: 'mental_fortress', name: 'Mental Fortress', type: 'passive', description: 'Increase resistance to status effects.' },
      4: { id: 'resolute_fortify', name: 'Resolute Fortify', type: 'active', description: 'An enhanced Fortify that also cleanses debuffs.' },
      5: { id: 'indomitable_will', name: 'Indomitable Will', type: 'passive', description: 'Immune to fear and charm effects.' },
      6: { id: 'warriors_spirit', name: "Warrior's Spirit", type: 'active', description: 'Channel inner strength to fully restore HP and remove all debuffs.' }
    }
  },
  acuity: {
    pathName: 'Path of the Weaponmaster',
    description: 'Master the art of precision combat and exploit enemy weaknesses.',
    stages: {
      1: { ...BASIC_ABILITIES.acuity },
      2: { id: 'precise_strike', name: 'Precise Strike', type: 'active', description: 'A calculated attack that cannot miss.' },
      3: { id: 'combat_expertise', name: 'Combat Expertise', type: 'passive', description: 'Permanently increase your critical hit chance.' },
      4: { id: 'deadly_focus', name: 'Deadly Focus', type: 'active', description: 'An enhanced Focus that guarantees a critical hit.' },
      5: { id: 'master_tactician', name: 'Master Tactician', type: 'passive', description: 'Gain bonus damage against enemies you have studied.' },
      6: { id: 'perfect_form', name: 'Perfect Form', type: 'active', description: 'Enter a state of flawless technique, tripling crit damage for 3 turns.' }
    }
  },
  instinct: {
    pathName: 'Path of the Veteran',
    description: 'Use battlefield experience to anticipate and counter enemy actions.',
    stages: {
      1: { ...BASIC_ABILITIES.instinct },
      2: { id: 'counterattack', name: 'Counterattack', type: 'active', description: 'Prepare to automatically strike back when attacked.' },
      3: { id: 'battle_instincts', name: 'Battle Instincts', type: 'passive', description: 'Increase dodge chance when at low HP.' },
      4: { id: 'evasive_maneuvers', name: 'Evasive Maneuvers', type: 'active', description: 'An enhanced Evade with a chance to completely negate damage.' },
      5: { id: 'sixth_sense', name: 'Sixth Sense', type: 'passive', description: 'Cannot be surprised or flanked in combat.' },
      6: { id: 'avatar_of_war', name: 'Avatar of War', type: 'active', description: 'Channel decades of combat experience, gaining all stat bonuses for 3 turns.' }
    }
  }
};

// ============================================================
// PALADIN SKILL TREE
// ============================================================
const paladinSkillTree = {
  power: {
    pathName: 'Path of the Crusader',
    description: 'Smite evil with righteous fury and holy vengeance.',
    stages: {
      1: { ...BASIC_ABILITIES.power },
      2: { id: 'holy_smite', name: 'Holy Smite', type: 'active', description: 'Strike with divine power, dealing bonus damage to undead and demons.' },
      3: { id: 'zealous_might', name: 'Zealous Might', type: 'passive', description: 'Increase Power when fighting unholy enemies.' },
      4: { id: 'righteous_strike', name: 'Righteous Strike', type: 'active', description: 'An enhanced Strike that heals you for a portion of damage dealt.' },
      5: { id: 'divine_strength', name: 'Divine Strength', type: 'passive', description: 'Your attacks have a chance to deal bonus holy damage.' },
      6: { id: 'judgment_day', name: 'Judgment Day', type: 'active', description: 'Call down divine judgment, dealing massive holy damage to the enemy.' }
    }
  },
  toughness: {
    pathName: 'Path of the Aegis',
    description: 'Become a divine shield blessed with holy protection.',
    stages: {
      1: { ...BASIC_ABILITIES.toughness },
      2: { id: 'divine_shield', name: 'Divine Shield', type: 'active', description: 'Surround yourself with holy light that absorbs damage.' },
      3: { id: 'blessed_armor', name: 'Blessed Armor', type: 'passive', description: 'Your armor gains bonus holy resistance.' },
      4: { id: 'sanctuary', name: 'Sanctuary', type: 'active', description: 'An enhanced Guard that creates a zone of divine protection.' },
      5: { id: 'martyrdom', name: 'Martyrdom', type: 'passive', description: 'Taking damage has a chance to restore your HP.' },
      6: { id: 'divine_intervention', name: 'Divine Intervention', type: 'active', description: 'Call upon the gods to make you invulnerable for 1 turn.' }
    }
  },
  brilliance: {
    pathName: 'Path of Sacred Flame',
    description: 'Wield the purifying fires of divine magic.',
    stages: {
      1: { ...BASIC_ABILITIES.brilliance },
      2: { id: 'sacred_flame', name: 'Sacred Flame', type: 'active', description: 'Conjure holy fire that burns enemies and purifies corruption.' },
      3: { id: 'inner_light', name: 'Inner Light', type: 'passive', description: 'Your magical attacks dispel darkness effects.' },
      4: { id: 'purifying_spark', name: 'Purifying Spark', type: 'active', description: 'An enhanced Spark that removes buffs from enemies.' },
      5: { id: 'radiant_aura', name: 'Radiant Aura', type: 'passive', description: 'Constantly emit light that damages nearby undead.' },
      6: { id: 'pillar_of_light', name: 'Pillar of Light', type: 'active', description: 'Call down a pillar of divine light that devastates unholy enemies.' }
    }
  },
  spirit: {
    pathName: 'Path of the Faithful',
    description: 'Draw upon unshakeable faith for divine protection.',
    stages: {
      1: { ...BASIC_ABILITIES.spirit },
      2: { id: 'lay_on_hands', name: 'Lay on Hands', type: 'active', description: 'Channel divine energy to heal yourself significantly.' },
      3: { id: 'blessed_resilience', name: 'Blessed Resilience', type: 'passive', description: 'Increase maximum HP based on Spirit.' },
      4: { id: 'divine_fortify', name: 'Divine Fortify', type: 'active', description: 'An enhanced Fortify that also grants HP regeneration.' },
      5: { id: 'aura_of_protection', name: 'Aura of Protection', type: 'passive', description: 'Gain bonus magical resistance passively.' },
      6: { id: 'second_chance', name: 'Second Chance', type: 'active', description: 'If you would die, instead restore to full HP (once per battle).' }
    }
  },
  acuity: {
    pathName: 'Path of Judgment',
    description: 'Discern the truth and deliver precise divine justice.',
    stages: {
      1: { ...BASIC_ABILITIES.acuity },
      2: { id: 'detect_evil', name: 'Detect Evil', type: 'active', description: 'Reveal hidden enemies and identify their weaknesses.' },
      3: { id: 'divine_guidance', name: 'Divine Guidance', type: 'passive', description: 'Increase accuracy against evil creatures.' },
      4: { id: 'true_sight', name: 'True Sight', type: 'active', description: 'An enhanced Focus that reveals invisible enemies.' },
      5: { id: 'unerring_justice', name: 'Unerring Justice', type: 'passive', description: 'Your attacks against marked enemies cannot miss.' },
      6: { id: 'final_judgment', name: 'Final Judgment', type: 'active', description: 'Pass divine judgment on an enemy, dealing damage based on their sins.' }
    }
  },
  instinct: {
    pathName: 'Path of Vigilance',
    description: 'Maintain constant awareness and divine reflexes.',
    stages: {
      1: { ...BASIC_ABILITIES.instinct },
      2: { id: 'divine_reflex', name: 'Divine Reflex', type: 'active', description: 'React with holy speed to avoid an incoming attack.' },
      3: { id: 'watchful_guardian', name: 'Watchful Guardian', type: 'passive', description: 'Gain bonus dodge chance from divine awareness.' },
      4: { id: 'divine_dodge', name: 'Divine Dodge', type: 'active', description: 'An enhanced Evade guided by divine providence.' },
      5: { id: 'ever_vigilant', name: 'Ever Vigilant', type: 'passive', description: 'Cannot be caught off-guard; always act first in combat.' },
      6: { id: 'guardian_angel', name: 'Guardian Angel', type: 'active', description: 'Summon a divine protector that shields you for 3 turns.' }
    }
  }
};

// ============================================================
// HUNTER SKILL TREE
// ============================================================
const hunterSkillTree = {
  power: {
    pathName: 'Path of the Gorilla',
    description: 'Channel primal strength for devastating melee attacks.',
    stages: {
      1: { ...BASIC_ABILITIES.power },
      2: { id: 'savage_strike', name: 'Savage Strike', type: 'active', description: 'A brutal attack that ignores a portion of enemy armor.' },
      3: { id: 'primal_strength', name: 'Primal Strength', type: 'passive', description: 'Increase melee damage when no ranged weapon equipped.' },
      4: { id: 'crushing_blow', name: 'Crushing Blow', type: 'active', description: 'An enhanced Strike that can stun the target.' },
      5: { id: 'apex_predator', name: 'Apex Predator', type: 'passive', description: 'Deal bonus damage to enemies with lower HP than you.' },
      6: { id: 'primal_fury', name: 'Primal Fury', type: 'active', description: 'Enter a primal rage, attacking multiple times in one turn.' }
    }
  },
  toughness: {
    pathName: 'Path of the Rhino',
    description: 'Develop thick skin and unstoppable momentum.',
    stages: {
      1: { ...BASIC_ABILITIES.toughness },
      2: { id: 'thick_hide', name: 'Thick Hide', type: 'active', description: 'Temporarily increase your damage resistance.' },
      3: { id: 'natural_armor', name: 'Natural Armor', type: 'passive', description: 'Gain bonus armor when not wearing heavy armor.' },
      4: { id: 'resilient_guard', name: 'Resilient Guard', type: 'active', description: 'An enhanced Guard that also heals over time.' },
      5: { id: 'unstoppable', name: 'Unstoppable', type: 'passive', description: 'Reduce the duration of movement-impairing effects.' },
      6: { id: 'stampede', name: 'Stampede', type: 'active', description: 'Charge into the enemy with unstoppable force, dealing massive damage.' }
    }
  },
  brilliance: {
    pathName: 'Path of the Whale',
    description: 'Tap into ancient beast magic and primal wisdom.',
    stages: {
      1: { ...BASIC_ABILITIES.brilliance },
      2: { id: 'beast_tongue', name: 'Beast Tongue', type: 'active', description: 'Commune with nature spirits to reveal enemy weaknesses.' },
      3: { id: 'natural_wisdom', name: 'Natural Wisdom', type: 'passive', description: 'Increase mana regeneration while outdoors.' },
      4: { id: 'primal_spark', name: 'Primal Spark', type: 'active', description: 'An enhanced Spark infused with nature magic.' },
      5: { id: 'beast_bond', name: 'Beast Bond', type: 'passive', description: 'Channel the spirit of beasts to enhance your abilities.' },
      6: { id: 'call_of_the_wild', name: 'Call of the Wild', type: 'active', description: 'Summon a powerful spirit beast to attack the enemy.' }
    }
  },
  spirit: {
    pathName: 'Path of the Wolf',
    description: 'Develop primal instincts and spiritual connection.',
    stages: {
      1: { ...BASIC_ABILITIES.spirit },
      2: { id: 'lone_wolf', name: 'Lone Wolf', type: 'active', description: 'Embrace your independence for bonus damage and defense.' },
      3: { id: 'spirit_bond', name: 'Spirit Bond', type: 'passive', description: 'Your connection to nature increases your Spirit.' },
      4: { id: 'howling_fortify', name: 'Howling Fortify', type: 'active', description: 'An enhanced Fortify that intimidates the enemy.' },
      5: { id: 'alpha_presence', name: 'Alpha Presence', type: 'passive', description: 'Your presence weakens the enemy\'s resolve.' },
      6: { id: 'spirit_wolf', name: 'Spirit Wolf', type: 'active', description: 'Summon a spirit wolf that fights alongside you for 3 turns.' }
    }
  },
  acuity: {
    pathName: 'Path of the Owl',
    description: 'See with perfect clarity and strike with precision.',
    stages: {
      1: { ...BASIC_ABILITIES.acuity },
      2: { id: 'aimed_shot', name: 'Aimed Shot', type: 'active', description: 'A carefully aimed ranged attack with bonus damage.' },
      3: { id: 'keen_eyes', name: 'Keen Eyes', type: 'passive', description: 'Increase critical hit chance with ranged weapons.' },
      4: { id: 'perfect_focus', name: 'Perfect Focus', type: 'active', description: 'An enhanced Focus that marks the target for bonus damage.' },
      5: { id: 'eagle_eye', name: 'Eagle Eye', type: 'passive', description: 'Ranged attacks have extended range and ignore cover.' },
      6: { id: 'kill_shot', name: 'Kill Shot', type: 'active', description: 'A devastating shot that deals massive damage to a single target.' }
    }
  },
  instinct: {
    pathName: 'Path of the Hawk',
    description: 'React with lightning speed and predatory precision.',
    stages: {
      1: { ...BASIC_ABILITIES.instinct },
      2: { id: 'quick_shot', name: 'Quick Shot', type: 'active', description: 'A rapid attack that can be used while moving.' },
      3: { id: 'predator_reflexes', name: 'Predator Reflexes', type: 'passive', description: 'Increase dodge chance against ranged attacks.' },
      4: { id: 'swift_evade', name: 'Swift Evade', type: 'active', description: 'An enhanced Evade that also repositions you.' },
      5: { id: 'hunters_mark', name: "Hunter's Mark", type: 'passive', description: 'Track marked prey, preventing them from escaping.' },
      6: { id: 'death_from_above', name: 'Death from Above', type: 'active', description: 'Leap into the air and rain arrows on the enemy below.' }
    }
  }
};

// ============================================================
// ROGUE SKILL TREE
// ============================================================
const rogueSkillTree = {
  power: {
    pathName: 'Path of the Assassin',
    description: 'Strike from the shadows with lethal precision.',
    stages: {
      1: { ...BASIC_ABILITIES.power },
      2: { id: 'backstab', name: 'Backstab', type: 'active', description: 'Attack from behind for massive bonus damage.' },
      3: { id: 'lethality', name: 'Lethality', type: 'passive', description: 'Increase critical damage from stealth attacks.' },
      4: { id: 'assassinate', name: 'Assassinate', type: 'active', description: 'An enhanced Strike that can instantly kill weakened enemies.' },
      5: { id: 'death_mark', name: 'Death Mark', type: 'passive', description: 'Marked enemies take increased damage from all sources.' },
      6: { id: 'execute', name: 'Execute', type: 'active', description: 'Instantly kill any enemy below 20% HP.' }
    }
  },
  toughness: {
    pathName: 'Path of Evasion',
    description: 'Survive through agility rather than armor.',
    stages: {
      1: { ...BASIC_ABILITIES.toughness },
      2: { id: 'smoke_bomb', name: 'Smoke Bomb', type: 'active', description: 'Create a cloud of smoke that reduces enemy accuracy.' },
      3: { id: 'slippery', name: 'Slippery', type: 'passive', description: 'Reduce damage taken when at low HP.' },
      4: { id: 'nimble_guard', name: 'Nimble Guard', type: 'active', description: 'An enhanced Guard that uses agility instead of armor.' },
      5: { id: 'uncatchable', name: 'Uncatchable', type: 'passive', description: 'Automatically escape from grapples and snares.' },
      6: { id: 'shadow_step', name: 'Shadow Step', type: 'active', description: 'Teleport through shadows to avoid all damage for 1 turn.' }
    }
  },
  brilliance: {
    pathName: 'Path of the Trickster',
    description: 'Use illusions and misdirection to confuse the enemy.',
    stages: {
      1: { ...BASIC_ABILITIES.brilliance },
      2: { id: 'decoy', name: 'Decoy', type: 'active', description: 'Create an illusory copy of yourself to distract the enemy.' },
      3: { id: 'cunning', name: 'Cunning', type: 'passive', description: 'Increase spell effectiveness based on Instinct.' },
      4: { id: 'confusing_spark', name: 'Confusing Spark', type: 'active', description: 'An enhanced Spark that can confuse the target.' },
      5: { id: 'mirror_images', name: 'Mirror Images', type: 'passive', description: 'Attacks against you have a chance to hit an illusion instead.' },
      6: { id: 'mass_hysteria', name: 'Mass Hysteria', type: 'active', description: 'Drive the enemy into a confused frenzy, causing them to hurt themselves for 2 turns.' }
    }
  },
  spirit: {
    pathName: 'Path of the Ghost',
    description: 'Become one with the shadows and move unseen.',
    stages: {
      1: { ...BASIC_ABILITIES.spirit },
      2: { id: 'vanish', name: 'Vanish', type: 'active', description: 'Disappear from sight, entering stealth mid-combat.' },
      3: { id: 'shadow_affinity', name: 'Shadow Affinity', type: 'passive', description: 'Increase stealth effectiveness in darkness.' },
      4: { id: 'ghostly_fortify', name: 'Ghostly Fortify', type: 'active', description: 'An enhanced Fortify that makes you partially incorporeal.' },
      5: { id: 'one_with_shadows', name: 'One with Shadows', type: 'passive', description: 'Remain in stealth even after attacking once.' },
      6: { id: 'phantom_walk', name: 'Phantom Walk', type: 'active', description: 'Become completely intangible, immune to all attacks for 2 turns.' }
    }
  },
  acuity: {
    pathName: 'Path of the Viper',
    description: 'Strike vital points with poisoned blades.',
    stages: {
      1: { ...BASIC_ABILITIES.acuity },
      2: { id: 'poisoned_blade', name: 'Poisoned Blade', type: 'active', description: 'Coat your weapon with poison that damages over time.' },
      3: { id: 'vital_strike', name: 'Vital Strike', type: 'passive', description: 'Critical hits have a chance to apply additional effects.' },
      4: { id: 'pinpoint_focus', name: 'Pinpoint Focus', type: 'active', description: 'An enhanced Focus that reveals enemy weak points.' },
      5: { id: 'neurotoxin', name: 'Neurotoxin', type: 'passive', description: 'Your poisons can paralyze the enemy.' },
      6: { id: 'death_lotus', name: 'Death Lotus', type: 'active', description: 'Spin rapidly, striking multiple times and applying deadly poison.' }
    }
  },
  instinct: {
    pathName: 'Path of Second Sight',
    description: 'Anticipate danger before it arrives.',
    stages: {
      1: { ...BASIC_ABILITIES.instinct },
      2: { id: 'anticipate', name: 'Anticipate', type: 'active', description: 'Predict the next enemy attack and prepare a counter.' },
      3: { id: 'danger_sense', name: 'Danger Sense', type: 'passive', description: 'Cannot be surprised; always aware of nearby threats.' },
      4: { id: 'premonition', name: 'Premonition', type: 'active', description: 'An enhanced Evade that also reveals the next enemy action.' },
      5: { id: 'foresight', name: 'Foresight', type: 'passive', description: 'Gain bonus dodge against the first attack each turn.' },
      6: { id: 'time_slip', name: 'Time Slip', type: 'active', description: 'Step briefly into the future, gaining an extra turn.' }
    }
  }
};

// ============================================================
// MAGE SKILL TREE
// ============================================================
const mageSkillTree = {
  power: {
    pathName: 'Path of Destruction',
    description: 'Unleash devastating elemental forces.',
    stages: {
      1: { ...BASIC_ABILITIES.power },
      2: { id: 'fireball', name: 'Fireball', type: 'active', description: 'Hurl a ball of fire that explodes on impact.' },
      3: { id: 'elemental_fury', name: 'Elemental Fury', type: 'passive', description: 'Increase damage of elemental spells.' },
      4: { id: 'empowered_strike', name: 'Empowered Strike', type: 'active', description: 'An enhanced Strike infused with magical energy.' },
      5: { id: 'chain_reaction', name: 'Chain Reaction', type: 'passive', description: 'Spell kills can trigger explosions.' },
      6: { id: 'meteor_storm', name: 'Meteor Storm', type: 'active', description: 'Call down a devastating meteor strike on the enemy.' }
    }
  },
  toughness: {
    pathName: 'Path of Warding',
    description: 'Create magical barriers and protective enchantments.',
    stages: {
      1: { ...BASIC_ABILITIES.toughness },
      2: { id: 'mana_shield', name: 'Mana Shield', type: 'active', description: 'Convert mana into a protective barrier.' },
      3: { id: 'arcane_barrier', name: 'Arcane Barrier', type: 'passive', description: 'Gain a regenerating magical shield.' },
      4: { id: 'warded_guard', name: 'Warded Guard', type: 'active', description: 'An enhanced Guard reinforced with magic.' },
      5: { id: 'spell_absorption', name: 'Spell Absorption', type: 'passive', description: 'Blocked spells restore mana.' },
      6: { id: 'invulnerability', name: 'Invulnerability', type: 'active', description: 'Become immune to all damage for 2 turns.' }
    }
  },
  brilliance: {
    pathName: 'Path of the Arcanist',
    description: 'Master the fundamental forces of magic.',
    stages: {
      1: { ...BASIC_ABILITIES.brilliance },
      2: { id: 'arcane_missiles', name: 'Arcane Missiles', type: 'active', description: 'Fire multiple bolts of pure arcane energy.' },
      3: { id: 'arcane_mastery', name: 'Arcane Mastery', type: 'passive', description: 'Reduce mana cost of all spells.' },
      4: { id: 'greater_spark', name: 'Greater Spark', type: 'active', description: 'An enhanced Spark with increased damage and range.' },
      5: { id: 'spell_echo', name: 'Spell Echo', type: 'passive', description: 'Spells have a chance to cast twice.' },
      6: { id: 'arcane_devastation', name: 'Arcane Devastation', type: 'active', description: 'Channel pure arcane power to annihilate a single target.' }
    }
  },
  spirit: {
    pathName: 'Path of the Sage',
    description: 'Achieve enlightenment through magical study.',
    stages: {
      1: { ...BASIC_ABILITIES.spirit },
      2: { id: 'mana_surge', name: 'Mana Surge', type: 'active', description: 'Rapidly regenerate mana over several turns.' },
      3: { id: 'expanded_mind', name: 'Expanded Mind', type: 'passive', description: 'Increase maximum mana.' },
      4: { id: 'tranquil_fortify', name: 'Tranquil Fortify', type: 'active', description: 'An enhanced Fortify that also restores mana.' },
      5: { id: 'infinite_knowledge', name: 'Infinite Knowledge', type: 'passive', description: 'Gain bonus spell power based on remaining mana.' },
      6: { id: 'wish', name: 'Wish', type: 'active', description: 'Cast any spell without consuming mana (once per battle).' }
    }
  },
  acuity: {
    pathName: 'Path of the Evoker',
    description: 'Perfect the art of spell precision and targeting.',
    stages: {
      1: { ...BASIC_ABILITIES.acuity },
      2: { id: 'precision_bolt', name: 'Precision Bolt', type: 'active', description: 'A perfectly aimed magical attack that cannot miss.' },
      3: { id: 'spell_penetration', name: 'Spell Penetration', type: 'passive', description: 'Spells ignore a portion of magical resistance.' },
      4: { id: 'arcane_focus', name: 'Arcane Focus', type: 'active', description: 'An enhanced Focus that amplifies spell damage.' },
      5: { id: 'critical_casting', name: 'Critical Casting', type: 'passive', description: 'Spells can critically hit for bonus damage.' },
      6: { id: 'disintegrate', name: 'Disintegrate', type: 'active', description: 'Fire a beam that completely destroys the target.' }
    }
  },
  instinct: {
    pathName: 'Path of Spellbreaking',
    description: 'Counter enemy magic and disrupt their casting.',
    stages: {
      1: { ...BASIC_ABILITIES.instinct },
      2: { id: 'counterspell', name: 'Counterspell', type: 'active', description: 'Interrupt an enemy spellcast.' },
      3: { id: 'spell_resistance', name: 'Spell Resistance', type: 'passive', description: 'Reduce incoming magical damage.' },
      4: { id: 'spell_dodge', name: 'Spell Dodge', type: 'active', description: 'An enhanced Evade specifically for magical attacks.' },
      5: { id: 'antimagic_aura', name: 'Antimagic Aura', type: 'passive', description: 'Reduce enemy spell effectiveness near you.' },
      6: { id: 'mana_burn', name: 'Mana Burn', type: 'active', description: 'Drain all mana from an enemy, dealing damage based on amount drained.' }
    }
  }
};

// ============================================================
// PRIEST SKILL TREE
// ============================================================
const priestSkillTree = {
  power: {
    pathName: 'Path of the Exorcist',
    description: 'Purge evil with holy wrath.',
    stages: {
      1: { ...BASIC_ABILITIES.power },
      2: { id: 'smite', name: 'Smite', type: 'active', description: 'Strike an enemy with holy power.' },
      3: { id: 'holy_fervor', name: 'Holy Fervor', type: 'passive', description: 'Increase damage against undead and demons.' },
      4: { id: 'divine_strike', name: 'Divine Strike', type: 'active', description: 'An enhanced Strike infused with holy energy.' },
      5: { id: 'wrath_of_heaven', name: 'Wrath of Heaven', type: 'passive', description: 'Critical hits deal bonus holy damage.' },
      6: { id: 'banishment', name: 'Banishment', type: 'active', description: 'Instantly destroy an undead or demon enemy.' }
    }
  },
  toughness: {
    pathName: 'Path of the Martyr',
    description: 'Endure pain through divine fortitude.',
    stages: {
      1: { ...BASIC_ABILITIES.toughness },
      2: { id: 'pain_suppression', name: 'Pain Suppression', type: 'active', description: 'Reduce damage taken significantly for a short time.' },
      3: { id: 'endurance', name: 'Endurance', type: 'passive', description: 'Increase maximum HP.' },
      4: { id: 'martyrs_guard', name: "Martyr's Guard", type: 'active', description: 'An enhanced Guard that converts damage taken into healing.' },
      5: { id: 'undying_faith', name: 'Undying Faith', type: 'passive', description: 'Survive lethal damage once per battle.' },
      6: { id: 'divine_renewal', name: 'Divine Renewal', type: 'active', description: 'Channel divine power to fully restore your HP and cleanse all debuffs.' }
    }
  },
  brilliance: {
    pathName: 'Path of the Healer',
    description: 'Master the divine arts of self-restoration.',
    stages: {
      1: { ...BASIC_ABILITIES.brilliance },
      2: { id: 'heal', name: 'Heal', type: 'active', description: 'Restore a significant amount of your HP.' },
      3: { id: 'improved_healing', name: 'Improved Healing', type: 'passive', description: 'Increase healing spell effectiveness.' },
      4: { id: 'greater_spark', name: 'Greater Spark', type: 'active', description: 'An enhanced Spark that also heals you for damage dealt.' },
      5: { id: 'healing_mastery', name: 'Healing Mastery', type: 'passive', description: 'Healing spells can critically heal.' },
      6: { id: 'divine_hymn', name: 'Divine Hymn', type: 'active', description: 'Sing a hymn that fully heals you over 3 turns.' }
    }
  },
  spirit: {
    pathName: 'Path of the Blessed',
    description: 'Channel divine blessings to empower yourself.',
    stages: {
      1: { ...BASIC_ABILITIES.spirit },
      2: { id: 'blessing', name: 'Blessing', type: 'active', description: 'Grant yourself a temporary stat bonus.' },
      3: { id: 'divine_favor', name: 'Divine Favor', type: 'passive', description: 'Increase the effectiveness of your buffs.' },
      4: { id: 'greater_fortify', name: 'Greater Fortify', type: 'active', description: 'An enhanced Fortify with increased duration and power.' },
      5: { id: 'aura_of_grace', name: 'Aura of Grace', type: 'passive', description: 'Passively regenerate HP slowly over time.' },
      6: { id: 'power_word_shield', name: 'Power Word: Shield', type: 'active', description: 'Create an impenetrable divine shield around yourself for 1 turn.' }
    }
  },
  acuity: {
    pathName: 'Path of the Mender',
    description: 'Precisely time healing for maximum effect.',
    stages: {
      1: { ...BASIC_ABILITIES.acuity },
      2: { id: 'targeted_heal', name: 'Targeted Heal', type: 'active', description: 'A precise heal that restores more HP when you are wounded.' },
      3: { id: 'efficient_casting', name: 'Efficient Casting', type: 'passive', description: 'Reduce mana cost of healing spells.' },
      4: { id: 'surgical_focus', name: 'Surgical Focus', type: 'active', description: 'An enhanced Focus that improves your next heal effectiveness.' },
      5: { id: 'emergency_healing', name: 'Emergency Healing', type: 'passive', description: 'Automatically heal yourself when HP drops below 25%.' },
      6: { id: 'miracle', name: 'Miracle', type: 'active', description: 'Instantly restore yourself to full HP and remove all debuffs.' }
    }
  },
  instinct: {
    pathName: 'Path of the Judicator',
    description: 'Judge threats and react with divine speed.',
    stages: {
      1: { ...BASIC_ABILITIES.instinct },
      2: { id: 'holy_dodge', name: 'Holy Dodge', type: 'active', description: 'Call upon divine protection to avoid an attack.' },
      3: { id: 'divine_awareness', name: 'Divine Awareness', type: 'passive', description: 'Sense incoming attacks, increasing dodge chance.' },
      4: { id: 'prophetic_evade', name: 'Prophetic Evade', type: 'active', description: 'An enhanced Evade guided by divine prophecy.' },
      5: { id: 'guardian_spirit', name: 'Guardian Spirit', type: 'passive', description: 'A spirit watches over you, preventing lethal damage once.' },
      6: { id: 'divine_retribution', name: 'Divine Retribution', type: 'active', description: 'Reflect all damage back to attackers for 2 turns.' }
    }
  }
};

// ============================================================
// BARD SKILL TREE
// ============================================================
const bardSkillTree = {
  power: {
    pathName: 'Path of the Warcry',
    description: 'Empower yourself with songs of martial prowess.',
    stages: {
      1: { ...BASIC_ABILITIES.power },
      2: { id: 'inspiring_strike', name: 'Inspiring Strike', type: 'active', description: 'An attack that also empowers your next action.' },
      3: { id: 'battle_anthem', name: 'Battle Anthem', type: 'passive', description: 'Gain bonus Power while you are singing.' },
      4: { id: 'thunderous_strike', name: 'Thunderous Strike', type: 'active', description: 'An enhanced Strike that echoes with sonic force.' },
      5: { id: 'epic_inspiration', name: 'Epic Inspiration', type: 'passive', description: 'Your empowering songs last longer.' },
      6: { id: 'song_of_war', name: 'Song of War', type: 'active', description: 'Sing an epic war song that doubles your damage for 3 turns.' }
    }
  },
  toughness: {
    pathName: 'Path of the Shield Song',
    description: 'Protect yourself with defensive melodies.',
    stages: {
      1: { ...BASIC_ABILITIES.toughness },
      2: { id: 'defensive_verse', name: 'Defensive Verse', type: 'active', description: 'Sing a verse that reduces damage you take.' },
      3: { id: 'harmonious_defense', name: 'Harmonious Defense', type: 'passive', description: 'Increase your defense while singing.' },
      4: { id: 'resonant_guard', name: 'Resonant Guard', type: 'active', description: 'An enhanced Guard that creates a sonic barrier.' },
      5: { id: 'lasting_protection', name: 'Lasting Protection', type: 'passive', description: 'Defensive songs persist even after you stop singing.' },
      6: { id: 'fortress_ballad', name: 'Fortress Ballad', type: 'active', description: 'Sing a ballad that makes you immune to physical damage for 1 turn.' }
    }
  },
  brilliance: {
    pathName: 'Path of the Siren',
    description: 'Weave enchanting magic through song.',
    stages: {
      1: { ...BASIC_ABILITIES.brilliance },
      2: { id: 'dissonant_whispers', name: 'Dissonant Whispers', type: 'active', description: 'Whisper maddening words that damage and confuse the enemy.' },
      3: { id: 'magical_melody', name: 'Magical Melody', type: 'passive', description: 'Increase magical damage from songs.' },
      4: { id: 'piercing_note', name: 'Piercing Note', type: 'active', description: 'An enhanced Spark that ignores magical resistance.' },
      5: { id: 'enchanting_voice', name: 'Enchanting Voice', type: 'passive', description: 'Your songs can charm the enemy.' },
      6: { id: 'sirens_call', name: "Siren's Call", type: 'active', description: 'Sing an irresistible song that charms the enemy for 2 turns.' }
    }
  },
  spirit: {
    pathName: 'Path of the Muse',
    description: 'Channel the divine muse to restore your strength.',
    stages: {
      1: { ...BASIC_ABILITIES.spirit },
      2: { id: 'song_of_rest', name: 'Song of Rest', type: 'active', description: 'Sing a soothing song that heals you.' },
      3: { id: 'rejuvenating_melody', name: 'Rejuvenating Melody', type: 'passive', description: 'Your songs slowly restore your HP over time.' },
      4: { id: 'empowering_fortify', name: 'Empowering Fortify', type: 'active', description: 'An enhanced Fortify that also boosts your stats.' },
      5: { id: 'muse_blessing', name: "Muse's Blessing", type: 'passive', description: 'Your songs grant you mana regeneration.' },
      6: { id: 'symphony_of_souls', name: 'Symphony of Souls', type: 'active', description: 'Play a masterpiece that fully restores your HP and MP.' }
    }
  },
  acuity: {
    pathName: 'Path of Mockery',
    description: 'Use cutting words to demoralize the enemy.',
    stages: {
      1: { ...BASIC_ABILITIES.acuity },
      2: { id: 'vicious_mockery', name: 'Vicious Mockery', type: 'active', description: 'Hurl insults that damage and weaken the enemy.' },
      3: { id: 'cutting_words', name: 'Cutting Words', type: 'passive', description: 'Your insults reduce enemy accuracy.' },
      4: { id: 'distracting_focus', name: 'Distracting Focus', type: 'active', description: 'An enhanced Focus that also distracts the enemy.' },
      5: { id: 'demoralizing_presence', name: 'Demoralizing Presence', type: 'passive', description: 'Your presence weakens the enemy\'s stats.' },
      6: { id: 'song_of_despair', name: 'Song of Despair', type: 'active', description: 'Sing a depressing song that causes the enemy to skip their next turn.' }
    }
  },
  instinct: {
    pathName: 'Path of the Virtuoso',
    description: 'Perform with unmatched speed and grace.',
    stages: {
      1: { ...BASIC_ABILITIES.instinct },
      2: { id: 'quick_tempo', name: 'Quick Tempo', type: 'active', description: 'Speed up your performance to act first.' },
      3: { id: 'graceful_movement', name: 'Graceful Movement', type: 'passive', description: 'Increase dodge chance while performing.' },
      4: { id: 'nimble_evade', name: 'Nimble Evade', type: 'active', description: 'An enhanced Evade performed with artistic flair.' },
      5: { id: 'perfect_timing', name: 'Perfect Timing', type: 'passive', description: 'Counter-attack enemies who miss you.' },
      6: { id: 'encore', name: 'Encore', type: 'active', description: 'Perform a spectacular finale, taking two additional turns.' }
    }
  }
};

// ============================================================
// DRUID SKILL TREE
// ============================================================
const druidSkillTree = {
  power: {
    pathName: 'Path of Wildfire',
    description: 'Command the destructive forces of nature.',
    stages: {
      1: { ...BASIC_ABILITIES.power },
      2: { id: 'flame_strike', name: 'Flame Strike', type: 'active', description: 'Call down primal fire on an enemy.' },
      3: { id: 'burning_wrath', name: 'Burning Wrath', type: 'passive', description: 'Fire spells leave burning effects.' },
      4: { id: 'primal_strike', name: 'Primal Strike', type: 'active', description: 'An enhanced Strike infused with natural energy.' },
      5: { id: 'spreading_flames', name: 'Spreading Flames', type: 'passive', description: 'Burning effects intensify over time.' },
      6: { id: 'wildfire', name: 'Wildfire', type: 'active', description: 'Unleash an uncontrollable fire that devastates the enemy.' }
    }
  },
  toughness: {
    pathName: 'Path of Stone',
    description: 'Take on the resilience of the earth itself.',
    stages: {
      1: { ...BASIC_ABILITIES.toughness },
      2: { id: 'barkskin', name: 'Barkskin', type: 'active', description: 'Cover yourself in protective bark armor.' },
      3: { id: 'natural_resilience', name: 'Natural Resilience', type: 'passive', description: 'Increase physical damage resistance.' },
      4: { id: 'ironwood_guard', name: 'Ironwood Guard', type: 'active', description: 'An enhanced Guard reinforced with ironwood.' },
      5: { id: 'rooted', name: 'Rooted', type: 'passive', description: 'Cannot be knocked back or moved against your will.' },
      6: { id: 'avatar_of_stone', name: 'Avatar of Stone', type: 'active', description: 'Transform into living stone, becoming nearly invulnerable for 3 turns.' }
    }
  },
  brilliance: {
    pathName: 'Path of the Stars',
    description: 'Draw power from celestial bodies.',
    stages: {
      1: { ...BASIC_ABILITIES.brilliance },
      2: { id: 'starfire', name: 'Starfire', type: 'active', description: 'Call down stellar energy on an enemy.' },
      3: { id: 'lunar_affinity', name: 'Lunar Affinity', type: 'passive', description: 'Increase spell power at night.' },
      4: { id: 'celestial_spark', name: 'Celestial Spark', type: 'active', description: 'An enhanced Spark infused with starlight.' },
      5: { id: 'solar_empowerment', name: 'Solar Empowerment', type: 'passive', description: 'Increase spell power during the day.' },
      6: { id: 'eclipse', name: 'Eclipse', type: 'active', description: 'Align sun and moon to devastate the enemy with cosmic power.' }
    }
  },
  spirit: {
    pathName: 'Path of Spores',
    description: 'Command the cycle of life and decay.',
    stages: {
      1: { ...BASIC_ABILITIES.spirit },
      2: { id: 'rejuvenation', name: 'Rejuvenation', type: 'active', description: 'Heal yourself over time with natural magic.' },
      3: { id: 'nature_blessing', name: "Nature's Blessing", type: 'passive', description: 'Increase healing spell effectiveness.' },
      4: { id: 'living_fortify', name: 'Living Fortify', type: 'active', description: 'An enhanced Fortify that also heals.' },
      5: { id: 'cycle_of_life', name: 'Cycle of Life', type: 'passive', description: 'When the enemy dies, heal yourself.' },
      6: { id: 'tree_of_life', name: 'Tree of Life', type: 'active', description: 'Transform into a tree of life, massively healing yourself each turn.' }
    }
  },
  acuity: {
    pathName: 'Path of Thorns',
    description: 'Strike with precision using nature\'s weapons.',
    stages: {
      1: { ...BASIC_ABILITIES.acuity },
      2: { id: 'thorn_whip', name: 'Thorn Whip', type: 'active', description: 'Lash an enemy with thorny vines.' },
      3: { id: 'natural_precision', name: 'Natural Precision', type: 'passive', description: 'Increase accuracy with nature spells.' },
      4: { id: 'piercing_focus', name: 'Piercing Focus', type: 'active', description: 'An enhanced Focus that targets enemy weaknesses.' },
      5: { id: 'entangling_thorns', name: 'Entangling Thorns', type: 'passive', description: 'Your thorn attacks can root the enemy in place.' },
      6: { id: 'wall_of_thorns', name: 'Wall of Thorns', type: 'active', description: 'Create a massive wall of thorns that damages and traps the enemy.' }
    }
  },
  instinct: {
    pathName: 'Path of Wildshape',
    description: 'Transform into powerful beast forms.',
    stages: {
      1: { ...BASIC_ABILITIES.instinct },
      2: { id: 'cat_form', name: 'Cat Form', type: 'active', description: 'Transform into a cat for increased speed and stealth.' },
      3: { id: 'natural_instincts', name: 'Natural Instincts', type: 'passive', description: 'Increase dodge chance in animal forms.' },
      4: { id: 'bear_form', name: 'Bear Form', type: 'active', description: 'Transform into a bear for increased toughness.' },
      5: { id: 'seamless_shifting', name: 'Seamless Shifting', type: 'passive', description: 'Shapeshift without using a turn.' },
      6: { id: 'apex_form', name: 'Apex Form', type: 'active', description: 'Transform into a legendary beast with all stats greatly increased.' }
    }
  }
};

// ============================================================
// EXPORTS
// ============================================================

const skillTrees = {
  warrior: warriorSkillTree,
  paladin: paladinSkillTree,
  hunter: hunterSkillTree,
  rogue: rogueSkillTree,
  mage: mageSkillTree,
  priest: priestSkillTree,
  bard: bardSkillTree,
  druid: druidSkillTree
};

/**
 * Get skill tree for a specific calling
 * @param {string} calling - The calling ID
 * @returns {Object} The skill tree for that calling
 */
const getSkillTree = (calling) => {
  return skillTrees[calling] || null;
};

/**
 * Get a specific ability from a calling's skill tree
 * @param {string} calling - The calling ID
 * @param {string} branch - The stat branch (power, toughness, etc.)
 * @param {number} stage - The stage number (1-6)
 * @returns {Object} The ability data
 */
const getAbility = (calling, branch, stage) => {
  const tree = skillTrees[calling];
  if (!tree || !tree[branch] || !tree[branch].stages[stage]) {
    return null;
  }
  return tree[branch].stages[stage];
};

/**
 * Get the SP cost for a specific stage
 * @param {number} stage - The stage number (1-6)
 * @returns {number} The SP cost
 */
const getStageCost = (stage) => {
  return STAGE_COSTS[stage] || 0;
};

/**
 * Calculate total SP needed to reach a stage in a branch
 * @param {number} targetStage - The target stage (1-6)
 * @returns {number} Total SP needed
 */
const getTotalCostToStage = (targetStage) => {
  let total = 0;
  for (let stage = 2; stage <= targetStage; stage++) {
    total += STAGE_COSTS[stage];
  }
  return total;
};

module.exports = {
  skillTrees,
  STAGE_COSTS,
  BASIC_ABILITIES,
  getSkillTree,
  getAbility,
  getStageCost,
  getTotalCostToStage
};
