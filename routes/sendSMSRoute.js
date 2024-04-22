const express = require("express");
const router = express.Router();
const sendSMSController = require("../controllers/sendSMSController");

router.post("/send-sms", sendSMSController.sendSMS);

module.exports = router;
