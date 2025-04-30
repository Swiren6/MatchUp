import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/landing-page/LandingPage';
import LoginPage from './pages/Auth/login';
import RegisterPage from './pages/Auth/register';
import Dashboard from './pages/Dashboard/Dashboard';
import UserProfile from './pages/UserProfile/UserProfile';
import UsersPage from './pages/UsersPage';
import OffersPage from './pages/OffersPage';
import SwipeComponent from './pages/SwipeCard/SwipeComponent';

function App() {
  const [msg, setMsg] = useState('');



  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/swipe" element={<SwipeComponent />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
