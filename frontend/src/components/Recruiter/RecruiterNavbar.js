// RecruiterNavbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css'; // utilise le même fichier CSS

const RecruiterNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/recruiter/')[1] || 'dashboard';
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
    <header className={`recruiter-header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="recruiter-navbar">
        <div className="navbar-brand">
          <h1>MatchUp</h1>
          <span className="subtitle">Espace Recruteur</span>
        </div>

        <div className="navbar-links">
          <Link to="/recruiter" className={activeTab === 'dashboard' ? 'active' : ''}>📊 Tableau de bord</Link>
          <Link to="/recruiter/offers" className={activeTab === 'offers' ? 'active' : ''}>📢 Mes offres</Link>
          <Link to="/recruiter/applications" className={activeTab === 'applications' ? 'active' : ''}>📄 Candidatures</Link>
          <Link to="/recruiter/swipe" className={activeTab === 'swipe' ? 'active' : ''}>📄 freelancers</Link>
          <Link to="/recruiter/profile" className={activeTab === 'profile' ? 'active' : ''}>👤 Mon profil</Link>
        </div>

        <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
      </nav>
    </header>
  );
};

export default RecruiterNavbar;
