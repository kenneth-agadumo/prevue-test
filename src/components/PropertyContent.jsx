import React, { useEffect, useState } from "react";
import DashboardFilter from "./DashboardFilter";
import DashboardSearch from "./DashboardSearch";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import DropdownFilter from "./DropdownFilter";
import { HiOutlineDotsVertical } from "react-icons/hi";
import RestaurantModal from "./RestaurantModal";
import AddPropertyButton from "./AddProperty";


export const PropertiesContent = () => {
  const [properties, setProperties] = useState([]); // Original data
  const [filteredProperties, setFilteredProperties] = useState([]); // Filtered data
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 7;

  const mockProperties = [
    { id: "1", name: "Ocean View Villa", type: "Shortlets", dateAdded: "2024-01-15", reservations: 12 },
    { id: "2", name: "Mountain Cabin", type: "Restaurants", dateAdded: "2024-02-01", reservations: 8 },
    { id: "3", name: "Downtown Apartment", type: "Shortlets", dateAdded: "2024-03-05", reservations: 15 },
    { id: "4", name: "Luxury Penthouse", type: "Restaurants", dateAdded: "2024-04-12", reservations: 5 },
    { id: "5", name: "Ocean View Villa", type: "Shortlets", dateAdded: "2024-01-15", reservations: 12 },
    { id: "6", name: "Mountain Cabin", type: "Restaurants", dateAdded: "2024-02-01", reservations: 8 },
    { id: "7", name: "Downtown Apartment", type: "Shortlets", dateAdded: "2024-03-05", reservations: 15 },
    { id: "8", name: "Luxury Penthouse", type: "Restaurants", dateAdded: "2024-04-12", reservations: 5 },
    { id: "9", name: "Ocean View Villa", type: "Shortlets", dateAdded: "2024-01-15", reservations: 12 },
    { id: "10", name: "Mountain Cabin", type: "Restaurants", dateAdded: "2024-02-01", reservations: 8 },
    { id: "11", name: "Downtown Apartment", type: "Shortlets", dateAdded: "2024-03-05", reservations: 15 },
    { id: "12", name: "Luxury Penthouse", type: "Restaurants", dateAdded: "2024-04-12", reservations: 5 },
    { id: "13", name: "Ocean View Villa", type: "Shortlets", dateAdded: "2024-01-15", reservations: 12 },
    { id: "14", name: "Mountain Cabin", type: "Restaurants", dateAdded: "2024-02-01", reservations: 8 },
    { id: "15", name: "Downtown Apartment", type: "Shortlets", dateAdded: "2024-03-05", reservations: 15 },
    { id: "16", name: "Luxury Penthouse", type: "Restaurants", dateAdded: "2024-04-12", reservations: 5 },
    
    // More mock data here...
  ];

  useEffect(() => {
    const fetchProperties = () => {
      setLoading(true);
      setTimeout(() => {
        setProperties(mockProperties);
        setFilteredProperties(mockProperties); // Set initial data
        setLoading(false);
      }, 1000);
    };

    fetchProperties();
  }, []);

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + propertiesPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = properties.filter(
      (property) =>
        property.name.toLowerCase().includes(lowercasedQuery) ||
        property.type.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProperties(filtered);
    setCurrentPage(1); // Reset to first page
  };

  const handleFilter = (selectedType) => {
    setCurrentPage(1); // Reset to first page when filtering
    if (selectedType === "All") {
      setFilteredProperties(properties); // Show all properties
    } else {
      const filtered = properties.filter((property) => property.type === selectedType);
      setFilteredProperties(filtered);
    }
  };

  if (loading) return <div>Loading properties...</div>;
  if (!properties.length) return <div>No properties found.</div>;

  return (
    <div className="p-8 overflow-hidden">
      <div>
        <h2 className="text-xl font-weight-700 mb-1">Properties</h2>
        <p className="text-gray-500 text-sm mb-2">
          Showing data for the last<span className="text-orange-400 text-sm border-b-2 border-orange-400"> 30 days</span>
        </p>
        <div className="flex flex-row-reverse mb-2"> <AddPropertyButton /></div>
        
      </div>
      
      <div className="overflow-x-auto bg-white border rounded-xl">
        <div className="flex items-center justify-between pt-2 px-3">
          <div>
            <DashboardSearch onSearch={handleSearch} />
          </div>
          <div className="flex gap-2">
            <DropdownFilter filterHandler={handleFilter} />
            <DashboardFilter />
            
          </div>
        </div>

        <table className="min-w-full bg-white border shadow-md rounded-md table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Name</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Type</th>
              <th className="py-3 px-4 hidden sm:table-cell text-left text-gray-500 font-medium text-xs">Date Added</th>
              <th className="py-3 px-4 hidden lg:table-cell text-left text-gray-500 font-medium text-xs">No. of Reservations</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs"></th>
            </tr>
          </thead>
          <tbody>
            {currentProperties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200 text-xs">{property.name}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">{property.type}</td>
                <td className="py-3 px-4 hidden sm:table-cell border-b border-gray-200 text-gray-500 text-xs">{property.dateAdded}</td>
                <td className="py-3 px-4 hidden lg:table-cell border-b border-gray-200 text-gray-500 text-xs">{property.reservations}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">
                  <HiOutlineDotsVertical />
                </td>
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
  );
};
