
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';
import { mockPatient, doctors } from '../data/mockData';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, role: 'patient' | 'doctor') => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for stored auth data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string, role: 'patient' | 'doctor'): Promise<boolean> => {
    try {
      // Mock authentication logic
      let user: User | null = null;

      if (role === 'patient' && email === 'patient@demo.com' && password === 'demo123') {
        user = mockPatient;
      } else if (role === 'doctor') {
        const doctor = doctors.find(d => d.email === email);
        if (doctor && password === 'demo123') {
          user = doctor;
        }
      }

      if (user) {
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
        localStorage.setItem('user', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
    localStorage.removeItem('user');
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Mock registration logic
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        role: userData.role,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone
      };

      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
