const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// JWT Secret Key (replace with your actual secret key)
const jwtSecret = process.env.JWT_SECRET || '7751eabcfcf473627bcdbee7ca874bd51f4227376ae918e29f78e6cff9f55b9e';

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log('Received token:', token); // Log the token received by the server
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(401).json({ message: 'Token inválido.' });
  }
};

// Add movie ID to user's list
router.post('/user/add/:list', auth, async (req, res) => {
  const { list } = req.params;
  const { movieId } = req.body;
  console.log(req.body);
  try {
    // Check if movieId is provided
    if (!movieId) {
      return res.status(400).json({ message: 'Movie ID is required.' });
    }

    // Find the user by ID and update the respective list
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Update the specified list if the movieId is not already included
    if (!user[list].includes(movieId)) {
      user[list].push(movieId);
      await user.save();
    }

    // Return the updated user object with the modified list
    res.json(user);
  } catch (err) {
    console.error('Error adding movie to list:', err);
    res.status(500).json({ message: 'Error de servidor.' });
  }
});

// Get movies from user's list
router.get('/user/get/:list', auth, async (req, res) => {
  const { list } = req.params;

  try {
    // Find the user by ID and fetch the respective list
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Return the specified list
    res.json(user[list]);
  } catch (err) {
    console.error('Error fetching user list:', err);
    res.status(500).json({ message: 'Error de servidor.' });
  }
});

// Remove movie ID from user's list
router.delete('/user/delete/:list', auth, async (req, res) => {
  const { list } = req.params;
  const { movieId } = req.body;

  try {
    // Check if movieId is provided
    if (!movieId) {
      return res.status(400).json({ message: 'El ID de la pelicula es requerido.' });
    }

    // Find the user by ID and update the respective list
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Remove the movieId from the specified list
    const updatedList = user[list].filter(id => id.toString() !== movieId.toString());
    console.log(updatedList);

    
    if (updatedList.length === user[list].length) {
      return res.status(404).json({ message: 'Movie not found in the list.' });
    }

    user[list] = updatedList;
    await user.save();

    // Return the updated user object with the modified list
    res.json(user);
  } catch (err) {
    console.error('Error deleting movie from list:', err);
    res.status(500).json({ message: 'Server Error.' });
  }
});


// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Por favor, provea todos los campos mandatorios.' });
  }

  try {
    // Check if user already exists by email
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }

    // Check if user already exists by username
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
      return res.status(400).json({ message: 'El usuario ya existe.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server Error.' });
  }
});

// Check if username or email already exists
router.post('/check', async (req, res) => {
  const { username, email } = req.body;

  try {
    const existingEmailUser = await User.findOne({ email });
    const existingUsernameUser = await User.findOne({ username });

    if (existingEmailUser || existingUsernameUser) {
      let errors = {};
      if (existingEmailUser) {
        errors.email = 'El email ya está registrado.';
      }
      if (existingUsernameUser) {
        errors.username = 'El usuario ya existe.';
      }
      return res.status(400).json({ errors });
    }

    res.status(200).json({ message: 'User does not exist.' });
  } catch (err) {
    console.error('Error checking user:', err);
    res.status(500).json({ message: 'Server Error.' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server Error.' });
  }
});

// Get logged in user
router.get('/user', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching logged in user:', err);
    res.status(500).json({ message: 'Server Error.' });
  }
});

module.exports = router;
