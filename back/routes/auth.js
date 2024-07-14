const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT Secret Key (replace with a strong secret key)
const jwtSecret = process.env.JWT_SECRET || '7751eabcfcf473627bcdbee7ca874bd51f4227376ae918e29f78e6cff9f55b9e';

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Check if email already exists
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Check if username already exists
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });
    // Save the new user
    const savedUser = await newUser.save();

    // Respond with the saved user data
    res.status(201).json(savedUser);
  } catch (err) {
    // Handle server errors
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error while registering user.' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

    // Respond with token and user data
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    // Handle server errors
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Server error while logging in user.' });
  }
});

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, jwtSecret);
    // Set decoded user information to req.user
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle token verification errors
    console.error('Error verifying token:', err);
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

// Get logged in user
router.get('/user', auth, async (req, res) => {
  try {
    // Find user by ID and exclude password field
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    // Respond with user data
    res.json(user);
  } catch (err) {
    // Handle server errors
    console.error('Error fetching user data:', err);
    res.status(500).json({ message: 'Server error while fetching user data.' });
  }
});

// Change Password
router.post('/change-password', auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
