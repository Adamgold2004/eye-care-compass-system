
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { PatientDashboard } from './dashboards/PatientDashboard';
import { DoctorDashboard } from './dashboards/DoctorDashboard';
import { AuthScreen } from './auth/AuthScreen';

export const Layout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-medical-gray-light">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-medical-blue"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <AuthScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user.role === 'patient' ? <PatientDashboard /> : <DoctorDashboard />}
    </div>
  );
};
