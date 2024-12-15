import React, { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DashboardFilter from "./DashboardFilter";
import DashboardSearch from "./DashboardSearch";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import DropdownFilter from "./DropdownFilter";

export const PropertiesTab = () => {
  const [pendingProperties, setPendingProperties] = useState([]);
  const [approvedProperties, setApprovedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pendingPage, setPendingPage] = useState(1);
  const [approvedPage, setApprovedPage] = useState(1);

  const [selectedReservation, setSelectedReservation] = useState(null); // Track the selected reservation
  const [showSidePanel, setShowSidePanel] = useState(false); // Toggle the side panel visibility

  
  const propertiesPerPage = 2; // Number of properties per page

  const mockPendingProperties = [
    {
      id: "1",
      name: "Ocean View Villa",
      customerName: "John Doe",
      type: "Shorlet",
      dateAdded: "2024-01-15",
      reservationPeriod: "2024-02-01 to 2024-02-15",
    },
    {
      id: "2",
      name: "Mountain Cabin",
      customerName: "Jane Smith",
      type: "Restaurant",
      dateAdded: "2024-02-01",
      reservationPeriod: "2024-03-10 to 2024-03-20",
    },
    {
      id: "3",
      name: "Downtown Apartment",
      customerName: "Emily Brown",
      type: "Shortlet",
      dateAdded: "2024-03-05",
      reservationPeriod: "2024-04-15 to 2024-04-25",
    },
    {
      id: "4",
      name: "Luxury Penthouse",
      customerName: "Michael Green",
      type: "Restaurant",
      dateAdded: "2024-04-12",
      reservationPeriod: "2024-05-01 to 2024-05-10",
    },
  ];

  const mockApprovedProperties = [
    {
      id: "5",
      name: "Suburban House",
      customerName: "Alice Johnson",
      type: "Shorlet",
      dateAdded: "2024-05-20",
      reservationPeriod: "2024-06-01 to 2024-06-15",
    },
    {
      id: "6",
      name: "Beachfront Condo",
      customerName: "Robert Williams",
      type: "Restaurant",
      dateAdded: "2024-06-18",
      reservationPeriod: "2024-07-05 to 2024-07-20",
    },
    {
      id: "7",
      name: "Farmhouse",
      customerName: "Olivia Martinez",
      type: "Shorlet",
      dateAdded: "2024-07-25",
      reservationPeriod: "2024-08-01 to 2024-08-10",
    },
    {
      id: "8",
      name: "Lake House",
      customerName: "David Lee",
      type: "Shortlet",
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

  const handleRowClick = (property) => {
    setSelectedReservation(property);
    setShowSidePanel(true);
  };

  const handleCloseSidePanel = () => {
    setShowSidePanel(false);
    setSelectedReservation(null);
  };

  const handleApproved = () => {
    console.log("Reservation approved:", selectedReservation);
    setShowSidePanel(false);
  };

  const handleDecline = () => {
    console.log("Reservation declined:", selectedReservation);
    setShowSidePanel(false);
  };

  if (loading) return <div>Loading reservations...</div>;

  const renderTable = (title, properties, currentPage, totalPages, pageSetter) => (
    <div className="mt-2">
      <h3 className="text-lg font-weight-700 mb-2">{title}</h3>
      <div className="overflow-x-auto bg-white border rounded-xl">
        <div className="flex items-center justify-between pt-2 px-3">
          <div><DashboardSearch /></div>
          <div className="flex gap-2"><DropdownFilter /><DashboardFilter /></div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border shadow-md rounded-md table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Name</th>
                <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Customer Name</th>
                <th className="py-3 px-4 text-left text-gray-500 font-medium text-xs">Property Type</th>
                <th className="py-3 px-4 hidden sm:table-cell text-left text-gray-500 font-medium text-xs">Date Added</th>
                <th className="py-3 px-4 hidden lg:table-cell text-left text-gray-500 font-medium text-xs">Reservation Period</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(property)}
                >
                  <td className="py-3 px-4 border-b border-gray-200 text-xs">{property.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">{property.customerName}</td>
                  <td className="py-3 px-4 border-b border-gray-200 text-gray-500 text-xs">{property.type}</td>
                  <td className="py-3 px-4 hidden sm:table-cell border-b border-gray-200 text-gray-500 text-xs">{property.dateAdded}</td>
                  <td className="py-3 px-4 hidden lg:table-cell border-b border-gray-200 text-gray-500 text-xs">{property.reservationPeriod}</td>
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
                      className="flex flex-items space-x-1 px-4 py-2 text-xs border rounded-full hover:bg-gray-100 disabled:opacity-50"
                    >
                      <GrLinkPrevious className="text-gray-500 text-lg text-xs" />
                      <span className="text-gray-500 text-xs">Previous</span>
                    </button>
                    <div className="flex space-x-2">
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index + 1}
                          onClick={() => handlePageChange(pageSetter, index + 1)}
                          className={`px-3 py-1 text-sm border rounded-full ${currentPage === index + 1 ? "bg-green-100 text-green-600" : "hover:bg-gray-100"}`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleNextPage(currentPage, totalPages, pageSetter)}
                      disabled={currentPage === totalPages}
                      className="flex flex-items space-x-1 px-4 py-2 text-xs border rounded-full hover:bg-gray-100 disabled:opacity-50"
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

  return (
    <div className="p-8 flex gap-4">
      <div className="flex-1">
        <h2 className="text-xl font-weight-700">Reservations</h2>
        {renderTable("Pending", currentPending, pendingPage, pendingTotalPages, setPendingPage)}
        {renderTable("Approved", currentApproved, approvedPage, approvedTotalPages, setApprovedPage)}
      </div>

 {/* Side Panel */}
{showSidePanel && selectedReservation && (
  <div className="fixed right-0 top-0 w-1/3 bg-white shadow-md p-6 h-full border-l flex flex-col">
    <h3 className="text-lg font-weight-700 ">Reservation</h3>
    <hr className="my-5 border-t border-gray-300" />
    
    {/* Search Bar-like Text */}
    <div className="border px-4 py-2 rounded-lg  mb-8 text-sm text-gray-700">
      <span className="font-semibold text-sm ">{selectedReservation.customerName}</span> requested a reservation at <span className="font-semibold text-sm ">{selectedReservation.name}</span> for the period of <span className="font-semibold text-sm ">{selectedReservation.reservationPeriod}</span>.
    </div>

    <div className="text-sm mb-4 flex justify-between">
  <span className="text-left font-semibold text-gray-700 text-sm">Property Type:</span>
  <span className="text-right text-gray-500 text-sm">{selectedReservation.type}</span>
</div>
<div className="text-sm mb-4 flex justify-between">
  <span className="text-left font-semibold text-gray-700 text-sm">Date of Request:</span>
  <span className="text-right text-gray-500 text-sm">{selectedReservation.dateAdded}</span>
</div>
<div className="text-sm mb-4 flex justify-between">
  <span className="text-left font-semibold text-gray-700 text-sm">Reservation Date:</span>
  <span className="text-right text-gray-500 text-sm">{selectedReservation.reservationPeriod}</span>
</div>
    

    {/* Content area takes available space */}
    <div className="flex-grow"></div>

    <div className="flex justify-between gap-2 mt-4">
      <button onClick={handleApproved} className="px-10 py-2 bg-green-100 text-green-500 rounded-3xl">Approve</button>
      <button onClick={handleDecline} className="px-10 py-2 bg-red-100 text-red-500 rounded-3xl">Decline</button>
    </div>
    <button onClick={handleCloseSidePanel} className="absolute top-2 right-2 text-2xl">×</button>
  </div>
)}


    </div>
  );
};
