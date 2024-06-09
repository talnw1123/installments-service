const SlipHistory = require('../models/slipHistoryModel');
const User = require('../models/userModel');

exports.getAllSlipHistories = async (req, res) => {
  try {
    const slipHistories = await SlipHistory.find();
    const enrichedSlipHistories = await Promise.all(slipHistories.map(async slip => {
      const user = await User.findOne({ email: slip.email });
      return {
        ...slip._doc,
        username: user ? user.username : 'Unknown User',
      };
    }));
    res.status(200).json(enrichedSlipHistories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
