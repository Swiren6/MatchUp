const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");


const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");
const matchRoutes = require("./routes/matchRoutes");
const messageRoutes = require("./routes/messageRoutes");
const profileRoutes = require("./routes/profileRoutes");
const authRoutes = require("./routes/auth");


dotenv.config();
const app = express();
app.use(express.json());//beche ya9ra les requests en format json
app.use(cors());
app.use("/auth", authRoutes);//beche ykhdem el auth routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//beche ykhdem el uploads folder
app.use(bodyParser.json());





//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error(err));
  app.use("/users", userRoutes);//activer les routes users 
  app.use("/jobs", jobRoutes);//activer les routes jobs
  app.use("/matches", matchRoutes);//activer les routes matches
  app.use("/messages", messageRoutes);//activer les routes messages
  app.use("/profiles", profileRoutes);//activer les routes profiles
  app.use("/auth", authRoutes);
  // Routes IA
app.post('/api/ai/match', async (req, res) => {
  // Implémentez votre algorithme de matching ici
  const { skills } = req.body;
  
  // Exemple simplifié
  const matches = [
    { name: "Projet X", compatibility: 0.85 },
    { name: "Projet Y", compatibility: 0.72 }
  ];
  
  res.json({ matches });
});

app.post('/api/ai/chat', async (req, res) => {
  // Intégration avec OpenAI ou autre service IA
  const { message } = req.body;
  
  // Réponse simulée
  const replies = [
    "Je peux vous aider à trouver des collaborations!",
    "D'après votre profil, je recommande...",
    "Voici 3 projets qui correspondent à vos compétences:"
  ];
  
  res.json({ 
    reply: replies[Math.floor(Math.random() * replies.length)] 
  });
});




  
// Utilisation des routes d'authentification
app.use('/api/auth', authRoutes);
// machi el serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅Serveur démarré sur le port ${PORT}`);
});