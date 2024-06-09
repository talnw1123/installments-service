const mongoose = require('mongoose');

// Define the slipHistory schema
const slipHistorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  accountName: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  slipImage: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// Create the slipHistory model
const SlipHistory = mongoose.model('SlipHistory', slipHistorySchema);

module.exports = SlipHistory;
