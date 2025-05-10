const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Pour utiliser la clé secrète
const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

router.post("/signup", async (req, res) => {
  const { name, lastname, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastname,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    // Générer le token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Utilisateur inscrit avec succès",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        lastname: newUser.lastname,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;