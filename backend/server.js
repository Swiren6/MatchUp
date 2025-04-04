const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');


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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//beche ykhdem el uploads folder





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

  app.get("/", (req, res) => {
    res.send("hello ");
  });

  app.post('/auth/register', (req, res) => {
    const { fullname, email, password } = req.body;
  
    // Simple validation for demonstration
    if (!fullname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Here, you can add logic to save the user to a database
    console.log(`New user registered: ${fullname}, ${email}`);
  
    // Sending a success response
    res.status(201).json({ message: 'Account created successfully!' });
  });
  

// machi el serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅Serveur démarré sur le port ${PORT}`);
});