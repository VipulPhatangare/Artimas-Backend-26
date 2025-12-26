const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Artimas 2026 MongoDB connected');
  } catch (err) {
    console.error('Artimas 2026 MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = {connectDB};