
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { Layout } from '../components/Layout';

const Index = () => {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
};

export default Index;
