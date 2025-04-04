const express = require("express");
const Job = require("../models/jobs");
const router = express.Router();

// 🔹 Ajouter une offre d'emploi
router.post("/add", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Récupérer toutes les offres d'emploi
router.get("/findall", async (req, res) => {
  try {
    const jobs = await Job.find().populate("recruiterId");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// 🔹 Récupérer une offre d'emploi par ID
router.get("/find/:id", async (req, res) => {
    try {
      const job = await Job.findById(req.params.id).populate("recruiterId");
      if (!job) {
        return res.status(404).json({ message: "Offre non trouvée" });
      }
      res.json(job);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// 🔹 Mettre à jour une offre d'emploi
router.put("/update/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Supprimer une offre d'emploi
router.delete("/delete/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Offre supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
