import React, { useState } from 'react';
import './FreelancerSwipe.css';

const FreelancerSwipe = () => {
  const [freelancers] = useState([
    {
      id: 1,

      name: "Salem Ben salem",

      name: "Salem BenSalem",

      title: "Développeur React Senior",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
      bio: "Développeur Fullstack avec 5 ans d'expérience en React et Node.js. Passionnée par les interfaces utilisateur intuitives.",
      skills: ["React", "TypeScript", "Redux", "Node.js"],
      rate: "DT700/jour",

      location: "Tunis, Tunisie"
    },
    {
      id: 2,
      name: "sara ben Ahmed",

      location: "Tunis, Tunis"
    },
    {
      id: 2,
      name: "Safa Mathlouthi",

      title: "UX/UI Designer",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop",
      bio: "Designer avec une spécialisation en expérience utilisateur. J'aide les startups à créer des produits digitaux mémorables.",
      skills: ["Figma", "Prototypage", "User Research", "UI Animation"],

      rate: "DT550/jour",
      location: "Nabeul, Tunisie"
    },
    {
      id: 3,
      name: "Yassine Gharbi",

      rate: "DT 550/jour",
      location: "Tunis, Tunis"
    },
    {
      id: 3,
      name: "Sara BenAhmed",

      title: "Data Scientist",
      photo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=500&auto=format&fit=crop",
      bio: "Expert en machine learning et analyse de données. Je transforme les données en insights actionnables.",
      skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
      rate: "DT800/jour",
      location: "Remote"
    },
    {
      id: 4,
      name: "Inès Baccar",
      title: "Développeuse Mobile Flutter",
      photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop",
      bio: "Spécialiste en développement d'applications mobiles cross-platform. Forte expérience sur Flutter et Firebase.",
      skills: ["Flutter", "Dart", "Firebase", "UX mobile"],
      rate: "DT600/jour",
      location: "Sfax, Tunisie"
    },
    {
      id: 5,
      name: "Mehdi Zouari",
      title: "Ingénieur DevOps",
      photo: "https://images.unsplash.com/photo-1603415526960-f7e0328f2447?w=500&auto=format&fit=crop",
      bio: "J'automatise les déploiements et gère les infrastructures cloud. Expert CI/CD et monitoring.",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
      rate: "DT750/jour",
      location: "Sousse, Tunisie"
    },
    {
      id: 6,
      name: "Amira Krifa",
      title: "Spécialiste Marketing Digital",
      photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop",
      bio: "Experte en stratégie marketing, publicité en ligne et SEO. J'aide les entreprises à se démarquer sur le web.",
      skills: ["SEO", "Google Ads", "Content Strategy", "Social Media"],
      rate: "DT500/jour",
      location: "Ariana, Tunisie"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBio, setShowBio] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [lastDirection, setLastDirection] = useState(null);

  const handleSwipe = (direction) => {
    setLastDirection(direction);
    const currentFreelancer = freelancers[currentIndex];

    if (direction === 'right') {
      setSelectedFreelancer(currentFreelancer);
      setShowPopup(true);
    } else {
      goToNextFreelancer();
    }
  };

  const confirmMatch = () => {
    setShowPopup(false);
    goToNextFreelancer();
  };

  const cancelMatch = () => {
    setShowPopup(false);
    setLastDirection(null);
  };

  const goToNextFreelancer = () => {
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % freelancers.length);
      setShowBio(false);
      setLastDirection(null);
    }, 300);
  };

  const resetSwipes = () => {
    setCurrentIndex(0);
  };

  if (currentIndex >= freelancers.length) {
    return (
      <div className="end-screen">
        <h2>Vous avez parcouru tous les profils!</h2>
        <button onClick={resetSwipes}>Recommencer</button>
      </div>
    );
  }

  const currentFreelancer = freelancers[currentIndex];

  return (
    <div className="swipe-container">
      <div 
        className={`freelancer-card ${lastDirection ? `swipe-${lastDirection}` : ''}`}
        style={{ backgroundImage: `url(${currentFreelancer.photo})` }}
      >
        <div className={`card-overlay ${showBio ? 'show-bio' : ''}`}>
          <div className="card-header">
            <h2>{currentFreelancer.name}</h2>
            <h3>{currentFreelancer.title}</h3>
            <div className="meta-info">
              <span className="rate">{currentFreelancer.rate}</span>
              <span className="location">{currentFreelancer.location}</span>
            </div>
          </div>
          
          <div className="card-bio">
            <p>{currentFreelancer.bio}</p>
            <div className="skills-container">
              {currentFreelancer.skills.map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          className="bio-toggle"
          onClick={() => setShowBio(!showBio)}
        >
          {showBio ? 'Voir photo' : 'Voir profil'}
        </button>
      </div>

      {showPopup && (
        <div className="match-popup">
          <div className="popup-content">
            <h3>Match avec {selectedFreelancer?.name}!</h3>
            <p>{selectedFreelancer?.title} • {selectedFreelancer?.rate}</p>
            <div className="popup-actions">
              <button className="cancel-btn" onClick={cancelMatch}>Annuler</button>
              <button className="confirm-btn" onClick={confirmMatch}>Confirmer</button>
            </div>
          </div>
        </div>
      )}
      
      <div className="actions">
        <button className="reject" onClick={() => handleSwipe('left')}>✖</button>
        <button className="accept" onClick={() => handleSwipe('right')}>✓</button>
      </div>
    </div>
  );
};

export default FreelancerSwipe;
