const express = require('express');
const router = express.Router();

// Simulated data
const freelancers = [
  { id: 1, name: "Sirine", skills: ["React", "Node.js", "MongoDB"] },
  { id: 2, name: "Ahmed", skills: ["Vue", "Laravel"] },
  { id: 3, name: "Yasmine", skills: ["React", "Firebase"] },
  { id: 4, name: "Karim", skills: ["Angular", "TypeScript", "RxJS"] },
  { id: 5, name: "Leila", skills: ["Python", "Django", "PostgreSQL"] },
  { id: 6, name: "Omar", skills: ["Flutter", "Firebase", "Dart"] },
  { id: 7, name: "Nadia", skills: ["Java", "Spring Boot", "MySQL"] },
  { id: 8, name: "Tarek", skills: ["PHP", "WordPress", "CSS"] },
  { id: 9, name: "Hana", skills: ["React Native", "Redux", "GraphQL"] },
  { id: 10, name: "Malik", skills: ["Swift", "iOS Development", "Xcode"] }
];

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

// Matching function
function matchEntities(sourceSkills, targetList, targetKey) {
  return targetList.map(item => {
    const matchCount = item[targetKey].filter(skill =>
      sourceSkills.includes(skill)
    ).length;

    const score = (matchCount / item[targetKey].length) * 100;
    return { ...item, matchScore: Math.round(score) };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

// POST: Recruteur => Trouver des freelances
router.post("/freelancers", (req, res) => {
  const { requiredSkills } = req.body;
  if (!requiredSkills) return res.status(400).json({ message: "requiredSkills manquant" });

  const matches = matchEntities(requiredSkills, freelancers, 'skills');
  res.json(matches);
});

// POST: Freelance => Trouver des projets
router.post("/projects", (req, res) => {
  const { skills } = req.body;
  if (!skills) return res.status(400).json({ message: "skills manquant" });

  const matches = matchEntities(skills, projects, 'requiredSkills');
  res.json(matches);
});

module.exports = router;
