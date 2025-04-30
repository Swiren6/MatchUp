const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authentication = require("../middlewares/authMidd");

// Route protégée pour récupérer les infos utilisateur
router.get("/user/:id", authentication, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    res.json({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;