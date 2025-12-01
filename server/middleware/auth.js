const jwt = require('jsonwebtoken');
const Account = require('../models/Account');

/**
 * Authentication middleware
 * Verifies JWT token and attaches account to request
 */
const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get account from token
    const account = await Account.findById(decoded.id);

    if (!account) {
      return res.status(401).json({
        success: false,
        message: 'Account not found'
      });
    }

    // Attach account to request object
    req.account = account;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};

module.exports = { protect };
