const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Email ผิด' });
    }

    // For simplicity, compare the provided password directly with the user's password
    if (password !== user.password) {
      return res.status(401).json({ message: 'Password ผิด' });
    }

    // Generate a JWT token
    const token = generateToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = login;
