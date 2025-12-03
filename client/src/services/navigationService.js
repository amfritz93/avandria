import api from './api';

/**
 * Navigation Service
 * Handles all navigation-related API calls for the game board
 */

/**
 * Get location details with connections
 * @param {string} locationId - Location identifier
 * @param {string} heroId - Optional hero ID for context (cleared/discovered status)
 * @returns {Promise<Object>} Location data with connections and state
 */
export const getLocation = async (locationId, heroId = null) => {
  const params = heroId ? { heroId } : {};
  const response = await api.get(`/navigation/location/${locationId}`, { params });
  return response.data;
};

/**
 * Move hero to a new location
 * @param {string} heroId - Hero's MongoDB ObjectId
 * @param {string} destinationId - Target location ID
 * @returns {Promise<Object>} Movement result with new location data
 */
export const moveHero = async (heroId, destinationId) => {
  const response = await api.post('/navigation/move', { heroId, destinationId });
  return response.data;
};

/**
 * Get hero's discovered map data
 * @param {string} heroId - Hero's MongoDB ObjectId
 * @returns {Promise<Object>} Map data with discovered locations
 */
export const getHeroMap = async (heroId) => {
  const response = await api.get(`/navigation/map/${heroId}`);
  return response.data;
};

/**
 * Mark current location as cleared (after defeating monsters)
 * @param {string} heroId - Hero's MongoDB ObjectId
 * @returns {Promise<Object>} Clear result with revealed paths
 */
export const clearLocation = async (heroId) => {
  const response = await api.post('/navigation/clear', { heroId });
  return response.data;
};

export default {
  getLocation,
  moveHero,
  getHeroMap,
  clearLocation
};
