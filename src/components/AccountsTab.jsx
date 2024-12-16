import React from 'react'
import { TourCapture } from '../components/TourCapture.jsx';



const AccountsTab = ({userData}) => {
    return (
        <div className="account-tab">
          <div className="title pl-7 pt-2">
            <h2>Welcome back, {userData?.fullName}</h2>
            <p className='text-sm text-gray-500'>Showing data for the last 30 days</p>
          </div>
          {/* Statistics */}
          <div className="data-row pl-8 pr-8  ">
            {/* Reservation Data */}
            <Card title="Total Reservations" value="12" change="40%" />
            {/* Restaurant Data */}
            <Card title="Total Restaurants" value="8" change="40%" />
            {/* Entry Data */}
            <Card title="Total Entries" value="20" change="20%" />
          </div>
          <TourCapture/>
        </div>
      );
}

export default AccountsTab




// Generic Card Component
function Card({ title, value, change }) {
    return (
      <div className="card">
        <div className="row1">
          <h4>{title}</h4>
          <img src="/Dropdown.svg" alt="" />
        </div>
        <div className="row-2">
          <p className="big-number">{value}</p>
        </div>
        <div className="row-3">
          <div className="change-rate">
            <img src="/green-arrow-up.svg" alt="" />
            <p>
              <span style={{ color: 'green' }}>{change}</span> vs last month
            </p>
          </div>
        </div>
      </div>
    );
  }