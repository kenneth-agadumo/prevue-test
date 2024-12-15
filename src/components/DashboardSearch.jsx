import React from 'react'
import { useState } from 'react';

const DashboardSearch = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value); // Update local state
    onSearch(value); // Pass the search value to the parent component
  };
  return (
    <div className="search-bar-column hidden lg:flex">
    <img className="search-icon" src="/search.svg" alt="" />
    <input className="search-input" type="text" value={searchQuery}
        onChange={handleInputChange} placeholder="Search" />
  </div>
  
  )
}

export default DashboardSearch;