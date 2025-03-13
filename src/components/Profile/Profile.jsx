import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Logout from '../Login/logout';

const Profile = () => {
  const { user } = useContext(AuthContext); // Get user from context
  const navigate = useNavigate();

  if (!user) {
    return <p className="text-center mt-5">Loading... Redirecting to Login if session expires.</p>; // Improved loading text
  }

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg mx-auto" style={{ maxWidth: '800px' }}>  
        {/* Responsive profile header with image and details */}
        <div className="row align-items-center">
          <div className="col-md-4 text-center">
            {user.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="rounded-circle img-fluid mb-3" 
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            ) : (
              <div 
                className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white mb-3"
                style={{ width: '150px', height: '150px' }}
              >
                No Image
              </div>
            )}
          </div>

          <div className="col-md-8">
            <h2 className="mb-3 text-primary">{user.name || 'Unknown User'}</h2>
            <p><strong>Email:</strong> {user.email || 'Not available'}</p>
            <p><strong>Bio:</strong> {user.bio || 'No bio provided'}</p>
            <p><strong>Skills:</strong> {Array.isArray(user.skills) ? user.skills.join(', ') : user.skills || 'Not specified'}</p>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
          <button 
            className="btn btn-primary mb-2 mb-md-0"
            onClick={() => navigate('/edit-profile')}
          >
            Edit Profile
          </button>
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Profile;
