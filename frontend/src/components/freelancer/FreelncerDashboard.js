import React, { useState, useEffect, useRef } from 'react';
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

  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotMessages, setChatbotMessages] = useState([
    { text: "Bonjour ! Je suis votre assistant recrutement. Comment puis-je vous aider ?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

const chatbotResponses = {
  "statistiques": {
    text: "Voici vos statistiques actuelles :\n- Projets postés : 12\n- Candidatures envoyées : 8\n- Projets remportés : 5\n- Taux de réponse des clients : 75%",
    suggestions: ["Voir mes projets", "Conseils profil"]
  },
  "offres": {
    text: "Offres disponibles :\n1. Création de site e-commerce\n2. Développement mobile Flutter\n3. Design UX pour une application SaaS",
    suggestions: ["Postuler à une offre", "Filtrer par compétences"]
  },
  "candidatures": {
    text: "Voici vos candidatures récentes :\n- Site e-commerce (en attente)\n- UX Design (rejetée)\n- Application mobile (entretien prévu)",
    suggestions: ["Modifier ma candidature", "Contacter client"]
  },
  "profil": {
    text: "Pour améliorer votre profil, assurez-vous d’avoir :\n✔️ Une photo pro\n✔️ Un portfolio à jour\n✔️ Des évaluations clients\n✔️ Une description claire",
    suggestions: ["Mettre à jour mon profil", "Voir exemples"]
  },
  "aide": {
    text: "Je peux vous aider à :\n- Consulter les offres\n- Suivre vos candidatures\n- Améliorer votre profil\n- Comprendre vos statistiques\n\nEssayez : 'offres', 'candidatures' ou 'profil'",
    suggestions: ["offres", "candidatures", "profil"]
  },
  "default": {
    text: "De quoi avez-vous besoin aujourd’hui ?",
    suggestions: ["offres", "candidatures", "statistiques", "profil"]
  }
};


  useEffect(() => {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatbotMessages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { text: inputValue, sender: "user" };
    setChatbotMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const lowerMessage = inputValue.toLowerCase();
    let response = chatbotResponses.default;

    Object.keys(chatbotResponses).forEach(key => {
      if (lowerMessage.includes(key)) {
        response = chatbotResponses[key];
      }
    });

    setTimeout(() => {
      const botMessage = {
        text: response.text,
        sender: "bot",
        suggestions: response.suggestions
      };
      setChatbotMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 300);
  };

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

        <section className="offers-section">
          <div className="section-header">
            <h2>Découvrir les offres récentes</h2>
            <button className="see-all-btn" onClick={() => navigate('/freelancer/offers')}>
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
                    <div className="detail-item"><FiDollarSign /> <span>{offer.budget}</span></div>
                    <div className="detail-item"><FiClock /> <span>{offer.duration}</span></div>
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

        <section className="recommended-section">
          <h2>Projets recommandés pour vous</h2>
          <div className="recommended-cards">
            <div className="recommended-card">
              <h3>Intégration Figma to React</h3>
              <p>Conversion de maquettes Figma en composants React responsive</p>
              <div className="card-footer">
                <span className="budget">1500DT</span>
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

      {/* Chatbot Toggle */}
      <div 
        className={`chatbot-toggle ${showChatbot ? 'active' : ''}`}
        onClick={() => setShowChatbot(!showChatbot)}
        title="Assistant Recrutement"
      >
        {showChatbot ? '✕' : '💬'}
      </div>

      {showChatbot && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Assistant Recrutement</h4>
            <div className="chatbot-status"></div>
          </div>

          <div className="chatbot-messages">
            {chatbotMessages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
                {msg.suggestions && msg.sender === 'bot' && (
                  <div className="chatbot-suggestions">
                    {msg.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        className="suggestion-btn"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Posez votre question..."
            />
            <button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <svg className="send-icon" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerDashboard;
