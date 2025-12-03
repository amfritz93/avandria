/**
 * Abilities Data
 * Default abilities from skill tree branches
 *
 * All 6 Basic Abilities (Stage 1) are FREE - they cost 0 resources and are always available.
 * Per design document: "All Callings have access to these 6 Basic Abilities at character creation.
 * They cost 0 resources and are always available."
 */

const abilities = {
  // Power Branch - Basic physical attack
  strike: {
    id: 'strike',
    name: 'Strike',
    description: 'Basic physical attack (Power vs Toughness).',
    branch: 'power',
    statUsed: 'power',
    targetStat: 'toughness',
    damageType: 'physical',
    staminaCost: 0,
    mpCost: 0,
    effect: 'damage',
    damageMultiplier: 1.0,
    hitModifier: 0
  },

  // Toughness Branch - Basic defensive action
  guard: {
    id: 'guard',
    name: 'Guard',
    description: 'Reduce incoming damage by 25% this turn.',
    branch: 'toughness',
    statUsed: 'toughness',
    targetStat: null,
    damageType: null,
    staminaCost: 0,
    mpCost: 0,
    effect: 'defend',
    damageReduction: 0.25,
    duration: 1 // This turn only
  },

  // Brilliance Branch - Basic magical attack
  spark: {
    id: 'spark',
    name: 'Spark',
    description: 'Basic magical attack (Brilliance vs Spirit).',
    branch: 'brilliance',
    statUsed: 'brilliance',
    targetStat: 'spirit',
    damageType: 'arcane',
    staminaCost: 0,
    mpCost: 0,
    effect: 'damage',
    damageMultiplier: 1.0,
    hitModifier: 0
  },

  // Spirit Branch - Debuff cleanse
  fortify: {
    id: 'fortify',
    name: 'Fortify',
    description: 'Remove one debuff from yourself.',
    branch: 'spirit',
    statUsed: 'spirit',
    targetStat: null,
    damageType: null,
    staminaCost: 0,
    mpCost: 0,
    effect: 'cleanse',
    cleansesDebuffs: 1
  },

  // Acuity Branch - Precision buff
  focus: {
    id: 'focus',
    name: 'Focus',
    description: 'Your next attack has +15% Critical Hit Chance.',
    branch: 'acuity',
    statUsed: 'acuity',
    targetStat: null,
    damageType: null,
    staminaCost: 0,
    mpCost: 0,
    effect: 'buff',
    buffType: 'critBonus',
    critBonus: 15,
    duration: 1 // Next attack
  },

  // Instinct Branch - Evasion buff
  evade: {
    id: 'evade',
    name: 'Evade',
    description: '+25% chance to dodge the next attack against you.',
    branch: 'instinct',
    statUsed: 'instinct',
    targetStat: null,
    damageType: null,
    staminaCost: 0,
    mpCost: 0,
    effect: 'buff',
    buffType: 'dodgeBonus',
    dodgeBonus: 25,
    duration: 1 // Next incoming attack
  }
};

/**
 * Get ability by ID
 */
const getAbility = (abilityId) => {
  return abilities[abilityId] || null;
};

/**
 * Get all default abilities (Stage 1 - Free abilities)
 */
const getDefaultAbilities = () => {
  return Object.values(abilities);
};

/**
 * Get all abilities for a hero's skill tree
 * For now, returns all Stage 1 abilities since skill tree upgrades aren't implemented yet
 */
const getHeroAbilities = (skillTree) => {
  // For Stage 1, all heroes have access to all 6 basic abilities
  // Future: Check skill tree for unlocked Stage 2, 4, 6 abilities
  return getDefaultAbilities();
};

module.exports = {
  abilities,
  getAbility,
  getDefaultAbilities,
  getHeroAbilities
};
