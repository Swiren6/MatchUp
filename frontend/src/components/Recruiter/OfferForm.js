import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';

const OfferForm = ({ onClose, onSave }) => {
  const [offer, setOffer] = useState({
    title: '',
    description: '',
    location: '',
    budget: '',
    skills: '',
    status: 'Brouillon'
  });

  // Animation du titre (ne s'exécute qu'une fois au montage)
  const [animatedTitle, setAnimatedTitle] = useState('');
  const fullTitle = "Nouvelle Offre d'Emploi";
  
  useEffect(() => {
    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullTitle.length) {
        setAnimatedTitle(prev => prev + fullTitle.charAt(i));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, 50);
    
    return () => clearInterval(typingEffect);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...offer,
      skills: offer.skills.split(',').map(skill => skill.trim())
    });
  };

  // Composant WordReveal modifié pour ne pas se réinitialiser
  const WordReveal = ({ children }) => {
    const [visible] = useState(true); // Toujours visible après le premier rendu
    
    return (
      <span style={{
        opacity: 1,
        transform: 'translateY(0)',
        display: 'inline-block'
      }}>
        {children}
      </span>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {animatedTitle}
            {animatedTitle.length < fullTitle.length && (
              <span className="typing-cursor">|</span>
            )}
          </h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Fermer"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              <WordReveal>Titre</WordReveal>
            </label>
            <input 
              type="text"
              value={offer.title}
              onChange={(e) => setOffer({...offer, title: e.target.value})}
              required
              placeholder="Ex: Développeur React Senior"
              className="form-input" // Changé de input-animate à form-input
            />
          </div>

          <div className="form-group">
            <label>
              <WordReveal>Description</WordReveal>
            </label>
            <textarea
              value={offer.description}
              onChange={(e) => setOffer({...offer, description: e.target.value})}
              rows={5}
              required
              placeholder="Décrivez en détail l'offre..."
              className="form-input" // Changé de input-animate à form-input
            />
            <div className="char-count">
              {offer.description.length}/500 caractères
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <WordReveal>Lieu</WordReveal>
              </label>
              <input 
                type="text"
                value={offer.location}
                onChange={(e) => setOffer({...offer, location: e.target.value})}
                placeholder="Ex: Paris, Remote"
                className="form-input" // Changé de input-animate à form-input
              />
            </div>

            <div className="form-group">
              <label>
                <WordReveal>Budget</WordReveal>
              </label>
              <div className="input-with-symbol">
                <input 
                  type="text"
                  value={offer.budget}
                  onChange={(e) => setOffer({...offer, budget: e.target.value})}
                  placeholder="Ex: 3000-4000" 
                  className="form-input" // Changé de input-animate à form-input
                />
                <span className="input-symbol">DT</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              <WordReveal>Compétences requises</WordReveal>
              <span className="hint">(séparées par des virgules)</span>
            </label>
            <input 
              type="text"
              value={offer.skills}
              onChange={(e) => setOffer({...offer, skills: e.target.value})}
              placeholder="Ex: React, Node.js, TypeScript"
              className="form-input" // Changé de input-animate à form-input
            />
            <div className="skills-preview">
              {offer.skills.split(',').filter(Boolean).map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              <WordReveal>Statut</WordReveal>
            </label>
            <div className="status-selector">
              {['Brouillon', 'Publiée', 'Clôturée'].map((status) => (
                <label key={status} className={`status-option ${offer.status === status ? 'active' : ''}`}>
                  <input
                    type="radio"
                    value={status}
                    checked={offer.status === status}
                    onChange={() => setOffer({...offer, status})}
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onClose}
            >
              Annuler
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!offer.title || !offer.description}
            >
              {offer.status === 'Brouillon' ? 'Enregistrer' : 'Publier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OfferForm;