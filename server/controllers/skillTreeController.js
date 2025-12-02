const Hero = require('../models/Hero');
const { skillTrees, getSkillTree, getAbility, getStageCost } = require('../data/skillTrees');
const { callings } = require('../data/callings');

/**
 * @desc    Get skill tree data for a calling
 * @route   GET /api/skills/tree/:calling
 * @access  Public
 *
 * Returns the complete skill tree structure for a calling,
 * including all paths, stages, and ability information.
 */
const getCallingSkillTree = async (req, res, next) => {
  try {
    const { calling } = req.params;

    // Validate calling exists
    if (!callings[calling]) {
      return res.status(400).json({
        success: false,
        message: `Invalid calling: ${calling}. Valid options: ${Object.keys(callings).join(', ')}`
      });
    }

    const tree = getSkillTree(calling);
    const callingData = callings[calling];

    if (!tree) {
      return res.status(404).json({
        success: false,
        message: 'Skill tree not found for this calling'
      });
    }

    res.json({
      success: true,
      data: {
        calling: calling,
        callingName: callingData.name,
        callingDescription: callingData.description,
        skillTree: tree,
        spCosts: {
          stage2: 1,
          stage3: 2,
          stage4: 3,
          stage5: 4,
          stage6: 5,
          totalToMaxBranch: 15,
          totalToStage4: 6
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a hero's current skill tree progress
 * @route   GET /api/skills/hero/:heroId
 * @access  Private
 *
 * Returns the hero's skill tree state including:
 * - Current stage in each branch
 * - Unlocked abilities
 * - Available skill points
 * - What can be unlocked next
 */
const getHeroSkillProgress = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const accountId = req.user.id;

    const hero = await Hero.findById(heroId);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
    }

    // Verify hero belongs to the authenticated account
    if (hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this hero'
      });
    }

    const tree = getSkillTree(hero.calling);
    const callingData = callings[hero.calling];

    // Build progress summary for each branch
    const branches = ['power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct'];
    const progress = {};

    branches.forEach(branch => {
      const branchData = hero.skillTree[branch];
      const treeData = tree[branch];
      const currentStage = branchData.stage;
      const nextStage = currentStage < 6 ? currentStage + 1 : null;
      const nextCost = nextStage ? getStageCost(nextStage) : null;
      const canUnlock = nextStage && hero.skillPoints >= nextCost;

      progress[branch] = {
        pathName: treeData.pathName,
        pathDescription: treeData.description,
        currentStage,
        unlockedAbilities: branchData.abilities,
        nextStage,
        nextAbility: nextStage ? treeData.stages[nextStage] : null,
        nextCost,
        canUnlock,
        isMaxed: currentStage >= 6
      };
    });

    res.json({
      success: true,
      data: {
        heroId: hero._id,
        heroName: hero.heroName,
        calling: hero.calling,
        callingName: callingData.name,
        level: hero.level,
        skillPoints: hero.skillPoints,
        progress
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Spend skill points to unlock abilities
 * @route   POST /api/skills/hero/:heroId/spend
 * @access  Private
 *
 * Request Body:
 * - branch: string (power, toughness, brilliance, spirit, acuity, instinct)
 *
 * This will unlock the next stage in the specified branch
 * if the hero has enough skill points.
 */
const spendSkillPoint = async (req, res, next) => {
  try {
    const { heroId } = req.params;
    const { branch } = req.body;
    const accountId = req.user.id;

    // Validate branch
    const validBranches = ['power', 'toughness', 'brilliance', 'spirit', 'acuity', 'instinct'];
    if (!validBranches.includes(branch)) {
      return res.status(400).json({
        success: false,
        message: `Invalid branch: ${branch}. Valid options: ${validBranches.join(', ')}`
      });
    }

    const hero = await Hero.findById(heroId);

    if (!hero) {
      return res.status(404).json({
        success: false,
        message: 'Hero not found'
      });
    }

    // Verify hero belongs to the authenticated account
    if (hero.account.toString() !== accountId) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this hero'
      });
    }

    const tree = getSkillTree(hero.calling);
    const branchData = hero.skillTree[branch];
    const currentStage = branchData.stage;

    // Check if already maxed
    if (currentStage >= 6) {
      return res.status(400).json({
        success: false,
        message: `${tree[branch].pathName} is already at maximum stage (6)`
      });
    }

    const nextStage = currentStage + 1;
    const cost = getStageCost(nextStage);

    // Check if hero has enough SP
    if (hero.skillPoints < cost) {
      return res.status(400).json({
        success: false,
        message: `Not enough skill points. Need ${cost} SP, have ${hero.skillPoints} SP`
      });
    }

    // Get the ability being unlocked
    const newAbility = tree[branch].stages[nextStage];

    // Deduct skill points
    hero.skillPoints -= cost;

    // Update skill tree
    hero.skillTree[branch].stage = nextStage;
    hero.skillTree[branch].abilities.push(newAbility.id);

    // If it's a passive ability, apply stat bonuses (if any)
    // Note: This is a placeholder for future passive implementation
    if (newAbility.type === 'passive') {
      // Future: Apply passive bonuses to hero.stats.skillTreeBonuses
      // For now, passives are tracked but don't modify stats yet
    }

    await hero.save();

    res.json({
      success: true,
      message: `Unlocked ${newAbility.name} in ${tree[branch].pathName}!`,
      data: {
        heroId: hero._id,
        branch,
        pathName: tree[branch].pathName,
        newStage: nextStage,
        unlockedAbility: newAbility,
        remainingSkillPoints: hero.skillPoints,
        branchProgress: {
          stage: nextStage,
          abilities: hero.skillTree[branch].abilities,
          isMaxed: nextStage >= 6
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all skill trees (for reference/documentation)
 * @route   GET /api/skills/trees
 * @access  Public
 *
 * Returns skill trees for all callings.
 * Useful for displaying all options during character creation.
 */
const getAllSkillTrees = async (req, res, next) => {
  try {
    const trees = {};

    Object.keys(callings).forEach(callingId => {
      const callingData = callings[callingId];
      trees[callingId] = {
        callingName: callingData.name,
        callingDescription: callingData.description,
        skillTree: skillTrees[callingId]
      };
    });

    res.json({
      success: true,
      count: Object.keys(trees).length,
      data: trees
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCallingSkillTree,
  getHeroSkillProgress,
  spendSkillPoint,
  getAllSkillTrees
};
