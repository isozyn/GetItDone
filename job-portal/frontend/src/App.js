import ManageUsers from './pages/ManageUsers';
import ManageClasses from './pages/ManageClasses';
import MyClasses from './pages/MyClasses';
import AvailableClasses from './pages/AvailableClasses';
import Profile from './pages/Profile';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import NGORegistration from './pages/NGORegistration';
import RegistrationPending from './pages/RegistrationPending';
import UserStatus from './pages/UserStatus';
import Register from './pages/Register';
import Login from './pages/Login';
import SetupPassword from './pages/SetupPassword';
import VerifyEmail from './pages/VerifyEmail';
// import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ChangePassword from './pages/ChangePassword';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/ngo/register" element={<NGORegistration />} />
        <Route path="/ngo/registration-pending" element={<RegistrationPending />} />
        <Route path="/ngo/status" element={<UserStatus />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup-password/:token" element={<SetupPassword />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/admin-dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/Admin-Dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/change-password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
  <Route path="/admin/users" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
  <Route path="/admin/classes" element={<PrivateRoute><ManageClasses /></PrivateRoute>} />
  <Route path="/my-classes" element={<PrivateRoute><MyClasses /></PrivateRoute>} />
  <Route path="/available-classes" element={<PrivateRoute><AvailableClasses /></PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;