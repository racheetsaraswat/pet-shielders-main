const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/user"); // Make sure the path to your User model is correct
const router = express.Router();

// Helper: verify reCAPTCHA
const verifyCaptcha = async (token) => {
  console.log(process.env.RECAPTCHA_SECRET_KEY);
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
    params: {
      secret,
      response: token,
    },
  });
  return response.data.success;
};

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, passcode } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPasscode = await bcrypt.hash(passcode, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      passcode: hashedPasscode,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password, passcode } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check if password and passcode match
    const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasscodeValid = await bcrypt.compare(passcode, user.passcode);

    if (!isPasswordValid || !isPasscodeValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Save the last login time
    user.lastLogin = Date.now();
    await user.save();

    // Generate JWT token for user authentication (15 minutes expiry)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Return the token and user name
    res.status(200).json({ token, name: user.name });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
