const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Model = require('../models/user');
const hashPassword = require('../helpers/auth')
// controllers
// const {signup, signin, forgotPassword, resetPassword} = require('../controllers/auth')

router.get('/', (req, res) => {
  return res.json({
    data: 'hello world from the API',
  });
});

// router.post("/signup", signup);
// router.post("/signin", signin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

router.post('/signup', async (req, res) => {
  const data = new Model({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
  });
  try {
    // validation
    const {name, email, password} = req.body;
    if (!name) {
      return res.json({
        error: 'Name is required',
      });
    }
    if (!email) {
      return res.json({
        error: 'Email is required',
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and should be 6 characters long',
      });
    }
    const dataToSave = await data.save();

    const token = jwt.sign({_id: data._id}, 'JWT_SECRET', {
      expiresIn: '7d',
    });
    const {...rest} = dataToSave._doc;
    return res.json({
      token,
      user: rest,
      isAuthenticated: true
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }

  // try {
  //     const dataToSave = await data.save();
  //     res.status(200).json(dataToSave)
  // }
  // catch (error) {
  //     res.status(400).json({message: error.message})
  // }
});

module.exports = router;
