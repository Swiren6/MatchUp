import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/landing-page/LandingPage";
import LoginPage from "./pages/Auth/login";
import RegisterPage from "./pages/Auth/register";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserProfile from './pages/UserProfile/UserProfile';
//import SwipeCard from "./pages/SwipeCard/SwipeCard";

function App() {
  const mockUser = {
    name: "Test Utilisateur",
    email: "test@matchup.com",
    photo: "/default-avatar.png",
    joinDate: "2024-01-01"
  };
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/') // l'URL vers ton backend
      .then(res => res.text()) // .text() car tu envoies juste "hello"
      .then(data => setMsg(data))
      .catch(err => console.error(err));
  }, []);


  return (
    
    
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard user={mockUser} />} />
        <Route path="/profile" element={<UserProfile />} />
        
      </Routes>
      <Footer />
    </Router>
    );
  }



export default App;