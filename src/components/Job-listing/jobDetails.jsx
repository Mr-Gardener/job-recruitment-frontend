
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api'; 

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        console.error('Failed to fetch job details:', err);
        setError('Failed to load job details. Please try again.');
      }
    };

    fetchJobDetails();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!job) {
    return <div className="text-center">Loading job details...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{job.title}</h2>
      <h5>{job.company}</h5>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Posted:</strong> {job.postedDate}</p>
      <h4>Description</h4>
      <p>{job.description}</p>
      <h4>Requirements</h4>
      <ul>
        {job.requirements?.map((req, index) => (
          <li key={index}>{req}</li>
        ))}
      </ul>
      <button className="btn btn-primary">Apply Now</button>
    </div>
  );
};

export default JobDetails;
