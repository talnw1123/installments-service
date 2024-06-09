const SlipHistory = require('../models/slipHistoryModel');

exports.createSlipHistory = async (req, res) => {
  try {
    const { email, accountName, amount } = req.body;
    const slipImage = req.file.path; // Assuming you use multer for file uploads

    const newSlipHistory = new SlipHistory({
      email,
      accountName,
      amount,
      slipImage,
    });

    await newSlipHistory.save();
    res.status(201).json(newSlipHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
