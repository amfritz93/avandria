import api from './api';

/**
 * Skill Tree Service
 * Handles all skill tree related API calls
 */

/**
 * Get all skill trees for all callings
 * @returns {Promise<Object>} All skill trees indexed by calling
 */
export const getAllSkillTrees = async () => {
  const response = await api.get('/skills/trees');
  return response.data;
};

/**
 * Get skill tree for a specific calling
 * @param {string} calling - Calling ID (warrior, mage, etc.)
 * @returns {Promise<Object>} Complete skill tree for the calling
 */
export const getCallingSkillTree = async (calling) => {
  const response = await api.get(`/skills/tree/${calling}`);
  return response.data;
};

/**
 * Get a hero's skill tree progress
 * @param {string} heroId - MongoDB ObjectId of the hero
 * @returns {Promise<Object>} Hero's skill progress in all branches
 */
export const getHeroSkillProgress = async (heroId) => {
  const response = await api.get(`/skills/hero/${heroId}`);
  return response.data;
};

/**
 * Spend skill points to unlock an ability
 * @param {string} heroId - MongoDB ObjectId of the hero
 * @param {string} branch - Branch to upgrade (power, toughness, etc.)
 * @returns {Promise<Object>} Unlock result with new ability info
 */
export const spendSkillPoint = async (heroId, branch) => {
  const response = await api.post(`/skills/hero/${heroId}/spend`, { branch });
  return response.data;
};

// SP cost constants (matching server)
export const STAGE_COSTS = {
  1: 0,  // Free at character creation
  2: 1,  // Entry-level upgrade
  3: 2,  // First passive buff
  4: 3,  // Improved basic ability
  5: 4,  // Mastery passive
  6: 5   // Ultimate ability
};

/**
 * Calculate total SP needed to reach a stage
 * @param {number} targetStage - Target stage (1-6)
 * @returns {number} Total SP needed
 */
export const getTotalCostToStage = (targetStage) => {
  let total = 0;
  for (let stage = 2; stage <= targetStage; stage++) {
    total += STAGE_COSTS[stage];
  }
  return total;
};

/**
 * Calculate SP needed to max a single branch (stages 2-6)
 * @returns {number} SP to max one branch (15)
 */
export const getCostToMaxBranch = () => {
  return getTotalCostToStage(6); // 1 + 2 + 3 + 4 + 5 = 15
};

/**
 * Get branch stat info
 */
export const BRANCH_INFO = {
  power: {
    name: 'Power',
    description: 'Physical offense and raw damage',
    resource: 'stamina',
    basicAbility: 'Strike'
  },
  toughness: {
    name: 'Toughness',
    description: 'Physical defense and endurance',
    resource: 'stamina',
    basicAbility: 'Guard'
  },
  brilliance: {
    name: 'Brilliance',
    description: 'Magical offense and spellcasting',
    resource: 'mana',
    basicAbility: 'Spark'
  },
  spirit: {
    name: 'Spirit',
    description: 'Magical defense and restoration',
    resource: 'mana',
    basicAbility: 'Fortify'
  },
  acuity: {
    name: 'Acuity',
    description: 'Precision and critical strikes',
    resource: 'stamina',
    basicAbility: 'Focus'
  },
  instinct: {
    name: 'Instinct',
    description: 'Evasion and reaction speed',
    resource: 'stamina',
    basicAbility: 'Evade'
  }
};

export default {
  getAllSkillTrees,
  getCallingSkillTree,
  getHeroSkillProgress,
  spendSkillPoint,
  STAGE_COSTS,
  getTotalCostToStage,
  getCostToMaxBranch,
  BRANCH_INFO
};
