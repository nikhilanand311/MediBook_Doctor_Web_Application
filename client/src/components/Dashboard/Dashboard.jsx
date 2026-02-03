import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }

  if (user.role === 'admin') {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};

export default Dashboard;
