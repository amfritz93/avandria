const { validationResult } = require('express-validator');
const Account = require('../models/Account');

/**
 * @desc    Register a new account
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { username, email, password } = req.body;

    // Check if account already exists
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists'
      });
    }

    // Create account
    const account = await Account.create({
      username,
      email,
      password
    });

    // Generate token
    const token = account.generateAuthToken();

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      account: account.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login to account
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find account and include password for comparison
    const account = await Account.findOne({ email }).select('+password');

    if (!account) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isMatch = await account.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = account.generateAuthToken();

    res.json({
      success: true,
      message: 'Login successful',
      token,
      account: account.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged in account
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = async (req, res, next) => {
  try {
    // req.account is set by the protect middleware
    const account = await Account.findById(req.account.id).populate('heroes');

    res.json({
      success: true,
      account: account.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update account settings
 * @route   PUT /api/auth/settings
 * @access  Private
 */
const updateSettings = async (req, res, next) => {
  try {
    const { theme } = req.body;

    // Validate theme
    if (theme && !['light', 'dark'].includes(theme)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid theme. Must be "light" or "dark"'
      });
    }

    const account = await Account.findByIdAndUpdate(
      req.account.id,
      { 'settings.theme': theme },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Settings updated',
      account: account.toSafeObject()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout (client-side token removal)
 * @route   POST /api/auth/logout
 * @access  Private
 * @note    Since we use JWT, logout is handled client-side by removing the token.
 *          This endpoint exists for API consistency and potential future token blacklisting.
 */
const logout = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateSettings,
  logout
};
