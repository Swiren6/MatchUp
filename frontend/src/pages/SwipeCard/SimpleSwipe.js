import React, { useState } from 'react';
import './SimpleSwipe.css';

const profiles = [
  {
    id: 1,
    name: 'Richard Hendricks',
    photo: '/images/richard.jpg',
    skills: ['CEO', 'Compression', 'public speaking']
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
    photo: '/images/monica.jpg',
    skills: [] // Ajout d'un tableau vide pour éviter undefined
  },
  {
    id: 4,
    name: 'Jared Dunn',
    photo: '/images/jared.jpg',
    skills: [] // Ajout d'un tableau vide pour éviter undefined
  },
  {
    id: 5,
    name: 'Dinesh Chugtai',
    photo: '/images/dinesh.jpg',
    skills: [] // Ajout d'un tableau vide pour éviter undefined
  }
];

const SimpleSwipe = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    if (Math.abs(diff) > 50) {
      setSwipeDirection(diff > 0 ? 'right' : 'left');
    }
  };

  const handleTouchEnd = () => {
    if (swipeDirection) {
      handleSwipe(swipeDirection);
      setSwipeDirection(null);
    }
  };

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction}`);
    setSwipeDirection(direction);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
      setSwipeDirection(null);
    }, 300);
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="simple-swipe-container">
      <h1>MatchUp Swipe</h1>
      
      <div 
        className={`profile-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={currentProfile.photo} 
          alt={currentProfile.name}
          onError={(e) => { e.target.src = '/default-profile.png' }}
        />
        <div className="profile-info">
          <h3>{currentProfile.name}</h3>
          {currentProfile.skills && currentProfile.skills.length > 0 && (
            <div className="skills">
              {currentProfile.skills.map((skill, index) => (
                <span key={`${skill}-${index}`} className="skill-badge">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="swipe-buttons">
        <button onClick={() => handleSwipe('left')} className="swipe-button left">
          ✖ Passer
        </button>
        <button onClick={() => handleSwipe('right')} className="swipe-button right">
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

export default SimpleSwipe;