import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const JobApplicationForm = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    applicantName: '',
    email: '',
    resume: null,
    coverLetter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('authToken'); // Get the token for authorization
  
    const formDataObj = new FormData();
    formDataObj.append('jobId', jobId);
    formDataObj.append('applicantName', formData.applicantName);
    formDataObj.append('email', formData.email);
    formDataObj.append('resume', formData.resume); // Resume file object
    formDataObj.append('coverLetter', formData.coverLetter);
  
    try {
      const response = await api.post('/applications', formDataObj, {
        headers: {
          'Authorization': `Bearer ${token}`,               // Add the auth token
          'Content-Type': 'multipart/form-data',           // Set correct content type because resume file 
        },
      });
  
      if (response.status === 201) {
        alert('Application submitted successfully!');
        navigate('/jobs');
      } else {
        alert('Failed to apply: ' + (response.data?.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Failed to apply: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };
  

  return (
    <div className="container mt-5">
      <h2>Apply for Job</h2>
      <p>Job ID: {jobId}</p>
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input 
            type="text" 
            name="applicantName" 
            className="form-control"
            value={formData.applicantName}
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
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Resume (PDF or DOCX)</label>
          <input 
            type="file" 
            name="resume" 
            className="form-control"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cover Letter (Optional)</label>
          <textarea 
            name="coverLetter" 
            className="form-control"
            rows="4"
            value={formData.coverLetter}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Application</button>
      </form>
    </div>
  );
};

export default JobApplicationForm;

