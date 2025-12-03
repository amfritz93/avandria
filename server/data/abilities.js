/**
 * Abilities Data
 * Default abilities from skill tree branches
 *
 * Each hero starts with 6 basic abilities (one per stat branch)
 */

const abilities = {
  // Power Branch - Physical damage
  strike: {
    id: 'strike',
    name: 'Strike',
    description: 'A powerful melee attack that deals physical damage.',
    branch: 'power',
    statUsed: 'power',
    damageType: 'slashing',
    staminaCost: 10,
    mpCost: 0,
    effect: 'damage',
    damageMultiplier: 1.2,
    hitModifier: 0
  },

  // Toughness Branch - Defensive
  guard: {
    id: 'guard',
    name: 'Guard',
    description: 'Take a defensive stance, reducing incoming damage this round.',
    branch: 'toughness',
    statUsed: 'toughness',
    damageType: null,
    staminaCost: 5,
    mpCost: 0,
    effect: 'defend',
    damageReduction: 0.5, // Take 50% less damage
    hitModifier: 0
  },

  // Brilliance Branch - Magic damage
  spark: {
    id: 'spark',
    name: 'Spark',
    description: 'Channel arcane energy to deal magic damage.',
    branch: 'brilliance',
    statUsed: 'brilliance',
    damageType: 'arcane',
    staminaCost: 0,
    mpCost: 8,
    effect: 'damage',
    damageMultiplier: 1.3,
    hitModifier: 5 // Magic is more accurate
  },

  // Spirit Branch - Buff/Heal
  fortify: {
    id: 'fortify',
    name: 'Fortify',
    description: 'Bolster your resolve, restoring some HP.',
    branch: 'spirit',
    statUsed: 'spirit',
    damageType: null,
    staminaCost: 0,
    mpCost: 10,
    effect: 'heal',
    healMultiplier: 0.5, // Heal 50% of Spirit stat
    hitModifier: 0
  },

  // Acuity Branch - Precision attack
  focus: {
    id: 'focus',
    name: 'Focus',
    description: 'A precise strike with increased accuracy and critical chance.',
    branch: 'acuity',
    statUsed: 'acuity',
    damageType: 'piercing',
    staminaCost: 15,
    mpCost: 0,
    effect: 'damage',
    damageMultiplier: 1.0,
    hitModifier: 20,
    critModifier: 15
  },

  // Instinct Branch - Evasive action
  evade: {
    id: 'evade',
    name: 'Evade',
    description: 'Dodge and counter, avoiding the next attack and striking back.',
    branch: 'instinct',
    statUsed: 'instinct',
    damageType: 'slashing',
    staminaCost: 12,
    mpCost: 0,
    effect: 'counter',
    damageMultiplier: 0.8,
    dodgeChance: 80 // High chance to dodge monster's attack
  }
};

/**
 * Get ability by ID
 */
const getAbility = (abilityId) => {
  return abilities[abilityId] || null;
};

/**
 * Get all abilities for a hero's skill tree
 */
const getHeroAbilities = (skillTree) => {
  const heroAbilities = [];

  for (const [branch, data] of Object.entries(skillTree)) {
    if (data.abilities && data.abilities.length > 0) {
      data.abilities.forEach(abilityId => {
        const ability = abilities[abilityId];
        if (ability) {
          heroAbilities.push(ability);
        }
      });
    }
  }

  return heroAbilities;
};

module.exports = {
  abilities,
  getAbility,
  getHeroAbilities
};
