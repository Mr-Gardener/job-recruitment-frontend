import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { setUser } = useContext(AuthContext); // Clear user from context
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setUser(null); // Clear user data in context
    navigate('/login'); 
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
