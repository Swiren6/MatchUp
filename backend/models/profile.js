const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  bio: { type: String },
  skills: { type: [String] }, // Tableau de compétences
  location: { type: String },
  photo: { type: String }, // URL de l'image
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Profile", profileSchema);
