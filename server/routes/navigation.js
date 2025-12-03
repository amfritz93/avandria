const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getLocation,
  moveHero,
  getHeroMap,
  clearLocation
} = require('../controllers/navigationController');

// All navigation routes require authentication
router.use(protect);

// Get location details with connections
// GET /api/navigation/location/:locationId?heroId=xxx
router.get('/location/:locationId', getLocation);

// Move hero to a new location
// POST /api/navigation/move
// Body: { heroId, destinationId }
router.post('/move', moveHero);

// Get hero's discovered map data
// GET /api/navigation/map/:heroId
router.get('/map/:heroId', getHeroMap);

// Mark current location as cleared
// POST /api/navigation/clear
// Body: { heroId }
router.post('/clear', clearLocation);

module.exports = router;
