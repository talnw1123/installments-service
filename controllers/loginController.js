const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../config/generateToken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Invalid email:', email); // เขียน Log เมื่อ email ไม่ถูกต้อง
      return res.status(401).json({ message: 'Invalid email' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Invalid password for user:', email); // เขียน Log เมื่อ password ไม่ถูกต้อง
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate a JWT token
    const token = generateToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error:', error); // เขียน Log เมื่อเกิดข้อผิดพลาด
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = login;
