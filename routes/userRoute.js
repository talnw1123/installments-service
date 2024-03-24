const express = require('express');
const User = require('../models/userModel');
const mongoose = require('mongoose');

const router = express.Router();

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

router.get('/', async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    console.log("my users is ", users);
    res.status(200).json(users)
})

router.post('/register', async (req, res) => {
    const {email, password, address, phone} = req.body;

    let emptyFields = []

    if(!email) {
        emptyFields.push('email')
    }
    if(!password) {
        emptyFields.push('password')
    }
    if(!address) {
        emptyFields.push('address')
    }
    if(!phone) {
        emptyFields.push('phone')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all fields", emptyFields})
    }

    try {
        const user = await User.create({email, password, address,phone})
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({err: error.message})
    }

})

module.exports = router;
