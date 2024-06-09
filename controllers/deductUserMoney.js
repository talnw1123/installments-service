const User = require('../models/userModel');
const deductUserMoney = async (req, res) => {
    const { email, amount } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.money < amount) {
        return res.status(400).json({ error: 'Insufficient funds' });
      }
      user.money -= amount;
      await user.save();
      res.json({ success: true, money: user.money });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  module.exports = deductUserMoney
