// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth'); 
const dashboardRoutes = require('./routes/dashboard'); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use(userRoutes);
app.use(authRoutes);
app.use(dashboardRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
