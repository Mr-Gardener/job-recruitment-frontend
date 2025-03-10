import React, { useState, useEffect, navigate } from 'react';
import api from '../../api/api';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      console.log('Jobs fetched:', response.data);
      setJobs(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase()))
  );

  const handleApplyClick = () => {
    navigate(`/apply/${job._id}`); // Navigate to application form with job ID
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Job Listings</h2>
      <div className="row mb-4">
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search by job title"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            placeholder="Filter by location"
            className="form-control"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="col-md-12 mb-4">
              <div className="card p-3 shadow-sm">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{job.title}</h5>
                    <p className="mb-1 text-muted">{job.company}</p>
                    <p className="mb-1">{job.location}</p>
                    <p className="text-muted">{job.description}</p>
                  </div>
                  <button className="btn btn-primary" onClick={handleApplyClick}>Apply Now</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
