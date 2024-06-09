const SlipHistory = require('../models/slipHistoryModel');
const User = require('../models/userModel');

exports.updateSlipHistoryStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!['completed', 'failed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  try {
    const slip = await SlipHistory.findById(id);

    if (!slip) {
      return res.status(404).json({ message: 'Slip history not found' });
    }

    if (status === 'completed' && slip.status !== 'completed') {
      const user = await User.findOne({ email: slip.email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.money += slip.amount;
      await user.save();
    }

    slip.status = status;
    await slip.save();

    res.status(200).json(slip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
