import React from 'react';

const DashboardHome = () => {
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

  return (
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
  );
};

export default DashboardHome;
