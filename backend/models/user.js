const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["admin", "user","recruteur"],
     default: "user" },
  
});

const User = mongoose.models.user || mongoose.model('users', userSchema);
module.exports = User;