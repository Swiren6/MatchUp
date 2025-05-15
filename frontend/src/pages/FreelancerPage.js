import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import '../components/freelancer/Freelancer.css';

import FreelancerNavBar from '../components/freelancer/FreelancerNavbar';   
import FreelancerProfile from '../components/freelancer/FreelanceProfile';
import FreelancerDashboard from '../components/freelancer/FreelncerDashboard';
import ProjectSwipe from '../components/freelancer/ProjetSwipe';
import FreelancerMatchPage from '../components/freelancer/FreelancerMatchPage';
import OffersPage from '../components/freelancer/OffersPage';
const FreelancerPage = () => {
    return (
        <div className="freelancer-dashboard">
            <FreelancerNavBar />
            <main className="freelancer-content">
                <Routes>
                    <Route index element={<FreelancerDashboard />} />
                    <Route path="profile" element={<FreelancerProfile />} />
                    <Route path="swipe" element={<ProjectSwipe />} />
                    <Route path="/match" element={<FreelancerMatchPage />} />
                    <Route path="offers" element={<OffersPage />} />
                    
                </Routes>
                <Outlet />
            </main>
        </div>
    );
            
        
    
}
export default FreelancerPage;