const express = require("express");
const Message = require("../models/messages");
const router = express.Router();

// 🔹 Envoyer un message
router.post("/send", async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Récupérer les messages entre deux utilisateurs
router.get("/find/:senderId/:receiverId", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.params.senderId, receiverId: req.params.receiverId },
        { senderId: req.params.receiverId, receiverId: req.params.senderId }
      ]
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
