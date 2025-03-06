import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch personalized job listings
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2>Welcome, {user.name}!</h2>
        <p>Role: {user.role}</p>

        <h3>Job Listings</h3>
        {jobs.length > 0 ? (
          <ul>
            {jobs.map((job) => (
              <li key={job._id}>
                <h4>{job.title}</h4>
                <p>{job.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No job listings found.</p>
        )}

        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
