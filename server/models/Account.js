const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default in queries
  },
  heroes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hero'
  }],
  settings: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Maximum heroes per account
AccountSchema.path('heroes').validate(function(heroes) {
  return heroes.length <= 5;
}, 'Maximum of 5 heroes allowed per account');

// Hash password before saving
AccountSchema.pre('save', async function(next) {
  // Only hash if password was modified
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
AccountSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT token
AccountSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Method to return safe account data (without sensitive info)
AccountSchema.methods.toSafeObject = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    heroes: this.heroes,
    settings: this.settings,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('Account', AccountSchema);
