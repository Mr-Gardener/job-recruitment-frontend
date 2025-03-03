import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';




const Navbar = ({ jobListings }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    // const filteredJobs = jobListings.filter((job) =>
    //   job.title.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    return (
        <div className='headContainer'>
            <div className='navigate'>
                <h1><Link className='logo' to="/">Job Query</Link></h1>
                <nav>
                    <Link className='jobPost' to="/">Post a remote Job</Link>
                    <Link className='login' to="/login">Login</Link>
                </nav>
            </div>    
            <div className='hero'>
                <p>Find you dream remote job <br />from anywhere</p>
                <div className='search-bar'>
                    <BsSearch className='search-icon' />
                    <input
                        type='text'
                        placeholder='Search for jobs...'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='search-input'
                    />
                </div>
            </div>
        </div>
    );
  };
  
  export default Navbar;