const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  money: {
    type: Number,
    default: 0, // หรือค่าเริ่มต้นตามที่คุณต้องการ
  },  
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
