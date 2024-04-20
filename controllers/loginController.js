const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/userModel");

// ... (CORS and body-parser middleware setup)
function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1hr" });
}

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    const full_name = user.full_name;
    const new_created_user = { email, full_name };

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // For simplicity, compare the provided password directly with the user's password
    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });
    const accessToken = generateAccessToken(new_created_user);
    res.cookie("token", accessToken, { httpOnly: true, secure: true });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
