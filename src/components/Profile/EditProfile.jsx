import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext.jsx';
import api from '../../api/api';

const EditProfile = () => {
  const { user, updateProfile } = useContext(AuthContext); //  Get user from AuthContext
  

  if (!user) {
    return <p>Loading...</p>; // Prevents error when user is not yet available
  }

  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    skills: user.skills?.join(', ') || '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('bio', formData.bio);
    formDataObj.append('skills', formData.skills);
    if (formData.profilePicture) {
      formDataObj.append('profilePicture', formData.profilePicture);
    }
  
    try {
      const updatedUser = await updateProfile(formDataObj);
      if (updatedUser) {
        setUser(updatedUser); // Update context with new user data
        window.location.href = '/profile'; // Redirect to profile page
      }
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };
  
  

  
  
  

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-lg">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea
              name="bio"
              className="form-control"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              className="form-control"
              value={formData.skills}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-success">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
