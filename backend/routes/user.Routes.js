const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middlewares/authMidd");
const { check, validationResult } = require("express-validator");

// Middleware pour vérifier le rôle Admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Accès réservé aux administrateurs" });
  }
  next();
};

// ► Route 1 : Lister tous les utilisateurs (Admin seulement)
router.get("/admin/users", auth, isAdmin, async (req, res) => {
  try {
    // Pagination (optionnelle)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password -__v")
      .skip(skip)
      .limit(limit)
      .lean();

    const totalUsers = await User.countDocuments();

    res.json({
      users,
      pagination: {
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
        currentPage: page
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Erreur serveur",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
});

// ► Route 2 : Créer un utilisateur (Admin seulement)
router.post(
  "/admin/users",
  auth,
  isAdmin,
  [
    check("email").isEmail().withMessage("Email invalide"),
    check("password").isLength({ min: 8 }).withMessage("8 caractères minimum"),
    check("role").isIn(["freelancer", "recruiter", "admin"]).withMessage("Rôle invalide")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, lastname, email, password, role } = req.body;
      const user = await User.create({ name, lastname, email, password, role });

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
      if (error.code === 11000) { // Erreur de duplication d'email
        return res.status(400).json({ message: "Email déjà utilisé" });
      }
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

// ► Route 3 : Mettre à jour un utilisateur (Admin seulement)
router.put(
  "/admin/users/:id",
  auth,
  isAdmin,
  [
    check("id").isMongoId().withMessage("ID invalide"),
    check("email").optional().isEmail().withMessage("Email invalide"),
    check("role").optional().isIn(["freelancer", "recruiter", "admin"]).withMessage("Rôle invalide")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }

      res.json({ 
        message: "Utilisateur mis à jour",
        user 
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

// ► Route 4 : Supprimer un utilisateur (Admin seulement)
router.delete(
  "/admin/users/:id",
  auth,
  isAdmin,
  [check("id").isMongoId().withMessage("ID invalide")],
  async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" });
      }
      res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

module.exports = router;