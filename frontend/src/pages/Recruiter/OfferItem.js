import React from 'react';
import { Link } from 'react-router-dom';

const OfferItem = ({ offer }) => {
  const statusColor = {
    "Publiée": "green",
    "Brouillon": "gray",
    "Archivée": "red"
  };

  return (
    <div className="offer-item">
      <div className="offer-main-info">
        <h3>
          <Link to={`/recruiter/offers/${offer.id}`}>{offer.title}</Link>
        </h3>
        <div className="offer-meta">
          <span>{offer.type}</span>
          <span>{offer.location}</span>
          <span>{offer.salary}</span>
          <span style={{ color: statusColor[offer.status] }}>
            {offer.status}
          </span>
        </div>
        <p className="offer-description">{offer.description}</p>
      </div>
      
      <div className="offer-secondary-info">
        <div className="candidates-count">
          <span>{offer.candidates}</span>
          <small>candidats</small>
        </div>
        <div className="offer-date">
          Publiée le {offer.date}
        </div>
        <div className="offer-actions">
          <button className="btn">Voir candidatures</button>
          <button className="btn">Modifier</button>
        </div>
      </div>
    </div>
  );
};

export default OfferItem;