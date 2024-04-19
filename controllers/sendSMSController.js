/*
const twilio = require("twilio");
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

const sendSMS = async (req, res) => {
  try {
    const { to, body } = req.body;
    const message = await client.messages.create({
      to: to,
      body: body,
      from: process.env.PHONE_NUMBER,
    });
    res.send("SMS sent successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending SMS");
  }
};
*/

const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();

async function sendSMS(req, res) {
  if (!process.env.TWILIO_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.log("Twilio SID or Auth Token is not set in environment variables");
    return res.status(500).send("Server configuration error");
  }

  try {
    const client = new twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    const { to, body } = req.body;

    const message = await client.messages.create({
      body: body,
      from: process.env.PHONE_NUMBER,
      to: to,
    });

    console.log(message.sid, "Message sent");
    res.send("SMS sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending SMS");
  }
}

module.exports = { sendSMS };

module.exports = { sendSMS };
