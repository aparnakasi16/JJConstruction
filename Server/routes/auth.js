const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Model = require('../models/user');
const hashPassword = require('../helpers/auth')
const bcrypt = require('bcrypt')
// controllers
// const {signup, signin, forgotPassword, resetPassword} = require('../controllers/auth')

router.get('/', (req, res) => {
  return res.json({
    data: 'hello world from the API',
  });
});

router.post('/signup', async (req, res) => {
  const { name, phone, email, password, address } = req.body;

  try {
    // Input validation
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Check if user with the same phone already exists
    const existingUser = await Model.findOne({ phone: phone });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this phone number already exists' });
    }

    // Hash the password
    const saltRounds = 10; // Number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user instance with the hashed password
    const newUser = new Model({
      name: name,
      phone: phone,
      email: email,
      password: hashedPassword, // Store the hashed password
      address: address,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate token
    const token = jwt.sign({ _id: savedUser._id }, 'JWT_SECRET', {
      expiresIn: '7d',
    });

    const { ...rest } = savedUser._doc;
    return res.json({
      token,
      user: rest,
      isAuthenticated: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Validate input
    if (!phone || !password) {
      return res.status(400).json({ error: 'Phone and password are required' });
    }

    // Find user by phone number
    const user = await Model.findOne({ phone: phone });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token if phone and password match
    const token = jwt.sign({ _id: user._id }, 'JWT_SECRET', {
      expiresIn: '7d',
    });

    const { ...rest } = user._doc;
    return res.json({
      token,
      user: rest,
      isAuthenticated: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }
});


router.get('/user/:phone', async (req, res) => {
  try {
    const phone = req.params.phone;

    // Find user by phone number
    const user = await Model.findOne({ phone: phone });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data
    return res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
