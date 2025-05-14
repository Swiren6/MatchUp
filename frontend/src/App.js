import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/Auth/login';
import RegisterPage from './pages/Auth/register';
import UserProfile from './components/UserProfile/UserProfile';
import UsersPage from './components/Admin/UsersPage';
import OffersPage from './pages/OffersPage';
import FreelancerSwipe from './components/Recruiter/FreelancerSwipe';
import ApplyForm from "./pages/ApplyForm";
import RecruiterPage from './pages/RecruiterPage';
import AdminPage from './pages/AdminPage';
import FreelancerPage from './pages/FreelancerPage';
import SimpleChatbot from './components/Chatbot/SimpleChatbot';
import Chat from './components/AI/Chatbot';




function App() {
  const [msg, setMsg] = useState('');



  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<UserProfile />} />
        
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/swipe" element={<FreelancerSwipe />} />
        <Route path="/apply/:offerId" element={<ApplyForm />} />
        <Route path="/recruiter/*" element={<RecruiterPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/freelancer/*" element={<FreelancerPage />} />
        <Route path="/SimpleChatbot" element={<SimpleChatbot />} />

        <Route path="/Chat" element={<Chat />} />
        

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
