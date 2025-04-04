const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "user", "recruteur"],
    default: "user" 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  photo: { type: String, default: '/default-avatar.png' }, // URL de la photo de profil
  cv: { type: String, default: '' } // URL du CV
});

const User = mongoose.models.user || mongoose.model('user', userSchema);

module.exports = User;
