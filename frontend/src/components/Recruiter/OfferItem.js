import React from 'react';
import { motion } from 'framer-motion';

const OfferItem = ({ offer }) => {
  return (
    <motion.div 
      className={`offer-card ${offer.urgency}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div className="offer-header">
        <div className="offer-title-wrapper">
          <h3>{offer.title}</h3>
          <span className={`offer-status ${offer.status}`}>
            {offer.status === 'published' ? 'Publiée' : 
             offer.status === 'draft' ? 'Brouillon' : 'Archivée'}
          </span>
        </div>
        <div className="offer-meta">
          <span className="offer-type">{offer.type}</span>
          <span className="offer-location">
            {offer.remote ? '🌍 Remote' : `📍 ${offer.location}`}
          </span>
          <span className="offer-salary">{offer.salary}</span>
        </div>
      </div>

      {/* Section Description améliorée */}
      <div className="offer-description">
        <h4>Description du poste :</h4>
        <div className="description-content">
          {offer.description.split('\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Section Compétences */}
      {offer.skills && offer.skills.length > 0 && (
        <div className="offer-skills">
          <h4>Compétences requises :</h4>
          <div className="skills-list">
            {offer.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="offer-footer">
        <div className="offer-date">
          <span>🕒 {offer.date}</span>
          <span>👥 {offer.candidates} candidat{offer.candidates !== 1 ? 's' : ''}</span>
        </div>
        <div className="offer-actions">
          <button className="btn-small">Voir</button>
          <button className="btn-small primary">Modifier</button>
        </div>
      </div>
    </motion.div>
  );
};

export default OfferItem;