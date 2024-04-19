const express = require('express');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const router = express.Router();

// Middleware สำหรับตั้งค่า Header เพื่ออนุญาตการเข้าถึง API จากโดเมนต่าง ๆ
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Route สำหรับการดึงข้อมูล Users ทั้งหมด
router.get('/', async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  console.log("my users is ", users);
  res.status(200).json(users);
});

// Route สำหรับการลงทะเบียน User ใหม่
router.post('/register', async (req, res) => {
  const { firstName,lastName,email, password, address, phone } = req.body;

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
    const user = await User.create({ firstName,lastName,email, password, address, phone });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

module.exports = router;
