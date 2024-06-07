// In your user controller file
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const getUsername = async (req, res) => {
  try {
    // Log the incoming request headers
    console.log('Request headers:', req.headers);

    const token = req.headers.authorization.split(' ')[1];

    // Log the token extracted from headers
    console.log('Extracted token:', token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Log the decoded token information
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded.id);

    // Log the user information fetched from the database
    console.log('Fetched user:', user);

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with username and money
    res.status(200).json({ username: user.username, money: user.money });

    // Log the response being sent to the client
    console.log('Response sent:', { username: user.username, money: user.money });
  } catch (error) {
    // Log the error encountered
    console.error('Error fetching username:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = getUsername;
