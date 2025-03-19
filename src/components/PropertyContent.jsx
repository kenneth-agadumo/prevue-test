import React, { useEffect, useState } from "react";
import DashboardFilter from "./DashboardFilter";
import DashboardSearch from "./DashboardSearch";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import DropdownFilter from "./DropdownFilter";
import RestaurantModal from "./RestaurantModal";
import AddPropertyButton from "./AddProperty";
import { managerAuth, db, storage } from "../firebaseConfig";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { MdDelete } from "react-icons/md";
import LoadingHouse from './Loading';



export const PropertiesContent = () => {
  const { fetchFilteredData, shortletImagesMap, restaurantImagesMap, setLoading } = useGlobalState();

  const [userProperties, setUserProperties] = useState([]); // Combined restaurant and shortlet properties
  const [properties, setProperties] = useState([]); // Combined restaurant and shortlet properties
  const [filteredProperties, setFilteredProperties] = useState([]); // Filtered properties for display
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 7;
  const currentUser = managerAuth.currentUser?.uid;


   useEffect(() => {
    // If there's no authenticated user, do nothing.
    if (!currentUser) return;

    // Try to get data from local storage
    const storedData = localStorage.getItem('userProperties');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserProperties(parsedData);
      setProperties(parsedData);
      setFilteredProperties(parsedData);
      setIsLoading(false)
      return; // Data is already loaded; exit the effect.
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch data from your sources
        const userRestaurants = await fetchFilteredData("restaurants", "userId", "==", currentUser);
        const userShortlets = await fetchFilteredData("shortlets", "userId", "==", currentUser);

        // Combine restaurants and shortlets
        const combinedProperties = [
          ...Object.entries(userRestaurants).map(([id, data]) => ({
            id,
            ...data,
            type: "Restaurant",
          })),
          ...Object.entries(userShortlets).map(([id, data]) => ({
            id,
            ...data,
            type: "Shortlet",
          })),
        ];

        // Store the data in both state and local storage
        setUserProperties(combinedProperties);
        setProperties(combinedProperties);
        setFilteredProperties(combinedProperties);
        localStorage.setItem('userProperties', JSON.stringify(combinedProperties));
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentUser]); 
  

  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    startIndex,
    startIndex + propertiesPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const handleDelete = async (property) => {
   
      setIsLoading(true);
      try {
        // Delete property document
        await deleteDoc(doc(managerAuth.currentUser ? db : null, property.type.toLowerCase(), property.id));

        // Delete associated images
        const imageRefs = property.images.map((image) =>
          ref(storage, `${property.type.toLowerCase()}s/${property.id}-${image.name}`)
        );

        for (const imageRef of imageRefs) {
          await deleteObject(imageRef);
        }

        // Remove property from the local state
        const updatedProperties = properties.filter((p) => p.id !== property.id);
        setProperties(updatedProperties);
        setFilteredProperties(updatedProperties);
        alert(`${property.name} has been successfully deleted.`);
      } catch (error) {
        console.error("Error deleting property:", error);
        alert("An error occurred while deleting the property.");
      } finally {
        setIsLoading(false);
      }
    
  };

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

  // if (isLoading) return <div>Loading properties...</div>;

  return (
    <div className="overflow-hidden">
      <div>
        <h2 className="text-xl font-weight-700 mb-1">Properties</h2>
        <p className="text-gray-500 text-sm mb-2">
          Showing data for the last
          <span className="text-[#f2a20e] text-sm border-b-2 border-[#f2a20e]"> 30 days</span>
        </p>
        <div className="flex flex-row-reverse mb-2">
          <AddPropertyButton />
        </div>
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
        { isLoading  ? 
          <div className="w-full flex justify-center items-center">
            <LoadingHouse/>
          </div>
        : (
          <table className="min-w-full bg-white border shadow-md rounded-md table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-6 text-left text-gray-500 font-medium text-sm">Property Name</th>
                <th className="p-6 px-4 text-left text-gray-500 font-medium text-sm">Property Type</th>
                <th className="p-6 px-4 hidden sm:table-cell text-left text-gray-500 font-medium text-sm">Date Added</th>
                <th className="p-6 px-4 hidden lg:table-cell text-left text-gray-500 font-medium text-sm">No. of Reservations</th>
                <th className="p-6 px-4 text-left text-gray-500 font-medium text-sm"></th>
              </tr>
            </thead>
            <tbody>
              { !currentProperties.length ?
                (
                  <div className="p-11 w-full flex justify-center">
                    <p className="text-sm">You haven't added any properties yet</p>
                  </div>
                )
              :
                currentProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-primarylight cursor-pointer">
                    <td className="p-6 border-b border-gray-200 text-sm">{property.name || property.propertyName}</td>
                    <td className="p-6 border-b border-gray-200 text-gray-500 text-sm">{property.type}</td>
                    <td className="p-6 hidden sm:table-cell border-b border-gray-200 text-gray-500 text-sm">
                      {property.dateAdded}
                    </td>
                    <td className="p-6 hidden lg:table-cell border-b border-gray-200 text-gray-500 text-sm">
                      {property.reservations}
                    </td>
                    <td className="p-6 border-b border-gray-200 text-gray-500 text-sm">
                      <MdDelete
                        onClick={() => handleDelete(property)}
                        className="text-gray-700 size-4 hover:text-red-500"
                      />
                      
                    </td>
                  </tr>
                ))
              }
              
              {/* Pagination Row */}
              <tr>
                <td colSpan="5" className="p-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={handlePreviousPage}
                      disabled={currentPage === 1}
                      className={`flex items-center space-x-1 px-4 py-2 text-xs border border-gray-300 rounded-full ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <GrLinkPrevious />
                      <span>Previous</span>
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`flex items-center space-x-1 px-4 py-2 text-xs border border-gray-300 rounded-full ${
                        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <span>Next</span>
                      <GrLinkNext />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
