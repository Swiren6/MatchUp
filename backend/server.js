const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require("cors");

// Config dotenv
dotenv.config();

// Import des routes
const userRoutes = require("./routes/userRoutes");
const signupRoutes = require("./routes/signup");
const signinRoutes = require("./routes/signin");

const app = express();

// Middlewares
app.use(express.json()); // Pour lire les données JSON
app.use(express.static("public")); // Pour servir des fichiers statiques (ex: images, uploads)
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Routes API
app.use("/api/users", userRoutes);
app.use("/api/auth", signupRoutes);
app.use("/api/auth", signinRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("👋 Bienvenue sur l'API backend de MatchUp !");
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connecté à MongoDB"))
.catch(err => {
  console.error("❌ Erreur de connexion MongoDB :", err.message);
  process.exit(1);
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
