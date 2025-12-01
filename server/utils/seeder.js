/**
 * Database Seeder
 * Populates the database with initial item data
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Load models
const Item = require('../models/Item');

// Load data
const { itemsArray } = require('../data/items');

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Import items into database
const importData = async () => {
  try {
    await connectDB();

    // Clear existing items
    await Item.deleteMany();
    console.log('Existing items cleared');

    // Insert new items
    await Item.insertMany(itemsArray);
    console.log(`${itemsArray.length} items imported successfully`);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data from database
const destroyData = async () => {
  try {
    await connectDB();

    await Item.deleteMany();
    console.log('All items destroyed');

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
