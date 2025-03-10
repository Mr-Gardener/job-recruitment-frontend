import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';
import backgroundImg from '../assets/pexels-divinetechygirl-1181244.jpg';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      const token = localStorage.getItem('authToken'); // Check if token is stored
      if (token) {
        navigate('/'); // Redirect only if token exists
      } else {
        alert('Login failed. No token received.');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials and try again.');
    }
  };
  

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ 
        backgroundImage: `url(${backgroundImg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div 
        className="card shadow-lg p-4" 
        style={{ maxWidth: '500px', width: '100%', borderRadius: '12px', margin: '30px 0' }}
      >
        <h2 className="text-center fw-bold mb-4">Log in to your account</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <p>
              Don't have an account? <a href="/register" className="text-primary">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
