const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "super_secret_key";

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Authentification requise" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token invalide ou expiré",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

module.exports = authenticate;