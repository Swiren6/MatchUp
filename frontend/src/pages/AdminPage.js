import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import '../components/Admin/Admin.css';

import AdminNavBar from '../components/Admin/AdminNavbar';   
import AdminDashboard from '../components/Admin/AdminDashboard';
import UsersPage from '../components/Admin/UsersPage';
import OffersPage from '../components/Admin/OffersPage';
import AdminProfile from '../components/Admin/AdminProfile';
import RecruitersPage from '../components/Admin/RecruitersPage';
import AnalyticsPage from '../components/Admin/AnalyticsPage';
import OfferForm from '../components/Recruiter/OfferForm';



const AdminPage = () => {
    return (
        <div className="admin-container">
            <AdminNavBar/>
            <main className="admin-content">
                <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="utilisateurs" element={<UsersPage />} />
                    <Route path="offres" element={<OffersPage />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="recruiters" element={<RecruitersPage />} />
                    <Route path='analytics' element={<AnalyticsPage />} />
                    <Route path="offreFORM" element={<OfferForm/>} />

                </Routes>
                <Outlet /> 
            </main>
        </div>
    );
};

export default AdminPage;