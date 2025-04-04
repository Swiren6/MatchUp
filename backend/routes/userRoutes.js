const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Configurer le stockage pour multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Dossier où les fichiers seront enregistrés
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    // Renommer les fichiers pour éviter les collisions
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Appliquer multer pour gérer les uploads
const upload = multer({ storage });

// 🔹 Ajouter un utilisateur
router.post("/add", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Récupérer tous les utilisateurs
router.get("/findall", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Récupérer un utilisateur par ID
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Mettre à jour un utilisateur
router.put("/edit/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Supprimer un utilisateur
router.delete("/delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Mettre à jour la photo de profil de l'utilisateur
router.post('/upload-avatar', upload.single('avatar'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier n\'a été téléchargé.');
  }

  const avatarUrl = `/uploads/${req.file.filename}`;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // Assumes user is authenticated and user id is available
      { photo: avatarUrl },
      { new: true }
    );
    res.json({ message: 'Photo de profil mise à jour avec succès', avatarUrl: updatedUser.photo });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la mise à jour de la photo de profil');
  }
});

// 🔹 Mettre à jour le CV de l'utilisateur
router.post('/upload-cv', upload.single('cv'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier n\'a été téléchargé.');
  }

  const cvUrl = `/uploads/${req.file.filename}`;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id, // Assumes user is authenticated and user id is available
      { cv: cvUrl },
      { new: true }
    );
    res.json({ message: 'CV mis à jour avec succès', cvUrl: updatedUser.cv });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la mise à jour du CV');
  }
});

module.exports = router;
