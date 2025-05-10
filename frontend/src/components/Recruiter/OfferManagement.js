import React, { useState } from 'react';

const OfferManagement = () => {
  const [offers, setOffers] = useState([
    { id: 1, title: "Développeur Frontend", date: "2023-05-15" },
    { id: 2, title: "Designer UX", date: "2023-05-10" }
  ]);

  return (
    <section className="dashboard-section">
      <div className="section-header">
        <h2>Mes offres d'emploi</h2>
        <button className="add-button">
          + Créer une offre
        </button>
      </div>

      <div className="offers-list">
        {offers.map(offer => (
          <div key={offer.id} className="offer-card">
            <h3>{offer.title}</h3>
            <p>Publiée le {offer.date}</p>
            <div className="offer-actions">
              <button>Voir candidatures</button>
              <button>Modifier</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfferManagement;