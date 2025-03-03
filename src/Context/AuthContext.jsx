
import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for existing authentication token and fetch user data
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/auth/me')
        .then((response) => setUser(response.data))
        .catch(() => localStorage.removeItem('authToken'));
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, userData } = response.data;
      localStorage.setItem('authToken', token);
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  

  const logout = async () => {
    try {
      await api.post('/auth/logout'); 
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export const useAuth = () => { AuthContext, AuthProvider };
