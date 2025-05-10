import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import '../components/Recruiter/Recruiter.css';

import DashboardHome from '../components/Recruiter/DashboardHome';
import OfferList from '../components/Recruiter/OfferList';
import ApplicationList from '../components/Recruiter/ApplicationList';
import RecruiterProfile from '../components/Recruiter/RecruiterProfile';
import RecruiterNavbar from '../components/Recruiter/RecruiterNavbar';
import FreelancerSwipe from '../components/Recruiter/FreelancerSwipe';
const RecruiterPage = () => {
  return (
    <div className="recruiter-dashboard">
      <RecruiterNavbar />

      <main className="recruiter-content">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="offers" element={<OfferList />} />
          <Route path="applications" element={<ApplicationList />} />
          <Route path="profile" element={<RecruiterProfile />} />
          <Route path="swipe" element={<FreelancerSwipe />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
};

export default RecruiterPage;
