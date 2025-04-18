const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  bio: { type: String },
  skills: { type: [String] }, // Tableau de compétences
  location: { type: String },
  photo: { type: String }, // URL de l'image
  github: { type: String },
  cvLink: { type: String },

  educations: [
    {
      from: String,
      to: String,
      description: String,
      degree: String,
      location: String,
    },
  ],

  experiences: [
    {
      title: String,
      from: String,
      to: String,
      description: String,
      company: String,
      location: String,
    },
  ],

  socials: {
    facebook: String,
    linkedin: String,
    twitter: String,
  },

  likes: [
    {
      userId: String,
      liker: String,
    },
  ],

  matches: [
    {
      userId: String,
      matched: String,
    },
  ],

  messages: [
    {
      userId: String,
      message: String,
    },
  ],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Profile = mongoose.models.profile || mongoose.model("profiles", profileSchema);
module.exports = Profile;
