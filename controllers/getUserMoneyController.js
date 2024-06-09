const User = require('../models/userModel');

// Fetch user's money
const getUserMoney = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ money: user.money });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getUserMoney

  