import api from './api';

/**
 * Hero Service
 * Handles all hero-related API calls
 */

/**
 * Create a new hero
 * @param {Object} heroData - Hero creation data
 * @param {string} heroData.heroName - Name for the hero (2-20 chars)
 * @param {string} heroData.species - Species ID (one of 12 species)
 * @param {string} heroData.calling - Calling ID (one of 8 callings)
 * @param {string} heroData.genderIdentity - Gender (male/female/non-binary/other)
 * @returns {Promise<Object>} Created hero with species/calling info
 */
export const createHero = async (heroData) => {
  const response = await api.post('/heroes', heroData);
  return response.data;
};

/**
 * Get all heroes for the authenticated account
 * @returns {Promise<Object>} List of heroes with basic info
 */
export const getHeroes = async () => {
  const response = await api.get('/heroes');
  return response.data;
};

/**
 * Get a single hero by ID (full details)
 * @param {string} heroId - MongoDB ObjectId of the hero
 * @returns {Promise<Object>} Complete hero data with equipment and context
 */
export const getHero = async (heroId) => {
  const response = await api.get(`/heroes/${heroId}`);
  return response.data;
};

/**
 * Get hero calculated statistics
 * @param {string} heroId - MongoDB ObjectId of the hero
 * @returns {Promise<Object>} Calculated stats including effective values
 */
export const getHeroStats = async (heroId) => {
  const response = await api.get(`/heroes/${heroId}/stats`);
  return response.data;
};

/**
 * Update hero game state (save)
 * @param {string} heroId - MongoDB ObjectId of the hero
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated hero data
 */
export const updateHero = async (heroId, updates) => {
  const response = await api.put(`/heroes/${heroId}`, updates);
  return response.data;
};

/**
 * Delete a hero permanently
 * @param {string} heroId - MongoDB ObjectId of the hero
 * @returns {Promise<Object>} Deletion confirmation
 */
export const deleteHero = async (heroId) => {
  const response = await api.delete(`/heroes/${heroId}`);
  return response.data;
};

export default {
  createHero,
  getHeroes,
  getHero,
  getHeroStats,
  updateHero,
  deleteHero
};
