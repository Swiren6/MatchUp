import React, { useState } from 'react';
import './ProjetSwipe.css';

const ProjectSwipe = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "Développement d'une application React Native",
      description: "Nous cherchons un développeur expérimenté pour créer une application mobile cross-platform avec React Native. Le projet inclut l'intégration avec une API REST existante.",
      budget: "DT5,000 - DT8,000",
      duration: "3-4 mois",
      skills: ["React Native", "JavaScript", "API Integration"],
      client: "Startup Tech",
      clientRating: "4.9/5",
      posted: "Il y a 2 jours",
      background: "linear-gradient(135deg, #6e8efb, #a777e3)",
      emoji: "📱"
    },
    {
      id: 2,
      title: "Refonte UI/UX pour site e-commerce",
      description: "Redesign complet de l'interface utilisateur et de l'expérience client pour notre plateforme e-commerce. Nous voulons moderniser le look tout en améliorant le taux de conversion.",
      budget: "DT3,500",
      duration: "6 semaines",
      skills: ["UI Design", "UX Research", "Figma", "Prototypage"],
      client: "FashionCo",
      clientRating: "4.7/5",
      posted: "Il y a 1 semaine",
      background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
      emoji: "🎨"
    },
    {
      id: 3,
      title: "Système de recommandation avec Machine Learning",
      description: "Développement d'un algorithme de recommandation personnalisé pour notre plateforme de contenu. Doit intégrer avec notre base de données existante et fournir des résultats en temps réel.",
      budget: "DT10,000+",
      duration: "5-6 mois",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      client: "MediaTech",
      clientRating: "5/5",
      posted: "Aujourd'hui",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      emoji: "🧠"
    },
    {
      id: 4,
      title: "Copywriting pour site web corporatif",
      description: "Rédaction de contenu engageant pour notre nouveau site web corporatif. Doit refléter notre ton de voix et nos valeurs d'entreprise.",
      budget: "DT2,500",
      duration: "3 semaines",
      skills: ["Rédaction", "SEO", "Marketing de contenu"],
      client: "Corporate Solutions",
      clientRating: "4.5/5",
      posted: "Il y a 3 jours",
      background: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
      emoji: "✍️"
    },
    {
      id: 5,
      title: "Photographie produit pour boutique en ligne",
      description: "Session photo professionnelle pour 50 produits de notre nouvelle collection. Doit inclure édition et retouche des images.",
      budget: "DT1,800",
      duration: "2 semaines",
      skills: ["Photographie", "Retouche photo", "Lightroom"],
      client: "Boutique Chic",
      clientRating: "4.8/5",
      posted: "Hier",
      background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
      emoji: "📸"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lastDirection, setLastDirection] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwipe = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    setLastDirection(direction);
    const currentProject = projects[currentIndex];

    if (direction === 'up') {
      setSelectedProject(currentProject);
      setTimeout(() => setShowApplication(true), 300);
    } else {
      goToNextProject();
    }
  };

  const submitApplication = () => {
    setShowApplication(false);
    goToNextProject();
    alert(`Candidature envoyée pour ${selectedProject.title}`);
  };

  const cancelApplication = () => {
    setShowApplication(false);
    setLastDirection(null);
  };

  const goToNextProject = () => {
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
      setShowDetails(false);
      setLastDirection(null);
      setIsAnimating(false);
    }, 300);
  };

  const resetSwipes = () => {
    setCurrentIndex(0);
    setShowDetails(false);
    setLastDirection(null);
  };

  if (currentIndex >= projects.length) {
    return (
      <div className="end-screen">
        <h2>Vous avez parcouru tous les projets disponibles!</h2>
        <p>Revenez plus tard pour de nouvelles opportunités.</p>
        <button onClick={resetSwipes}>Voir à nouveau</button>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="swipe-container">
      <div 
        className={`project-card ${lastDirection ? `swipe-${lastDirection}` : ''}`}
        style={{ background: currentProject.background }}
      >
        <div className="card-emoji">{currentProject.emoji}</div>
        
        <div className={`card-overlay ${showDetails ? 'show-details' : ''}`}>
          <div className="card-header">
            <h2>{currentProject.title}</h2>
            <div className="meta-info">
              <span className="budget">{currentProject.budget}</span>
              <span className="duration">{currentProject.duration}</span>
            </div>
            <div className="client-info">
              <span className="client">{currentProject.client}</span>
              <span className="rating">
                <span className="stars">★★★★★</span>
                <span className="rating-text">{currentProject.clientRating}</span>
              </span>
              <span className="posted">{currentProject.posted}</span>
            </div>
          </div>
          
          <div className="card-details">
            <p>{currentProject.description}</p>
            <div className="skills-container">
              <h4>Compétences requises:</h4>
              <div className="skills-tags">
                {currentProject.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <button 
          className="details-toggle"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Voir moins ▲' : 'Voir plus ▼'}
        </button>
      </div>

      {showApplication && (
        <div className="application-popup">
          <div className="popup-content">
            <div className="popup-header">
              <h3>Postuler à {selectedProject?.title}</h3>
              <p className="popup-subtitle">
                <span>{selectedProject?.emoji}</span>
                <span>Budget: {selectedProject?.budget}</span>
                <span>•</span>
                <span>Durée: {selectedProject?.duration}</span>
              </p>
            </div>
            
            <div className="application-form">
              <div className="form-group">
                <label>Message de motivation</label>
                <textarea 
                  placeholder="Expliquez pourquoi vous êtes le meilleur candidat pour ce projet..."
                  rows="4"
                ></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Votre tarif (DT)</label>
                  <input type="number" placeholder="Ex: 2500" />
                </div>
                <div className="form-group">
                  <label>Délai estimé</label>
                  <input type="text" placeholder="Ex: 4 semaines" />
                </div>
              </div>
              
              <div className="file-upload">
                <label>Ajouter un portfolio (optionnel)</label>
                <div className="upload-area">
                  <span>📁 Glissez-déposez ou</span>
                  <button className="browse-btn">Parcourir</button>
                </div>
              </div>
            </div>
            
            <div className="popup-actions">
              <button className="cancel-btn" onClick={cancelApplication}>
                Annuler
              </button>
              <button className="submit-btn" onClick={submitApplication}>
                Envoyer la candidature
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="actions">
        <button 
          className="skip"
          onClick={() => handleSwipe('down')}
          disabled={isAnimating}
        >
          👎 Passer
        </button>
        <button 
          className="apply"
          onClick={() => handleSwipe('up')}
          disabled={isAnimating}
        >
          👍 Postuler
        </button>
      </div>
    </div>
  );
};

export default ProjectSwipe;
