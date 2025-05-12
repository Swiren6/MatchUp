import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import '../components/freelancer/Freelancer.css';

import FreelancerNavBar from '../components/freelancer/FreelancerNavbar';   
import FreelancerProfile from '../components/freelancer/FreelanceProfile';
import FreelancerDashboard from '../components/freelancer/FreelncerDashboard';
import ProjectSwipe from '../components/freelancer/ProjetSwipe';
const FreelancerPage = () => {
    return (
        <div className="freelancer-dashboard">
            <FreelancerNavBar />
            <main className="freelancer-content">
                <Routes>
                    <Route index element={<FreelancerDashboard />} />
                    <Route path="profile" element={<FreelancerProfile />} />
                    <Route path="swipe" element={<ProjectSwipe />} />
                    
                </Routes>
                <Outlet />
            </main>
        </div>
    );
            
        
    
}
export default FreelancerPage;