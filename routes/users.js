// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  const { name, email, password, avatar, phoneNumber, isActive } = req.body;
  try {
    const user = new User({ name, email, password, avatar, phoneNumber, isActive });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
