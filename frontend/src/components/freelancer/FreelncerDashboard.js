import React, { useState, useEffect } from 'react';
import { FiBell, FiSearch, FiBriefcase, FiDollarSign, FiStar, FiClock } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import './Dashboard.css';

const FreelancerDashboard = () => {
    const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "Sirine Abdelkhalek",
    profession: "Développeur Full-Stack",
    rating: 4.9,
    completedProjects: 42
  });
  
  const [recentOffers, setRecentOffers] = useState([]);
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulation de chargement de données
    const fetchData = async () => {
      try {
        setTimeout(() => {
          setRecentOffers([
            {
              id: 1,
              title: "Développement d'application React Native",
              client: "Startup Tech",
              budget: "2500DT",
              duration: "3 semaines",
              skills: ["React Native", "Firebase", "API REST"],
              status: "new"
            },
            {
              id: 2,
              title: "Refonte de site WordPress",
              client: "Agence Marketing",
              budget: "1200DT",
              duration: "2 semaines",
              skills: ["WordPress", "Elementor", "SEO"],
              status: "new"
            },
            {
              id: 3,
              title: "Création de logo et identité visuelle",
              client: "Restaurant Le Gourmet",
              budget: "800DT",
              duration: "10 jours",
              skills: ["Illustrator", "Branding", "Design"],
              status: "pending"
            }
          ]);

          setStats({
            profileViews: 128,
            proposalsSent: 15,
            earnings: "8,750DT",
            responseRate: "92%"
          });

          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error("Erreur de chargement", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Rechercher des projets..." />
        </div>
        <div className="header-actions">
          <button className="notification-btn">
            <FiBell />
            <span className="notification-badge">3</span>
          </button>
          <div className="user-avatar">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-content">
            <h1>Bonjour, {user.name} 👋</h1>
            <p className="welcome-subtitle">{user.profession} | <FiStar className="star-icon" /> {user.rating} ({user.completedProjects} projets)</p>
            <p className="welcome-message">Découvrez les nouvelles offres qui correspondent à vos compétences et boostez votre activité !</p>
          </div>
          <div className="quick-stats">
            <div className="stat-card">
              <FiBriefcase className="stat-icon" />
              <div>
                <h3>{stats.profileViews || '--'}</h3>
                <p>Vues de profil</p>
              </div>
            </div>
            <div className="stat-card">
              <FiDollarSign className="stat-icon" />
              <div>
                <h3>{stats.earnings || '--'}</h3>
                <p>Gains ce mois</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Offers Section */}
        <section className="offers-section">
          <div className="section-header">
            <h2>Découvrir les offres récentes</h2>
            <button 
          className="see-all-btn"
          onClick={() => navigate('/freelancer/offers')} // Navigation vers la page des offres
        >
          Voir tout
        </button>
          </div>

          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Chargement des offres...</p>
            </div>
          ) : (
            <div className="offers-grid">
              {recentOffers.map(offer => (
                <div key={offer.id} className={`offer-card ${offer.status}`}>
                  <div className="offer-header">
                    <h3>{offer.title}</h3>
                    <span className="offer-status">{offer.status === 'new' ? 'Nouveau' : 'En attente'}</span>
                  </div>
                  <p className="offer-client">{offer.client}</p>
                  <div className="offer-details">
                    <div className="detail-item">
                      <FiDollarSign />
                      <span>{offer.budget}</span>
                    </div>
                    <div className="detail-item">
                      <FiClock />
                      <span>{offer.duration}</span>
                    </div>
                  </div>
                  <div className="offer-skills">
                    {offer.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <div className="offer-actions">
                    <button className="primary-btn">Postuler</button>
                    
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recommended Projects */}
        <section className="recommended-section">
          <h2>Projets recommandés pour vous</h2>
          <div className="recommended-cards">
            <div className="recommended-card">
              <h3>Intégration Figma to React</h3>
              <p>Conversion de maquettes Figma en composants React responsive</p>
              <div className="card-footer">
                <span className="budget">1500DTDT</span>
                <span className="match">95% match</span>
              </div>
            </div>
            <div className="recommended-card">
              <h3>API Node.js avec MongoDB</h3>
              <p>Développement d'API REST avec authentification JWT</p>
              <div className="card-footer">
                <span className="budget">2200DT</span>
                <span className="match">88% match</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FreelancerDashboard;