const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  startCombat,
  heroAttack,
  fleeCombat,
  getCombatStatus
} = require('../controllers/combatController');

// All combat routes require authentication
router.use(protect);

// Start combat at current location
// POST /api/combat/start
// Body: { heroId }
router.post('/start', startCombat);

// Hero attack action
// POST /api/combat/attack
// Body: { heroId, abilityId? }
router.post('/attack', heroAttack);

// Attempt to flee from combat
// POST /api/combat/flee
// Body: { heroId }
router.post('/flee', fleeCombat);

// Get current combat status
// GET /api/combat/status/:heroId
router.get('/status/:heroId', getCombatStatus);

module.exports = router;
