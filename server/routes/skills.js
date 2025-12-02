const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');

// Import controller methods
const {
  getCallingSkillTree,
  getHeroSkillProgress,
  spendSkillPoint,
  getAllSkillTrees
} = require('../controllers/skillTreeController');

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
// Public Routes (no authentication required)
// ============================================================

/**
 * @route   GET /api/skills/trees
 * @desc    Get all skill trees for all callings
 * @access  Public
 */
router.get('/trees', getAllSkillTrees);

/**
 * @route   GET /api/skills/tree/:calling
 * @desc    Get skill tree for a specific calling
 * @access  Public
 */
router.get(
  '/tree/:calling',
  [
    param('calling')
      .trim()
      .isIn(['warrior', 'paladin', 'hunter', 'rogue', 'mage', 'priest', 'bard', 'druid'])
      .withMessage('Invalid calling')
  ],
  validate,
  getCallingSkillTree
);

// ============================================================
// Protected Routes (authentication required)
// ============================================================

/**
 * @route   GET /api/skills/hero/:heroId
 * @desc    Get a hero's skill tree progress
 * @access  Private
 */
router.get(
  '/hero/:heroId',
  protect,
  [
    param('heroId')
      .isMongoId()
      .withMessage('Invalid hero ID format')
  ],
  validate,
  getHeroSkillProgress
);

/**
 * @route   POST /api/skills/hero/:heroId/spend
 * @desc    Spend skill points to unlock an ability
 * @access  Private
 */
router.post(
  '/hero/:heroId/spend',
  protect,
  [
    param('heroId')
      .isMongoId()
      .withMessage('Invalid hero ID format'),

    body('branch')
      .trim()
      .notEmpty()
      .withMessage('Branch is required')
      .isIn(['power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct'])
      .withMessage('Invalid branch. Must be one of: power, toughness, brilliance, spirit, acuity, instinct')
  ],
  validate,
  spendSkillPoint
);

module.exports = router;
