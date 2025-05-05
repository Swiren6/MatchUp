import React, { useState } from 'react';

const ApplicationItem = ({ application, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const statusOptions = ["Nouvelle", "En revue", "Entretien", "Rejetée", "Embauchée"];

  return (
    <div className={`application-item ${application.status.toLowerCase().replace(' ', '-')}`}>
      <div 
        className="application-summary"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="candidate-info">
          <h3>{application.candidate.name}</h3>
          <p>{application.offer}</p>
          <p>Postulé le {application.date}</p>
        </div>
        
        <div className="application-status">
          <select
            value={application.status}
            onChange={(e) => onStatusChange(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={i < application.rating ? "filled" : ""}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="application-details">
          <div className="contact-info">
            <p><strong>Email :</strong> {application.candidate.email}</p>
            <p><strong>Téléphone :</strong> {application.candidate.phone}</p>
            <p>
              <strong>CV :</strong> 
              <a href={`/uploads/${application.candidate.resume}`} target="_blank" rel="noopener noreferrer">
                Télécharger
              </a>
            </p>
          </div>
          
          <div className="notes">
            <h4>Notes :</h4>
            <p>{application.notes || "Aucune note pour le moment"}</p>
          </div>
          
          <div className="actions">
            <button className="btn">Planifier entretien</button>
            <button className="btn">Envoyer message</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationItem;