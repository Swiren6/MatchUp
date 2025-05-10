// routes/admin.routes.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMidd = require("../middlewares/authMidd");

// Middleware pour vérifier le rôle Admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }
  next();
};

// ► Route 1 : Lister tous les utilisateurs (Admin seulement)
router.get("/users", authMidd, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur serveur",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// ► Route 2 : Créer un utilisateur (Admin seulement)
router.post("/users", authMidd, isAdmin, async (req, res) => {
  try {
    const { name, lastname, email, password, role } = req.body;
    
    const user = await User.create({ 
      name, 
      lastname, 
      email, 
      password, // Le middleware pre('save') dans le modèle User hash automatiquement
      role: role || "freelancer"
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ► Route 3 : Mettre à jour un utilisateur
router.put("/users/:id", authMidd, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, select: "-password" }
    );
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    res.json({ message: "Utilisateur mis à jour", user });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ► Route 4 : Supprimer un utilisateur
router.delete("/users/:id", authMidd, isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;