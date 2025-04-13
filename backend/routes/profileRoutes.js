const express = require("express");
const Profile = require("../models/profile");
const router = express.Router();

// 🔹 Ajouter un profil
router.post("/add", async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Récupérer tous les profils
router.get("/findall", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("userId");
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Mettre à jour un profil
router.put("/update/:id", async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Supprimer un profil
router.delete("/delete/:id", async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);
    res.json({ message: "Profil supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


