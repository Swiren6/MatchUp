import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import '../components/freelancer/Freelancer.css';

import FreelancerNavBar from '../components/freelancer/FreelancerNavbar';   


const FreelancerPage = () => {
    return (
        <div className="freelancer-dashboard">
            <FreelancerNavBar />
            
        </div>
    )
}
export default FreelancerPage;