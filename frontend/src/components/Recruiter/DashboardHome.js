import React, { useState, useRef, useEffect } from 'react';
import './DashboardHome.css';

const DashboardHome = () => {
  // Données existantes
  const stats = [
    { id: 1, title: "Offres actives", value: 8, change: "+3 cette semaine", icon: "📢" },
    { id: 2, title: "Candidatures", value: 5, change: "+2 aujourd'hui", icon: "📄" },
    { id: 3, title: "Entretiens", value: 4, change: "2 demain", icon: "🗓️" },
    { id: 4, title: "Taux de conversion", value: "38%", change: "+6%", icon: "📈" }
  ];

  const activities = [
    { id: 1, type: "new", text: "Nouvelle candidature pour Développeur Frontend", time: "Il y a 2h" },
    { id: 2, type: "interview", text: "Entretien avec Marie Dupont à 14h", time: "Aujourd'hui" },
    { id: 3, type: "offer", text: "Nouvelle offre publiée: UX Designer", time: "Hier" },
    { id: 4, type: "new", text: "Candidature reçue pour Data Analyst", time: "Il y a 5h" }
  ];

  const messages = [
    { id: 1, sender: "Jean Martin", subject: "Demande d'information sur l'offre UI/UX", time: "Il y a 1h" },
    { id: 2, sender: "Fatima Ben Ali", subject: "Relance candidature Backend", time: "Hier" },
    { id: 3, sender: "HR Team", subject: "Planification des entretiens de la semaine", time: "Il y a 3 jours" }
  ];

  // État et logique du chatbot
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatbotMessages, setChatbotMessages] = useState([
    { text: "Bonjour ! Je suis votre assistant recrutement. Comment puis-je vous aider ?", sender: "bot" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const chatbotResponses = {
    "statistiques": {
      text: "Statistiques actuelles :\n- Offres actives: 8 (+3)\n- Candidatures: 5\n- Entretiens: 4\n- Taux de conversion: 38%",
      suggestions: ["Détails offres", "Détails candidatures"]
    },
    "offres": {
      text: "Offres disponibles :\n1. Développeur Frontend (3 candidats)\n2. UX Designer (1 candidat)\n3. Data Analyst (1 candidat)",
      suggestions: ["Publier offre", "Modifier offres"]
    },
    "candidatures": {
      text: "Candidatures récentes :\n- 2 Développeurs Fullstack\n- 1 UX Designer\n- 2 Data Analysts\n\n3 nécessitent votre revue.",
      suggestions: ["Voir candidatures", "Planifier entretiens"]
    },
    "aide": {
      text: "Je peux vous aider avec :\n- Statistiques\n- Gestion des offres\n- Suivi des candidatures\n- Rappels d'entretiens\n\nEssayez : 'statistiques', 'offres' ou 'candidatures'",
      suggestions: ["statistiques", "offres", "candidatures"]
    },
    "default": {
      text: "Je n'ai pas compris. Voici ce que je peux faire :",
      suggestions: ["statistiques", "offres", "aide"]
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatbotMessages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Ajouter le message utilisateur
    const userMessage = { text: inputValue, sender: "user" };
    setChatbotMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Trouver la réponse appropriée
    const lowerMessage = inputValue.toLowerCase();
    let response = chatbotResponses.default;
    
    Object.keys(chatbotResponses).forEach(key => {
      if (lowerMessage.includes(key)) {
        response = chatbotResponses[key];
      }
    });

    // Réponse du bot avec délai
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
      <div className="dashboard-section">
        <div className="section-header">
          <h2>Tableau de bord</h2>
          <p>Bienvenue dans votre espace de gestion</p>
        </div>

        {/* Statistiques */}
        <div className="stats-grid">
          {stats.map(stat => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <h3>{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-change">{stat.change}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Activités récentes */}
        <div className="dashboard-section">
          <h3>Activités récentes</h3>
          <div className="activities-list">
            {activities.map(activity => (
              <div key={activity.id} className={`activity-item ${activity.type}`}>
                <div className="activity-icon">
                  {activity.type === 'new' && '📨'}
                  {activity.type === 'interview' && '🗣️'}
                  {activity.type === 'offer' && '📢'}
                </div>
                <div className="activity-content">
                  <p>{activity.text}</p>
                  <small>{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Messages récents */}
        <div className="dashboard-section">
          <h3>Messages récents</h3>
          <ul className="messages-list">
            {messages.map(msg => (
              <li key={msg.id} className="message-item">
                <strong>{msg.sender}</strong>
                <span>{msg.subject}</span>
                <div className="message-time">{msg.time}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Performance hebdomadaire */}
        <div className="dashboard-section">
          <h3>Performance hebdomadaire</h3>
          <div className="comparison-table">
            <table>
              <thead>
                <tr>
                  <th>Métrique</th>
                  <th>Cette semaine</th>
                  <th>Semaine dernière</th>
                  <th>Évolution</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Candidatures</td>
                  <td>39</td>
                  <td>34</td>
                  <td className="positive">+15%</td>
                </tr>
                <tr>
                  <td>Entretiens</td>
                  <td>6</td>
                  <td>4</td>
                  <td className="positive">+50%</td>
                </tr>
                <tr>
                  <td>Offres publiées</td>
                  <td>3</td>
                  <td>5</td>
                  <td className="negative">-40%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Chatbot Integration */}
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
              <React.Fragment key={index}>
                <div className={`chatbot-message ${msg.sender}`}>
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
              </React.Fragment>
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
            <button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <svg className="send-icon" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;