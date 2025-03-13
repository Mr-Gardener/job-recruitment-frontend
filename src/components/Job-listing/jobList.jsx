import React, { useState, useEffect } from 'react';  
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [titleSuggestions, setTitleSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs');
      setJobs(response.data);
      extractSuggestions(response.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  const extractSuggestions = (jobs) => {
    const uniqueTitles = [...new Set(jobs.map((job) => job.title))];
    const uniqueLocations = [...new Set(jobs.map((job) => job.location))];
    setTitleSuggestions(uniqueTitles);
    setLocationSuggestions(uniqueLocations);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (locationFilter === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase()))
  );

  const handleApplyClick = (jobId) => {
    if (jobId) {
      navigate(`/apply/${jobId}`);
    } else {
      console.error("Job ID is undefined");
    }
  };

  return (
    <div className="container mt-5">

      {/* Search & Filter Section */}
      <div className="row mb-4">
        <div className="col-lg-6 col-md-12 mb-3">
          <input
            type="text"
            placeholder="Search by job title"
            className="form-control"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <ul className="list-group position-absolute z-index-1 w-100">
              {titleSuggestions
                .filter((title) => title.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((title, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => setSearchQuery(title)}
                  >
                    {title}
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="col-lg-6 col-md-12">
          <input
            type="text"
            placeholder="Filter by location"
            className="form-control"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
          {locationFilter && (
            <ul className="list-group position-absolute z-index-1 w-100">
              {locationSuggestions
                .filter((location) => location.toLowerCase().includes(locationFilter.toLowerCase()))
                .map((location, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => setLocationFilter(location)}
                  >
                    {location}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Job Listings */}
      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="col-lg-6 col-md-12 mb-4">
              <div className="card p-3 shadow-sm">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{job.title}</h5>
                    <p className="mb-1 text-muted">{job.company}</p>
                    <p className="mb-1"><i className="bi bi-geo-alt"></i> {job.location}</p>
                    <p className="text-muted">{job.description}</p>
                  </div>
                  <button 
                    className="btn btn-danger mt-3 mt-md-0" 
                    onClick={() => handleApplyClick(job._id)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center">No jobs found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
