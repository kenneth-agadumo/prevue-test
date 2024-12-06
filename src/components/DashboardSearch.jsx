import React from 'react'

const DashboardSearch = () => {
  return (
    <div className="search-bar-column">
        <img className="search-icon" src="/search.svg" alt="" />
        <input className="search-input" type="text" placeholder="Search" />
    </div>
  )
}

export default DashboardSearch