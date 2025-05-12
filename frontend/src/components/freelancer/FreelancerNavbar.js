import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const FreelancerNavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Modification ici pour mieux gérer les routes
    const path = location.pathname.replace('/freelancer/', '') || 'dashboard';
    setActiveTab(path);

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className={`freelancer-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="freelancer-navbar">
        <div className="navbar-brand">
          <h1>MatchUp</h1>
          <span className="subtitle">Espace freelancer</span>
        </div>

        <div className="navbar-links">
          <Link 
            to="/freelancer" 
            className={activeTab === 'dashboard' || activeTab === '' ? 'active' : ''}
          >
            📊 Tableau de bord
          </Link>
          <Link 
            to="/freelancer/offers" 
            className={activeTab === 'offers' ? 'active' : ''}
          >
            📢 Les offres
          </Link>
          <Link 
            to="/freelancer/swipe" 
            className={activeTab === 'swipe' ? 'active' : ''}
          >
            🔍 Découvrir des projets
          </Link>
          <Link 
            to="/freelancer/profile" 
            className={activeTab === 'profile' ? 'active' : ''}
          >
            👤 Mon profil
          </Link>
        </div>

        <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
      </nav>
    </header>
  );
};

export default FreelancerNavBar;