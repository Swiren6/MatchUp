import React, { useState } from 'react';
import './FreelancerSwipe.css';

const FreelancerSwipe = () => {
  const [freelancers] = useState([
    {
      id: 1,
      name: "Alex Dubois",
      title: "Développeur React Senior",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
      bio: "Développeur Fullstack avec 5 ans d'expérience en React et Node.js. Passionné par les interfaces utilisateur intuitives.",
      skills: ["React", "TypeScript", "Redux", "Node.js"],
      rate: "€700/jour",
      location: "Paris, France"
    },
    {
      id: 2,
      name: "Sophie Lambert",
      title: "UX/UI Designer",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop",
      bio: "Designer avec une spécialisation en expérience utilisateur. J'aide les startups à créer des produits digitaux mémorables.",
      skills: ["Figma", "Prototypage", "User Research", "UI Animation"],
      rate: "€550/jour",
      location: "Lyon, France"
    },
    {
      id: 3,
      name: "Thomas Martin",
      title: "Data Scientist",
      photo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=500&auto=format&fit=crop",
      bio: "Expert en machine learning et analyse de données. Je transforme les données en insights actionnables.",
      skills: ["Python", "TensorFlow", "SQL", "Data Visualization"],
      rate: "€800/jour",
      location: "Remote"
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