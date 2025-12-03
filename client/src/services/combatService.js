import api from './api';

/**
 * Combat Service
 * Handles all combat-related API calls
 */

/**
 * Start combat at current location
 * @param {string} heroId - Hero's MongoDB ObjectId
 * @returns {Promise<Object>} Combat initiation result with monster data
 */
export const startCombat = async (heroId) => {
  const response = await api.post('/combat/start', { heroId });
  return response.data;
};

/**
 * Execute hero attack action
 * @param {string} heroId - Hero's MongoDB ObjectId
 * @param {string} abilityId - Optional ability ID for special attacks
 * @returns {Promise<Object>} Attack result with combat log
 */
export const heroAttack = async (heroId, abilityId = null) => {
  const body = { heroId };
  if (abilityId) {
    body.abilityId = abilityId;
  }
  const response = await api.post('/combat/attack', body);
  return response.data;
};

/**
 * Attempt to flee from combat
 * @param {string} heroId - Hero's MongoDB ObjectId
 * @returns {Promise<Object>} Flee result
 */
export const fleeCombat = async (heroId) => {
  const response = await api.post('/combat/flee', { heroId });
  return response.data;
};

/**
 * Get current combat status
 * @param {string} heroId - Hero's MongoDB ObjectId
 * @returns {Promise<Object>} Combat status
 */
export const getCombatStatus = async (heroId) => {
  const response = await api.get(`/combat/status/${heroId}`);
  return response.data;
};

export default {
  startCombat,
  heroAttack,
  fleeCombat,
  getCombatStatus
};
