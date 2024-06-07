const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const getUsername = require('../controllers/getUserNameController')

router.post("/api/users/login", loginController); // Corrected path
router.post("/api/users/register", registerController);
router.get('/username', auth, getUsername);

module.exports = router;
