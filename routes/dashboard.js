// routes/dashboard.js
const express = require('express');
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protected route: User must be authenticated to access the dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    // Find the user by their ID (provided through the authMiddleware)
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data (excluding the password) as the dashboard data
    const dashboardData = {
      id: user._id,
      name: user.name,
      email: user.email,
      // Add other user data fields you want to include in the dashboard response
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
