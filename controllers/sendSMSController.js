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

async function sendSMS() {
  try {
    const client = new twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const message = await client.messages.create({
      body: "ถึงวันครบกำหนดจ่ายค่างวด",
      from: process.env.PHONE_NUMBER,
      to: "+66646157538",
    });

    console.log(message.sid, "Message sent:", "ถึงวันครบกำหนดจ่ายค่างวด");
  } catch (error) {
    console.error(error);
  }
}

module.exports = { sendSMS };
