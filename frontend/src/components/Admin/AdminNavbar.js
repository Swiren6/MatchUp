import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import GroupIcon from '@mui/icons-material/Group';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';


const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const path = location.pathname.split('/admin/')[1] || 'dashboard';
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
          <span className="subtitle">Espace Admin</span>
        </div>

        <div className="navbar-links">
          <Link to="/admin" className={activeTab === 'dashboard' ? 'active' : ''}>
            <DashboardIcon sx={{ fontSize: 20 }} /> Tableau de bord
          </Link>
          <Link to="/admin/offres" className={activeTab === 'offres' ? 'active' : ''}>
  <WorkIcon sx={{ fontSize: 20 }} /> Les offres
</Link>
          <Link to="/admin/utilisateurs" className={activeTab === 'utilisateurs' ? 'active' : ''}>
            <GroupIcon sx={{ fontSize: 20 }} /> Les utilisateurs
          </Link>
          <Link to="/admin/recruiters" className={activeTab === 'recruiters' ? 'active' : ''}>
            <PersonIcon sx={{ fontSize: 20 }} /> les Recruteurs
          </Link>

          <Link to="/admin/profile" className={activeTab === 'profile' ? 'active' : ''}>
            <PersonIcon sx={{ fontSize: 20 }} /> Mon profil
          </Link>

          
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Déconnexion
        </button>
      </nav>
    </header>
  );
};

export default AdminNavbar; 