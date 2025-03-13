import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

useEffect(() => {
  const storedToken = localStorage.getItem('authToken');
  if (storedToken) {
    api.get('/auth/profile')
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Failed to load user profile:', error);
        localStorage.removeItem('authToken'); 
      });
  } else {
    setUser(null); // Clear user state if no token (so public JobList pages load properly)
  }
}, []);



  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
  
      const { token, user } = response.data;
  
      if (token && user) {
        localStorage.setItem('authToken', token); //  Save token
        setUser(user);                            //  Save user to context
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  




const updateProfile = async (formData) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await api.put('/profile', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // If you're sending images, useful for resume on job application
      },
    });

    if (response.status === 200) {
      setUser(response.data); // ✅ Update user in context
      return true;
    } else {
      throw new Error('Profile update failed');
    }
  } catch (error) {
    console.error('Failed to update profile:', error);
    return false;
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
    <AuthContext.Provider value={{ user, login, logout, updateProfile}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export const useAuth = () => useContext(AuthContext);
