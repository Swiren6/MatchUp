const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();
const validator = require("validator");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

// Registration (Signup)
router.post("/signup", async (req, res) => {
  try {
    const { name, lastname, email, password, role } = req.body;

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user (password is automatically hashed by pre-save hook)
    const user = await User.create({
      name,
      lastname,
      email,
      password,
      role: role || "freelancer"
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// Login (Signin)
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  // Email validation
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    // Find user with password
    const user = await User.findOne({ email }).select("+password");
    
    // Debug log (remove in production)
    console.log("Login attempt for:", email);
    console.log("Stored hash:", user?.password);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

module.exports = router;