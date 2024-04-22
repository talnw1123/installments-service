const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const generateToken = require("../config/generateToken");

const register = async (req, res) => {
  const { firstName, lastName, email, password, address, phone } = req.body;

  // ตรวจสอบข้อมูลที่ส่งมาใน request body
  let emptyFields = [];

  if (!firstName) {
    emptyFields.push('firstName');
  }
  if (!lastName) {
    emptyFields.push('lastName');
  }
  if (!email) {
    emptyFields.push('email');
  }
  if (!password) {
    emptyFields.push('password');
  }
  if (!address) {
    emptyFields.push('address');
  }
  if (!phone) {
    emptyFields.push('phone');
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill in all fields", emptyFields });
  }

  try {
    // สร้าง User ใหม่โดยใช้ Model User
    const user = await User.create({ firstName, lastName, email, password, address, phone });

    // สร้าง JWT token
    const token = generateToken(user._id);

    res.status(200).json({ user, token }); // ส่ง user และ token กลับไปให้กับผู้ใช้งาน
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = register;
