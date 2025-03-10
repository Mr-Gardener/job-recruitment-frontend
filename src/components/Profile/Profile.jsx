import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

  const Profile = () => {
    const {user} = useContext(AuthContext); // Get user from context
    const navigate = useNavigate();

    if (!user) {
      return <p>Loading. Navigate to Login when exhausted</p>;   // Handling missing user data
    }


    return(
      <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2 className="mb-4">Profile</h2>
        <p><strong>Name:</strong> {user.name || 'Name not gotten from API'}</p>
        <p><strong>Email:</strong> {user.email || 'Email not gotten from API'}</p>
        <p><strong>Bio:</strong> {user.bio || 'Not provided'}</p>
        <p><strong>Skills:</strong> {Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || 'Not provided'}</p>
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
          onClick={() => navigate('/edit-profile')}
        >
          Edit Profile
        </button>
      </div>
    </div>
    );

  };

export default Profile;