import React, { useState } from 'react';
import api from '../../api/api'; 

const PostJobForm = () => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    requirements: '',
    industry: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/jobs', jobData);
      if (response.status === 201) {
        console.log('Job posted successfully:', response.data);
      } else {
        console.error('Failed to post job:', response.data);
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };
  
  return (
    <div 
      className="container mt-5" 
      style={{
        maxWidth: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 20px', // padding for smaller screens
      }}
    >
      <h2 className="mb-4 text-center">Post a Job</h2>
      <form 
        onSubmit={handleSubmit} 
        className="card p-4 shadow-sm"
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          maxWidth: '750px', // Limit max width for larger screens
        }}
      >
        <div className="mb-3">
          <label className="form-label">Job Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter job title"
            value={jobData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            name="company"
            className="form-control"
            placeholder="Enter company name"
            value={jobData.company}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            placeholder="Enter location"
            value={jobData.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="text"
            name="salary"
            className="form-control"
            placeholder="Enter salary"
            value={jobData.salary}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Requirements</label>
          <textarea
            name="requirements"
            className="form-control"
            rows="3"
            placeholder="Enter job requirements"
            value={jobData.requirements}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Industry</label>
          <input
            type="text"
            name="industry"
            className="form-control"
            placeholder="Enter industry"
            value={jobData.industry}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Description</label>
          <textarea
            name="description"
            className="form-control"
            rows="4"
            placeholder="Enter job description"
            value={jobData.description}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Post Job</button>
      </form>
    </div>
  );
};

export default PostJobForm;

