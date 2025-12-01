import api from './api';

/**
 * Game Data Service
 * Handles fetching static game data (species, callings, items)
 * This data is used for character creation and game UI
 */

// ============================================================
// Species
// ============================================================

/**
 * Get all playable species
 * @returns {Promise<Object>} Array of species with stats and descriptions
 */
export const getSpecies = async () => {
  const response = await api.get('/game/species');
  return response.data;
};

/**
 * Get a single species by ID
 * @param {string} speciesId - Species identifier (e.g., 'human', 'elf')
 * @returns {Promise<Object>} Species data with stats and description
 */
export const getSpeciesById = async (speciesId) => {
  const response = await api.get(`/game/species/${speciesId}`);
  return response.data;
};

// ============================================================
// Callings
// ============================================================

/**
 * Get all playable callings
 * @returns {Promise<Object>} Array of callings with modifiers and paths
 */
export const getCallings = async () => {
  const response = await api.get('/game/callings');
  return response.data;
};

/**
 * Get a single calling by ID
 * @param {string} callingId - Calling identifier (e.g., 'warrior', 'mage')
 * @returns {Promise<Object>} Calling data with modifiers and skill tree paths
 */
export const getCallingById = async (callingId) => {
  const response = await api.get(`/game/callings/${callingId}`);
  return response.data;
};

// ============================================================
// Items
// ============================================================

/**
 * Get items with optional filtering
 * @param {Object} filters - Optional filters
 * @param {string} filters.type - Item type (weapon/armor/consumable/junk)
 * @param {string} filters.rarity - Item rarity (worn/common/uncommon/rare/epic)
 * @param {boolean} filters.starter - Only starter items
 * @returns {Promise<Object>} Array of items matching filters
 */
export const getItems = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.type) params.append('type', filters.type);
  if (filters.rarity) params.append('rarity', filters.rarity);
  if (filters.starter) params.append('starter', 'true');

  const response = await api.get(`/game/items?${params.toString()}`);
  return response.data;
};

/**
 * Get a single item by ID
 * @param {string} itemId - Item identifier (e.g., 'WEAPON_SWORD_WORN')
 * @returns {Promise<Object>} Item data with stats and description
 */
export const getItemById = async (itemId) => {
  const response = await api.get(`/game/items/${itemId}`);
  return response.data;
};

/**
 * Get starter equipment for a specific calling
 * @param {string} calling - Calling ID (e.g., 'warrior', 'mage')
 * @returns {Promise<Object>} Starter equipment IDs and details
 */
export const getStarterEquipment = async (calling) => {
  const response = await api.get(`/game/starter-equipment/${calling}`);
  return response.data;
};

// ============================================================
// Utility Functions
// ============================================================

/**
 * Fetch all game data needed for character creation
 * Makes parallel requests for efficiency
 * @returns {Promise<Object>} Combined species and callings data
 */
export const getCharacterCreationData = async () => {
  const [speciesResponse, callingsResponse] = await Promise.all([
    getSpecies(),
    getCallings()
  ]);

  return {
    species: speciesResponse.data,
    callings: callingsResponse.data
  };
};

/**
 * Calculate combined starting stats for a species + calling combo
 * @param {Object} speciesData - Species object with base stats
 * @param {Object} callingData - Calling object with stat modifiers
 * @returns {Object} Combined effective stats
 */
export const calculateStartingStats = (speciesData, callingData) => {
  if (!speciesData || !callingData) return null;

  const stats = ['power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct'];
  const combined = {};

  stats.forEach(stat => {
    combined[stat] =
      (speciesData.stats[stat] || 0) +
      (callingData.statModifiers[stat] || 0);
  });

  return combined;
};

/**
 * Calculate starting resources for a species + calling combo
 * @param {Object} speciesData - Species object with starting resources
 * @param {Object} callingData - Calling object with starting resources
 * @returns {Object} Combined gold and rations
 */
export const calculateStartingResources = (speciesData, callingData) => {
  if (!speciesData || !callingData) return { gold: 0, rations: 0 };

  return {
    gold:
      (speciesData.startingResources?.gold || 0) +
      (callingData.startingResources?.gold || 0),
    rations:
      (speciesData.startingResources?.rations || 0) +
      (callingData.startingResources?.rations || 0)
  };
};

/**
 * Calculate max HP from toughness stat
 * Formula: 10 + (Toughness × 3)
 * @param {number} toughness - Effective toughness value
 * @returns {number} Maximum HP
 */
export const calculateMaxHP = (toughness) => {
  return 10 + (toughness * 3);
};

/**
 * Calculate max MP from spirit stat
 * Formula: 10 + (Spirit × 3)
 * @param {number} spirit - Effective spirit value
 * @returns {number} Maximum MP
 */
export const calculateMaxMP = (spirit) => {
  return 10 + (spirit * 3);
};

export default {
  getSpecies,
  getSpeciesById,
  getCallings,
  getCallingById,
  getItems,
  getItemById,
  getStarterEquipment,
  getCharacterCreationData,
  calculateStartingStats,
  calculateStartingResources,
  calculateMaxHP,
  calculateMaxMP
};
