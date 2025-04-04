import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  // Vérification de l'objet user
  if (!user) {
    return (
      <div className="error-message">
        <p>Données utilisateur non disponibles</p>
        <button onClick={() => navigate('/login')}>Retour à la connexion</button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Bienvenue, {user.name} !</h1>
        <button onClick={handleLogout} className="logout-btn">
          Déconnexion
        </button>
      </header>

      <div className="dashboard-content">
        <section className="user-card">
          <img 
            src={user.photo || '/default-avatar.png'} 
            alt="Profil" 
            className="user-avatar"
          />
          <div className="user-info">
            <h2>{user.email}</h2>
            <p>Membre depuis : {new Date(user.joinDate).toLocaleDateString()}</p>
          </div>
          <button 
          onClick={() => navigate('/profile')}
          className="profile-btn"
        >
          Voir mon profil complet
        </button>
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <h3>Tâches complétées</h3>
            <p>12</p>
          </div>
          <div className="stat-card">
            <h3>Projets actifs</h3>
            <p>3</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;