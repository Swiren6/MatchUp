const express = require('express');
const router = express.Router();
const { checkForMatch, notifyUsers } = require('../models/matchs');

router.post('/like/:userId/:targetId', (req, res) => {
  const { userId, targetId } = req.params;

  if (userId === targetId) {
    return res.status(400).json({ error: "Tu ne peux pas te liker toi-même" });
  }

  const matched = checkForMatch(userId, targetId);

  if (matched) {
    notifyUsers(userId, targetId);
  }

  res.json({ matched });
});

// Exemple : Score = compétences communes + disponibilité
router.post('/match', (req, res) => {
  const { userA, userB } = req.body;
  const score = calculateBasicMatch(userA, userB);
  res.json({ score });
});

module.exports = router;
