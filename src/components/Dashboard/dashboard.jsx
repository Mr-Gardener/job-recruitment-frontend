import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Welcome to Your Dashboard</h1>
      {user ? (
        <>
          <div className='card p-3'>
            <h2>Hello, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>

          <div className='mt-4'>
            <h3>Quick Actions</h3>
            <ul>
              <li><Link to='/profile'>View Profile</Link></li>
              <li><Link to='/jobs'>Browse Jobs</Link></li>
              <li><Link to='/logout'>Logout</Link></li>
            </ul>
          </div>
        </>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;

// Let me know if you want me to add job listings or more role-based content! 🛠️
