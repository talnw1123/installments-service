const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

const generateToken = (id) => {
  return jwt.sign({id}, process.env.SECRET_KEY, {
      expiresIn: "1h"
  });
}

const register = async (req, res) => {
  const { username, password, email } = req.body;

  // Log the received data
  console.log('Received data:', { username, email, password });

  // Check for empty fields
  let emptyFields = [];

  if (!username) emptyFields.push('username');
  if (!password) emptyFields.push('password');
  if (!email) emptyFields.push('email');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, email });

    await user.save(); // Ensure the user is saved to the database

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error saving user:', error); // Log the error
    res.status(400).json({ error: error.message });
  }
};

module.exports = register;
