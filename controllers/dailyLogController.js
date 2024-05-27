
const DailyLog = require('../models/dailyLogModel');

const getDailyLogs = async (req, res) => {
  try {
    const logs = await DailyLog.find().sort({ date: 1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getDailyLogs;

