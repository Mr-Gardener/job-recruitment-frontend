import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
// const api = axios.create({ baseURL: 'http://localhost:5000/api' });


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.get('/auth/profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error('Failed to load user profile:', error);
          localStorage.removeItem('authToken');
          setUser(null);
        });
    }
  }, []);  


  const login = async (credentials, navigate) => {
    try {
      const response = await api.post('/auth/login', credentials);
  
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token); // Save token
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`; // Attach token
        setUser(response.data.user);
        console.log("🔑 Token saved to localStorage:", response.data.token);
        
        if (response.data.user.profileComplete) {
          navigate('/dashboard');
        } else {
          navigate('/edit-profile');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };
  
  const updateProfile = async (formData) => {
    try {
      const token = localStorage.getItem('authToken'); // Get the token
      if (!token) {
        alert('No token found, please log in again.');
        logout();
        return;
      }
  
      const response = await api.put('/auth/edit-profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Attach token
        },
      });
  
      // Save the new token (if returned)
      if (response.data.token) {
        console.log('🔒 New Token from API:', response.data.token.slice(0, 10) + '...');
        localStorage.setItem('authToken', response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      }
  
      setUser(response.data.updatedUser);
      alert('Profile updated successfully!');
    } catch (error) {
      handleTokenError(error);
      console.error('Profile update failed:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleTokenError = (error) => {
  if (error.response?.status === 401) {
    console.warn('🔓 Token expired or invalid — logging out...');
    logout(); // Use your existing logout function
  }
};

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.warn("🔓 Token expired or invalid — logging out...");
//       logout(); // Clear token and redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

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
  
  // // Check profile completeness
  // useEffect(() => {
  //   if (user && !user.profileComplete) {
  //     navigate('/edit-profile');
  //   }
  // }, [user, navigate]);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };

export const useAuth = () => useContext(AuthContext);
