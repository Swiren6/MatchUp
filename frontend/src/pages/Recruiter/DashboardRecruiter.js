import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './Recruiter.css';

import DashboardHome from './DashboardHome';
import OfferList from './OfferList';
import ApplicationList from './ApplicationList';
import RecruiterProfile from './RecruiterProfile';
import RecruiterNavbar from './RecruiterNavbar';

const DashboardRecruiter = () => {
  return (
    <div className="recruiter-dashboard">
      <RecruiterNavbar />

      <main className="recruiter-content">
        <Routes>
          <Route index element={<DashboardHome />} />
          <Route path="offers" element={<OfferList />} />
          <Route path="applications" element={<ApplicationList />} />
          <Route path="profile" element={<RecruiterProfile />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardRecruiter;
