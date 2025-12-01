const express = require('express');
const router = express.Router();

// Import game data
const { species, speciesArray } = require('../data/species');
const { callings, callingsArray } = require('../data/callings');
const { items, getStarterEquipment } = require('../data/items');

/**
 * @route   GET /api/game/species
 * @desc    Get all playable species
 * @access  Public
 */
router.get('/species', (req, res) => {
  res.json({
    success: true,
    count: speciesArray.length,
    data: speciesArray
  });
});

/**
 * @route   GET /api/game/species/:id
 * @desc    Get a single species by ID
 * @access  Public
 */
router.get('/species/:id', (req, res) => {
  const speciesData = species[req.params.id];

  if (!speciesData) {
    return res.status(404).json({
      success: false,
      message: 'Species not found'
    });
  }

  res.json({
    success: true,
    data: speciesData
  });
});

/**
 * @route   GET /api/game/callings
 * @desc    Get all playable callings
 * @access  Public
 */
router.get('/callings', (req, res) => {
  res.json({
    success: true,
    count: callingsArray.length,
    data: callingsArray
  });
});

/**
 * @route   GET /api/game/callings/:id
 * @desc    Get a single calling by ID
 * @access  Public
 */
router.get('/callings/:id', (req, res) => {
  const callingData = callings[req.params.id];

  if (!callingData) {
    return res.status(404).json({
      success: false,
      message: 'Calling not found'
    });
  }

  res.json({
    success: true,
    data: callingData
  });
});

/**
 * @route   GET /api/game/starter-equipment/:calling
 * @desc    Get starter equipment for a calling
 * @access  Public
 */
router.get('/starter-equipment/:calling', (req, res) => {
  const calling = req.params.calling.toLowerCase();
  const validCallings = ['warrior', 'paladin', 'hunter', 'rogue', 'mage', 'priest', 'bard', 'druid'];

  if (!validCallings.includes(calling)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid calling'
    });
  }

  const equipment = getStarterEquipment(calling);

  // Get full item details for each equipment piece
  const equipmentDetails = {};
  for (const [slot, itemId] of Object.entries(equipment)) {
    equipmentDetails[slot] = items[itemId] || null;
  }

  res.json({
    success: true,
    data: {
      calling,
      equipmentIds: equipment,
      equipmentDetails
    }
  });
});

/**
 * @route   GET /api/game/items
 * @desc    Get all items (or filter by type)
 * @access  Public
 */
router.get('/items', (req, res) => {
  let itemsData = Object.values(items);

  // Filter by type if provided
  if (req.query.type) {
    itemsData = itemsData.filter(item => item.itemType === req.query.type);
  }

  // Filter by rarity if provided
  if (req.query.rarity) {
    itemsData = itemsData.filter(item => item.rarity === req.query.rarity);
  }

  // Filter by starter items only
  if (req.query.starter === 'true') {
    itemsData = itemsData.filter(item => item.isStarterItem);
  }

  res.json({
    success: true,
    count: itemsData.length,
    data: itemsData
  });
});

/**
 * @route   GET /api/game/items/:itemId
 * @desc    Get a single item by ID
 * @access  Public
 */
router.get('/items/:itemId', (req, res) => {
  const item = items[req.params.itemId];

  if (!item) {
    return res.status(404).json({
      success: false,
      message: 'Item not found'
    });
  }

  res.json({
    success: true,
    data: item
  });
});

module.exports = router;
