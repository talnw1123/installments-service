// controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  const userId = req.params.username;
  const { username, password, email, money } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    if (username) user.username = username;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (email) user.email = email;
    if (money !== undefined) user.money = money;

    await user.save();
    res.send('User updated successfully');
  } catch (error) {
    res.status(500).send('Error updating user: ' + error.message);
  }
};

module.exports = updateUser
