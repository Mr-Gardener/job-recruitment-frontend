import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import backgroundImg from '../assets/pexels-divinetechygirl-1181244.jpg';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobSeeker',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/register', formData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center " 
      style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover' }}
    >
      <div className="card shadow-lg p-1" style={{ maxWidth: '500px', width: '100%', borderRadius: '12px', margin: '30px 0', overflow: 'hidden' }}>
        <div className="card-body">
          <h2 className="text-center fw-bold">Sign up to apply to remote jobs</h2>
          {/* <h5 className="text-center fw-semibold mb-4">
            on <span className="fw-bold text-primary">the #1 remote work platform</span>
          </h5> */}

          <form onSubmit={handleSubmit} className="mt-2">
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input 
                type="text" 
                name="name" 
                className="form-control" 
                placeholder="Enter your name"
                value={formData.name} 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                name="email" 
                className="form-control" 
                placeholder="Enter your email"
                value={formData.email} 
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
                placeholder="Create a password"
                value={formData.password} 
                onChange={handleChange} 
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select 
                name="role" 
                className="form-select" 
                value={formData.role} 
                onChange={handleChange}
              >
                <option value="job_seeker">Job Seeker</option>
                <option value="employer">Employer</option>
              </select>
            </div>

            <button type="submit" className="btn btn-danger w-100">sign up</button>

            <div className="text-center mt-1">
              <p>Already a member? <a href="/login" className="fw-bold">Log in</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
