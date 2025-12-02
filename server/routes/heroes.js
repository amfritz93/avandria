const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');

// Import controller methods
const {
  createHero,
  getHeroes,
  getHero,
  updateHero,
  deleteHero,
  getHeroStats
} = require('../controllers/heroController');

// Import auth middleware
const { protect } = require('../middleware/auth');

// Validation middleware helper
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// ============================================================
// All routes require authentication
// ============================================================
router.use(protect);

/**
 * @route   POST /api/heroes
 * @desc    Create a new hero
 * @access  Private
 */
router.post(
  '/',
  [
    body('heroName')
      .trim()
      .notEmpty()
      .withMessage('Hero name is required')
      .isLength({ min: 2, max: 20 })
      .withMessage('Hero name must be between 2 and 20 characters')
      .matches(/^[a-zA-Z0-9\s'-]+$/)
      .withMessage('Hero name can only contain letters, numbers, spaces, hyphens, and apostrophes'),

    body('species')
      .trim()
      .notEmpty()
      .withMessage('Species is required')
      .isIn(['human', 'elf', 'dwarf', 'gnome', 'orc', 'goliath', 'tiefling', 'goblin', 'aarakocra', 'vulpine', 'sylvan', 'sprite'])
      .withMessage('Invalid species selected'),

    body('calling')
      .trim()
      .notEmpty()
      .withMessage('Calling is required')
      .isIn(['warrior', 'paladin', 'hunter', 'rogue', 'mage', 'priest', 'bard', 'druid'])
      .withMessage('Invalid calling selected'),

    body('genderIdentity')
      .trim()
      .notEmpty()
      .withMessage('Gender identity is required')
      .isIn(['male', 'female', 'non-binary', 'other'])
      .withMessage('Invalid gender identity selected')
  ],
  validate,
  createHero
);

/**
 * @route   GET /api/heroes
 * @desc    Get all heroes for the authenticated account
 * @access  Private
 */
router.get('/', getHeroes);

/**
 * @route   GET /api/heroes/:id
 * @desc    Get a single hero by ID
 * @access  Private
 */
router.get(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid hero ID format')
  ],
  validate,
  getHero
);

/**
 * @route   GET /api/heroes/:id/stats
 * @desc    Get calculated hero statistics
 * @access  Private
 */
router.get(
  '/:id/stats',
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid hero ID format')
  ],
  validate,
  getHeroStats
);

/**
 * @route   PUT /api/heroes/:id
 * @desc    Update a hero (save game state)
 * @access  Private
 */
router.put(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid hero ID format'),

    // Optional fields with validation
    body('currentHP')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Current HP must be a non-negative integer'),

    body('currentMP')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Current MP must be a non-negative integer'),

    body('currentRations')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Current rations must be a non-negative integer'),

    body('gold')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Gold must be a non-negative integer'),

    body('currentXP')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Current XP must be a non-negative integer'),

    body('totalPlaytime')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Total playtime must be a non-negative integer (seconds)')
  ],
  validate,
  updateHero
);

/**
 * @route   DELETE /api/heroes/:id
 * @desc    Delete a hero
 * @access  Private
 */
router.delete(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid hero ID format')
  ],
  validate,
  deleteHero
);

module.exports = router;
