const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

// Config dotenv
dotenv.config();

const app = express();

// Middlewares
app.use(express.json()); // Must come before routes
app.use(express.static("public"));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Import routes
const userRoutes = require("./routes/user.Routes");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

// Routes API
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("👋 Bienvenue sur l'API backend de MatchUp !");
});


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connecté à MongoDB"))
.catch(err => {
  console.error("❌ Erreur de connexion MongoDB :", err.message);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});