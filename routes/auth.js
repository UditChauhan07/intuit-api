// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { sendResetPasswordEmail } = require('../mailer');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: 'User Not Found.' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If the password is valid, generate an access token
    const accessToken = jwt.sign({ userId: user._id }, 'aW50dWl0', {  algorithm: 'HS256', expiresIn: '24h' });
    res.json({ accessToken });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint for sending the reset password email
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Here, you should check if the provided email exists in your user database
    console.log(email);
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    // Generate a reset token and store it in the user's record
    const resetToken = uuidv4();
    const resetTokenExpiry = Date.now() + 3600000; // Set token expiry to 1 hour from now

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();
  // Create the reset link with the token
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
  
    sendResetPasswordEmail(email, resetLink);
  
    res.json({ message: 'Reset password email sent successfully' });
  });

  
// Endpoint for resetting the password using the reset token from the email link
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    // Here, you should validate the reset token and retrieve the user associated with it
    const user = User.find((user) => user.resetToken === token);
  
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
  
    // Check if the token is still valid (not expired)
    if (user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ error: 'Token has expired' });
    }
  
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    // Update the user's password with the new hashed password
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();
    // Return a success message
    res.json({ message: 'Password reset successful' });
  });

module.exports = router;
