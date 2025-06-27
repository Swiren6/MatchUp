import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const managementSections = [
    {
      title: "Gestion des Freelances",
      description: "Accédez à la liste complète des freelances, modifiez leurs profils et vérifiez leurs compétences.",
      icon: "👨‍💻",
      action: "utilisateurs",
      color: "indigo"
    },
    {
      title: "Gestion des Recruteurs",
      description: "Administrez les comptes recruteurs, leurs entreprises et leurs abonnements.",
      icon: "👔",
      action: "recruiters",
      color: "blue"
    },
    {
      title: "Gestion des Offres",
      description: "Publiez, modérez et archivez les offres d'emploi sur la plateforme.",
      icon: "📋",
      action: "offres",
      color: "green"
    },
    {
      title: "Analytiques",
      description: "Consultez les statistiques et performances de la plateforme.",
      icon: "📊",
      action: "analytics",
      color: "purple"
    }
  ];

  

  const recentActivities = [
    { type: "offer", title: "Nouvelle offre créée", description: "Offre pour Développeur React chez TechCorp", time: "10 min ago" },
    { type: "user", title: "Nouveau freelance inscrit", description: "Jean Dupont - Développeur Fullstack", time: "1h ago" },
    { type: "payment", title: "Paiement reçu", description: "Abonnement premium de RecruteCo", time: "3h ago" }
  ];

  const handleNavigation = (path) => {
    navigate(`/admin/${path}`);
  };

  const getActivityIcon = (type) => {
    switch(type) {
      case "offer": return "📢";
      case "user": return "👤";
      case "payment": return "💳";
      default: return "ℹ️";
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Tableau de Bord Admin</h1>
          <p>Gestion complète de la plateforme</p>
        </div>
        <div className="header-actions">
          <button className="notification-btn">
            <span>🔔</span>
          </button>
          <div className="user-profile">
            <span className="profile-avatar">AD</span>
            <span>Admin</span>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="welcome-section">
          <div>
            <h2>Bienvenue, Administrateur</h2>
            <p>Voici un aperçu des principales fonctionnalités de gestion</p>
          </div>
          <input type="text" placeholder="Rechercher..." className="search-input" />
        </section>

        <section className="management-section">
          <h2>Gestion Principale</h2>
          <div className="management-grid">
            {managementSections.map((section, index) => (
              <div 
                key={index}
                className={`management-card ${section.color}-card`}
                onClick={() => handleNavigation(section.action)}
              >
                <div className={`card-icon ${section.color}-icon`}>
                  {section.icon}
                </div>
                <h3>{section.title}</h3>
                <p>{section.description}</p>
              </div>
            ))}
          </div>
        </section>

        

        <section className="recent-activities-section">
          <h2>Activités Récentes</h2>
          <div className="activities-list">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon ${activity.type}-icon`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <p className="activity-title">{activity.title}</p>
                  <p className="activity-description">{activity.description}</p>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
            <button className="view-all-btn">
              Voir toutes les activités
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;