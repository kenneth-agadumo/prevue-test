import React, { useEffect, useState } from "react";
import DashboardFilter from "./DashboardFilter";
import DashboardSearch from "./DashboardSearch";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

import { HiOutlineDotsVertical } from "react-icons/hi";

export const PropertiesContent = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 7; // Number of properties per page (updated to 8)

  // mock properties data to ensure 16 properties (2 pages with 8 properties each)
  const mockProperties = [
    { id: "1", name: "Ocean View Villa", type: "Villa", dateAdded: "2024-01-15", reservations: 12 },
    { id: "2", name: "Mountain Cabin", type: "Cabin", dateAdded: "2024-02-01", reservations: 8 },
    { id: "3", name: "Downtown Apartment", type: "Apartment", dateAdded: "2024-03-05", reservations: 15 },
    { id: "4", name: "Luxury Penthouse", type: "Penthouse", dateAdded: "2024-04-12", reservations: 5 },
    { id: "5", name: "Suburban House", type: "House", dateAdded: "2024-05-20", reservations: 9 },
    { id: "6", name: "Beachfront Condo", type: "Condo", dateAdded: "2024-06-18", reservations: 18 },
    { id: "7", name: "Farmhouse", type: "Farmhouse", dateAdded: "2024-07-25", reservations: 4 },
    { id: "8", name: "Lake House", type: "House", dateAdded: "2024-08-02", reservations: 10 },
    { id: "9", name: "City Loft", type: "Loft", dateAdded: "2024-09-10", reservations: 7 },
    { id: "10", name: "Countryside Cottage", type: "Cottage", dateAdded: "2024-10-05", reservations: 3 },
    { id: "11", name: "Forest Retreat", type: "Cabin", dateAdded: "2024-11-01", reservations: 4 },
    { id: "12", name: "Riverfront Villa", type: "Villa", dateAdded: "2024-12-15", reservations: 5 },
    { id: "13", name: "Downtown Loft", type: "Loft", dateAdded: "2025-01-10", reservations: 2 },
    { id: "14", name: "Seaside Cottage", type: "Cottage", dateAdded: "2025-02-22", reservations: 6 },
    { id: "15", name: "Hilltop Mansion", type: "Mansion", dateAdded: "2025-03-13", reservations: 20 },
    { id: "16", name: "City Penthouse", type: "Penthouse", dateAdded: "2025-04-08", reservations: 3 },
  ];

  useEffect(() => {
    const fetchProperties = () => {
      setLoading(true);
      setTimeout(() => {
        setProperties(mockProperties);
        setLoading(false);
      }, 1000);
    };

    fetchProperties();
  }, []);

  const totalPages = Math.ceil(properties.length / propertiesPerPage); // 2 pages with 8 properties per page
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = properties.slice(startIndex, startIndex + propertiesPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading) return <div>Loading properties...</div>;
  if (!properties.length) return <div>No properties found.</div>;

  return (
    <div className="p-8 overflow-hidden ">
      <div>
       <h2 className="text-xl font-weight-700 mb-1"> Properties</h2>
        <p className="text-gray-500 text-sm mb-3">showing data for the last 30 days</p>

      </div>
        
      <div className="overflow-x-auto  ">
      <div className="overflow-x-auto bg-white border rounded-xl">
        <div className="flex items-center justify-between pt-2 px-3">
          <div><DashboardSearch /></div>
          <div><DashboardFilter /></div>
        </div>
        <table className="min-w-full bg-white border shadow-md rounded-md table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Name</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Type</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Date Added</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">No. of Reservations</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs"></th>
            </tr>
          </thead>
          <tbody>
            {currentProperties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200 text-xs">{property.name}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">{property.type}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">{property.dateAdded}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">{property.reservations}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs"><HiOutlineDotsVertical/></td>
              </tr>
            ))}
            {/* Pagination Row */}
            <tr>
              <td colSpan="4" className="py-1 px-4 border-t border-gray-200">
                {/* Pagination Controls */}
                <div className="flex items-center justify-between">
                  {/* Previous Button */}
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`flex items-center space-x-1 px-4 py-2 text-xs border border-gray-300 rounded-full ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                    }`}
                  >
                    <GrLinkPrevious className="text-gray-500 text-lg text-xs" />
                    <span className="text-gray-500 text-xs">Previous</span>
                  </button>
                  {/* Pagination */}
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 text-xs border rounded-full ${
                          currentPage === index + 1 ? "bg-green-100 text-green-600" : "hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  {/* Next Button */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center space-x-1 px-4 py-2 text-xs border border-gray-300 rounded-full ${
                      currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-gray-500 text-xs">Next</span>
                    <GrLinkNext className="text-gray-500 text-lg text-xs" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};
