import React from 'react';
import { IoFilter } from 'react-icons/io5';

const DashboardFilter = () => {
  return (
    <button className="flex items-center border border-gray-300 rounded-md px-3 py-1 shadow-sm bg-white hover:bg-gray-100">
      <IoFilter className="text-gray-500 text-lg mr-2" />
      <span className="text-sm text-gray-700">Filters</span>
    </button>
  );
};

export default DashboardFilter;

