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
// const matchRoutes = require("./routes/match.routes");


// Routes API
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/match", matchRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("👋 Bienvenue sur l'API backend de MatchUp !");
});

const projects = [
  { id: 101, title: "Web App", requiredSkills: ["React", "MongoDB"] },
  { id: 102, title: "Mobile App", requiredSkills: ["Flutter"] },
  { id: 103, title: "E-commerce Platform", requiredSkills: ["Django", "PostgreSQL"] },
  { id: 104, title: "CMS Website", requiredSkills: ["WordPress", "PHP"] },
  { id: 105, title: "Enterprise Application", requiredSkills: ["Java", "Spring Boot"] },
  { id: 106, title: "Cross-platform App", requiredSkills: ["React Native", "Redux"] },
  { id: 107, title: "iOS App", requiredSkills: ["Swift", "Xcode"] },
  { id: 108, title: "Admin Dashboard", requiredSkills: ["Angular", "TypeScript"] },
  { id: 109, title: "Real-time Chat", requiredSkills: ["Node.js", "Firebase"] },
  { id: 110, title: "API Development", requiredSkills: ["Node.js", "MongoDB"] }
];

// Fonction de calcul du matching
const calculateMatchScore = (freelancerSkills, projectSkills) => {
  const matchingSkills = freelancerSkills.filter(skill => projectSkills.includes(skill));
  return (matchingSkills.length / projectSkills.length) * 100;
};

// Route pour récupérer les projets en fonction des compétences
app.post('/api/freelancer/match', (req, res) => {
  const { skills } = req.body;

  if (!skills || skills.length === 0) {
    return res.status(400).json({ error: "Veuillez entrer des compétences." });
  }

  const matchedProjects = projects.map(project => {
    const matchScore = calculateMatchScore(skills, project.requiredSkills);
    return { ...project, matchScore };
  });

  // Trier les projets par score de matching décroissant
  matchedProjects.sort((a, b) => b.matchScore - a.matchScore);

  res.json(matchedProjects);
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