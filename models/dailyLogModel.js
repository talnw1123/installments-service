const mongoose = require("mongoose");

const dailyLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  totalPaid: {
    type: Number,
    required: true,
  },
  totalDept: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("DailyLog", dailyLogSchema);
