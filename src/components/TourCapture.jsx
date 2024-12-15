import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import DashboardSearch from "./DashboardSearch";
import DashboardFilter from "./DashboardFilter";

export const TourCapture = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const toursPerPage = 2;

  const mockTours = [
    { id: "1", name: "Ocean View Villa", type: "Villa", phone: "123-456-7890", requestDate: "2024-01-15", tourDate: "2024-02-10" },
    { id: "2", name: "Mountain Cabin", type: "Cabin", phone: "987-654-3210", requestDate: "2024-02-01", tourDate: "2024-02-20" },
    { id: "3", name: "Downtown Apartment", type: "Apartment", phone: "555-123-4567", requestDate: "2024-03-05", tourDate: "2024-03-18" },
    { id: "4", name: "Luxury Penthouse", type: "Penthouse", phone: "444-555-6666", requestDate: "2024-04-10", tourDate: "2024-04-25" },
    { id: "5", name: "Suburban House", type: "House", phone: "333-222-1111", requestDate: "2024-05-12", tourDate: "2024-05-30" },
    { id: "6", name: "Lakefront Cabin", type: "Cabin", phone: "111-222-3333", requestDate: "2024-06-20", tourDate: "2024-07-01" },
    { id: "7", name: "City Loft", type: "Loft", phone: "666-777-8888", requestDate: "2024-07-01", tourDate: "2024-07-15" },
    { id: "8", name: "Beachfront Condo", type: "Condo", phone: "999-888-7777", requestDate: "2024-08-10", tourDate: "2024-08-25" },
  ];

  useEffect(() => {
    const fetchTours = () => {
      setLoading(true);
      setTimeout(() => {
        setTours(mockTours);
        setLoading(false);
      }, 1000);
    };
    fetchTours();
  }, []);

  // Filter tours based on searchTerm
  const filteredTours = tours.filter((tour) =>
    tour.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTours.length / toursPerPage);
  const startIndex = (currentPage - 1) * toursPerPage;
  const currentTours = filteredTours.slice(startIndex, startIndex + toursPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading) return <div>Loading tours...</div>;
  if (!tours.length) return <div>No tours available.</div>;

  return (
    <div className="p-8">
      <div className="overflow-x-auto bg-white border rounded-xl">
        <div>
          <h2 className="text-lg font-weight-700 mb-1 px-3 pt-3">Tour capture requests</h2>
        </div>
        <div className="flex items-center justify-between pt-4 px-3">
          {/* Pass setSearchTerm as a prop to the DashboardSearch component */}
          <DashboardSearch onSearch={setSearchTerm} />
          <DashboardFilter />
        </div>
        <table className="min-w-full bg-white border shadow-md rounded-md table-auto">
          <thead className="bg-gray-100 border">
            <tr>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Name</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Type</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Phone Number</th>
              <th className="py-3 px-4 hidden sm:table-cell text-left text-gray-500 font-medium text-xs">Date of Request</th>
              <th className="py-3 px-4 hidden lg:table-cell text-left text-gray-500 font-medium text-xs">Preferred Tour Date</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs"></th>
            </tr>
          </thead>
          <tbody>
            {currentTours.map((tour) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200 text-xs">{tour.name}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">{tour.type}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">{tour.phone}</td>
                <td className="py-3 px-4 hidden sm:table-cell border-b border-gray-200 text-gray-500 text-xs">{tour.requestDate}</td>
                <td className="py-3 px-4 hidden lg:table-cell border-b border-gray-200 text-gray-500 text-xs">{tour.tourDate}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">
                  <HiOutlineDotsVertical />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="6" className="py-2 px-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
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
