import React, { useState } from 'react';
import './ProjetSwipe.css';


const ProjectSwipe = () => {
  const [projects] = useState([
    {
      id: 1,
      title: "Développement d'une application React Native",
      description: "Nous cherchons un développeur expérimenté pour créer une application mobile cross-platform avec React Native. Le projet inclut l'intégration avec une API REST existante.",
      budget: "€5,000 - €8,000",
      duration: "3-4 mois",
      skills: ["React Native", "JavaScript", "API Integration"],
      client: "Startup Tech",
      clientRating: "4.9/5",
      posted: "Il y a 2 jours"
    },
    {
      id: 2,
      title: "Refonte UI/UX pour site e-commerce",
      description: "Redesign complet de l'interface utilisateur et de l'expérience client pour notre plateforme e-commerce. Nous voulons moderniser le look tout en améliorant le taux de conversion.",
      budget: "€3,500",
      duration: "6 semaines",
      skills: ["UI Design", "UX Research", "Figma", "Prototypage"],
      client: "FashionCo",
      clientRating: "4.7/5",
      posted: "Il y a 1 semaine"
    },
    {
      id: 3,
      title: "Système de recommandation avec Machine Learning",
      description: "Développement d'un algorithme de recommandation personnalisé pour notre plateforme de contenu. Doit intégrer avec notre base de données existante et fournir des résultats en temps réel.",
      budget: "€10,000+",
      duration: "5-6 mois",
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
      client: "MediaTech",
      clientRating: "5/5",
      posted: "Aujourd'hui"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lastDirection, setLastDirection] = useState(null);

  const handleSwipe = (direction) => {
    setLastDirection(direction);
    const currentProject = projects[currentIndex];

    if (direction === 'up') {
      setSelectedProject(currentProject);
      setShowApplication(true);
    } else {
      goToNextProject();
    }
  };

  const submitApplication = () => {
    setShowApplication(false);
    goToNextProject();
    // Ici vous pourriez ajouter la logique pour envoyer la candidature
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
    }, 300);
  };

  const resetSwipes = () => {
    setCurrentIndex(0);
  };

  if (currentIndex >= projects.length) {
    return (
      <div className="end-screen">
        <h2>Vous avez parcouru tous les projets disponibles!</h2>
        <button onClick={resetSwipes}>Voir à nouveau</button>
      </div>
    );
  }

  const currentProject = projects[currentIndex];

  return (
    <div className="swipe-container">
      <div 
        className={`project-card ${lastDirection ? `swipe-${lastDirection}` : ''}`}
      >
        <div className={`card-overlay ${showDetails ? 'show-details' : ''}`}>
          <div className="card-header">
            <h2>{currentProject.title}</h2>
            <div className="meta-info">
              <span className="budget">{currentProject.budget}</span>
              <span className="duration">{currentProject.duration}</span>
            </div>
            <div className="client-info">
              <span className="client">{currentProject.client}</span>
              <span className="rating">{currentProject.clientRating}</span>
              <span className="posted">{currentProject.posted}</span>
            </div>
          </div>
          
          <div className="card-details">
            <p>{currentProject.description}</p>
            <div className="skills-container">
              <h4>Compétences requises:</h4>
              {currentProject.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          className="details-toggle"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Voir moins' : 'Voir plus'}
        </button>
      </div>

      {showApplication && (
        <div className="application-popup">
          <div className="popup-content">
            <h3>Postuler à {selectedProject?.title}</h3>
            <p>Budget: {selectedProject?.budget} • Durée: {selectedProject?.duration}</p>
            
            <div className="application-form">
              <textarea placeholder="Pourquoi êtes-vous le meilleur candidat pour ce projet?"></textarea>
              <input type="number" placeholder="Votre tarif (€)" />
              <input type="text" placeholder="Délai estimé (ex: 4 semaines)" />
            </div>
            
            <div className="popup-actions">
              <button className="cancel-btn" onClick={cancelApplication}>Annuler</button>
              <button className="submit-btn" onClick={submitApplication}>Envoyer</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="actions">
        <button className="skip" onClick={() => handleSwipe('down')}>Passer</button>
        <button className="apply" onClick={() => handleSwipe('up')}>Postuler ↑</button>
      </div>
    </div>
  );
};

export default ProjectSwipe;