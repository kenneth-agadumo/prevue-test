import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DashboardFilter from "./DashboardFilter";
import DashboardSearch from "./DashboardSearch";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr"

export const PropertiesTab = () => {
  const [pendingProperties, setPendingProperties] = useState([]);
  const [approvedProperties, setApprovedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pendingPage, setPendingPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);

  const propertiesPerPage = 1; // Number of properties per page

  const mockPendingProperties = [
    {
      id: "1",
      name: "Ocean View Villa",
      customerName: "John Doe",
      type: "Villa",
      dateAdded: "2024-01-15",
      reservationPeriod: "2024-02-01 to 2024-02-15",
    },
    {
      id: "2",
      name: "Mountain Cabin",
      customerName: "Jane Smith",
      type: "Cabin",
      dateAdded: "2024-02-01",
      reservationPeriod: "2024-03-10 to 2024-03-20",
    },
    {
      id: "3",
      name: "Downtown Apartment",
      customerName: "Emily Brown",
      type: "Apartment",
      dateAdded: "2024-03-05",
      reservationPeriod: "2024-04-15 to 2024-04-25",
    },
    {
      id: "4",
      name: "Luxury Penthouse",
      customerName: "Michael Green",
      type: "Penthouse",
      dateAdded: "2024-04-12",
      reservationPeriod: "2024-05-01 to 2024-05-10",
    },
  ];

  const mockApprovedProperties = [
    {
      id: "5",
      name: "Suburban House",
      customerName: "Alice Johnson",
      type: "House",
      dateAdded: "2024-05-20",
      reservationPeriod: "2024-06-01 to 2024-06-15",
    },
    {
      id: "6",
      name: "Beachfront Condo",
      customerName: "Robert Williams",
      type: "Condo",
      dateAdded: "2024-06-18",
      reservationPeriod: "2024-07-05 to 2024-07-20",
    },
    {
      id: "7",
      name: "Farmhouse",
      customerName: "Olivia Martinez",
      type: "Farmhouse",
      dateAdded: "2024-07-25",
      reservationPeriod: "2024-08-01 to 2024-08-10",
    },
    {
      id: "8",
      name: "Lake House",
      customerName: "David Lee",
      type: "House",
      dateAdded: "2024-08-02",
      reservationPeriod: "2024-09-01 to 2024-09-15",
    },
  ];

  useEffect(() => {
    const fetchProperties = () => {
      setLoading(true);
      setTimeout(() => {
        setPendingProperties(mockPendingProperties);
        setApprovedProperties(mockApprovedProperties);
        setLoading(false);
      }, 1000);
    };

    fetchProperties();
  }, []);

  // Pagination Calculations
  const paginate = (data, page) => {
    const startIndex = (page - 1) * propertiesPerPage;
    return data.slice(startIndex, startIndex + propertiesPerPage);
  };

  const pendingTotalPages = Math.ceil(pendingProperties.length / propertiesPerPage);
  const approvedTotalPages = Math.ceil(approvedProperties.length / propertiesPerPage);

  const currentPending = paginate(pendingProperties, pendingPage);
  const currentApproved = paginate(approvedProperties, approvedPage);

  const handlePageChange = (pageSetter, page) => pageSetter(page);
  const handleNextPage = (page, totalPages, pageSetter) =>
    page < totalPages && pageSetter(page + 1);
  const handlePreviousPage = (page, pageSetter) =>
    page > 1 && pageSetter(page - 1);

  if (loading) return <div>Loading reservations...</div>;

  const renderTable = (title, properties, currentPage, totalPages, pageSetter) => (
    <div className="mt-2">
      <h3 className="text-lg font-weight-700 mb-2">{title}</h3>
      <div className="overflow-x-auto bg-white border rounded-xl">
      <div className="flex items-center justify-between pt-2 px-3">
          <div><DashboardSearch /></div>
          <div><DashboardFilter /></div>
        </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow-md rounded-md table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Name</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Customer Name</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Type</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Date Added</th>
              <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Reservation Period</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b border-gray-200 text-xs">{property.name}</td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">
                  {property.customerName}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">
                  {property.type}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">
                  {property.dateAdded}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">
                  {property.reservationPeriod}
                </td>
                <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">
                  <HiOutlineDotsVertical />
                </td>
              </tr>
            ))}
            {/* Pagination Row */}
            <tr>
              <td colSpan="6" className="py-3 px-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handlePreviousPage(currentPage, pageSetter)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-xs border rounded-full hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => handlePageChange(pageSetter, index + 1)}
                        className={`px-3 py-1 text-sm border rounded-full ${
                          currentPage === index + 1
                            ? "bg-green-100 text-green-600"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => handleNextPage(currentPage, totalPages, pageSetter)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-xs border rounded-full hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
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

  return (
    <div className="p-8">
      <h2 className="text-xl font-weight-700">Reservations</h2>
      {renderTable("Pending", currentPending, pendingPage, pendingTotalPages, setPendingPage)}
      {renderTable("Approved", currentApproved, approvedPage, approvedTotalPages, setApprovedPage)}
    </div>
  );
};


