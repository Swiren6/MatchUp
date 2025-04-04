import React, { useState, useRef, useEffect } from 'react';
import './AdvancedSwipe.css';

// Données par défaut si aucune n'est passée en props
const defaultProfiles = [
    {
        id: 1,
        name: 'Richard Hendricks',
        photo: '/images/richard.jpg',
        skills: ['CEO', 'Compression','public speaking']
      },
      {
        id: 2,
        name: 'Erlich Bachman',
        photo: '/images/erlich.jpg',
        skills: ['Marketing', 'Investissement']
      },
      {
        id: 3,
        name: 'Monica Hall',
        photo: '/images/monica.jpg'
      },
      {
        id: 4,
        name: 'Jared Dunn',
        photo: '/images/jared.jpg'
      },
      {
        id: 5,
        name: 'Dinesh Chugtai',
        photo: '/images/dinesh.jpg'
      }
];

const AdvancedSwipe = ({ profiles = defaultProfiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const cardRef = useRef(null);

  // Vérification que profiles existe et est un array
  if (!profiles || !Array.isArray(profiles)) {
    profiles = defaultProfiles;
  }

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    
    // Animation avant de changer de profil
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
      setSwipeDirection(null);
    }, 300);
  };

  // Gestion des erreurs d'image
  const handleImageError = (e) => {
    e.target.src = '/default-profile.png';
  };

  // Vérification que currentIndex est valide
  useEffect(() => {
    if (currentIndex >= profiles.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, profiles.length]);

  if (profiles.length === 0) {
    return (
      <div className="no-profiles">
        <p>Aucun profil à afficher</p>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="advanced-swipe-container">
      <h1>MatchUp Swipe</h1>
      
      <div 
        ref={cardRef}
        className={`profile-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
      >
        <img 
          src={currentProfile.photo} 
          alt={currentProfile.name}
          onError={handleImageError}
        />
        <div className="profile-info">
          <h3>{currentProfile.name}</h3>
          <div className="skills">
            {currentProfile.skills?.map((skill, index) => (
              <span key={index} className="skill-badge">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="swipe-buttons">
        <button 
          onClick={() => handleSwipe('left')} 
          className="swipe-button left"
        >
          ✖ Passer
        </button>
        <button 
          onClick={() => handleSwipe('right')} 
          className="swipe-button right"
        >
          ✔ Like
        </button>
      </div>

      {swipeDirection && (
        <div className="swipe-feedback">
          Vous avez swipé {swipeDirection === 'right' ? 'Like' : 'Pass'}
        </div>
      )}
    </div>
  );
};

export default AdvancedSwipe;