const SlipHistory = require('../models/slipHistoryModel');
// ประวัติการเติมเงิน

exports.getSlipHistoryById = async (req, res) => {
  try {
    const slipHistory = await SlipHistory.findById(req.params.id);
    if (!slipHistory) {
      return res.status(404).json({ message: 'SlipHistory not found' });
    }
    res.status(200).json(slipHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
