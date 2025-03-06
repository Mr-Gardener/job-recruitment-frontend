import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';

const Profile = ({ user }) => {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-4">Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Bio:</strong> {user.bio || 'Not provided'}</p>
        <p><strong>Skills:</strong> {user.skills?.join(', ') || 'Not provided'}</p>
        {user.profilePicture && (
          <img 
            src={user.profilePicture} 
            alt="Profile" 
            className="img-thumbnail mt-3"
            style={{ maxWidth: '200px' }}
          />
        )}
        <button 
          className="btn btn-primary mt-3" 
          onClick={() => window.location.href = '/edit-profile'}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;