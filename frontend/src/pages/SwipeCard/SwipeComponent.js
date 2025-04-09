import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import './SwipeComponent.css';

const defaultProfiles = [
  {
    id: 1,
    name: 'Richard Hendricks',
    photo: '/images/richard.jpg',
    skills: ['CEO', 'Compression', 'Public speaking']
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
    skills: ['Business Development']
  },
  {
    id: 4,
    name: 'Jared Dunn',
    photo: '/images/jared.jpg',
    skills: ['Operations', 'Management']
  },
  {
    id: 5,
    name: 'Dinesh Chugtai',
    photo: '/images/dinesh.jpg',
    skills: ['Programming', 'Engineering']
  }
];

const SwipeComponent = ({ profiles = defaultProfiles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [swipedProfiles, setSwipedProfiles] = useState([]);
  const cardRef = useRef(null);

  const handleSwipe = (dir) => {
    setDirection(dir);
    const swipedProfile = profiles[currentIndex];
    
    // Save the swiped profile with the direction
    setSwipedProfiles([...swipedProfiles, { ...swipedProfile, direction }]);
    
    // Move to next profile
    setCurrentIndex((prev) => (prev + 1) % profiles.length);
  };

  const handleUndo = () => {
    if (swipedProfiles.length > 0) {
      const lastSwiped = swipedProfiles[swipedProfiles.length - 1];
      setSwipedProfiles(swipedProfiles.slice(0, -1));
      setCurrentIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
    preventDefaultTouchmoveEvent: true
  });

  const variants = {
    enter: (direction) => ({
      x: direction === 'right' ? 500 : -500,
      opacity: 0,
      rotate: direction === 'right' ? 15 : -15
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0
    },
    exit: (direction) => ({
      x: direction === 'right' ? -500 : 500,
      opacity: 0,
      rotate: direction === 'right' ? 15 : -15
    })
  };

  const handleImageError = (e) => {
    e.target.src = '/default-profile.png';
  };

  if (!profiles || profiles.length === 0) {
    return (
      <div className="no-profiles">
        <p>Aucun profil à afficher</p>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="swipe-container">
      <h1>MatchUp Swipe</h1>
      
      <div className="card-stack">
        <AnimatePresence custom={direction}>
          {currentIndex < profiles.length && (
            <motion.div
              key={currentProfile.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              {...swipeHandlers}
              ref={cardRef}
              className="profile-card"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000) {
                  handleSwipe('left');
                } else if (swipe > 10000) {
                  handleSwipe('right');
                }
              }}
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
              
              {direction === 'right' && (
                <div className="like-overlay">LIKE</div>
              )}
              {direction === 'left' && (
                <div className="nope-overlay">NOPE</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="swipe-buttons">
        <button 
          onClick={() => handleSwipe('left')} 
          className="swipe-button left"
        >
          ✖ Passer
        </button>
        <button 
          onClick={handleUndo}
          className="swipe-button undo"
          disabled={swipedProfiles.length === 0}
        >
          ↺ Undo
        </button>
        <button 
          onClick={() => handleSwipe('right')} 
          className="swipe-button right"
        >
          ✔ Like
        </button>
      </div>

      <div className="progress">
        {currentIndex + 1} / {profiles.length}
      </div>
    </div>
  );
};

export default SwipeComponent;
