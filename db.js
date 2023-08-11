// db.js
require('dotenv').config();
const mongoose = require('mongoose');


const MONGODB_URI = process.env.DB_URL; // Replace with your MongoDB connection string

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
