import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { SearchResults } from "./SearchResults";

export const HeroSearch = () => {
  const { restaurantImagesMap, shortletImagesMap } = useGlobalState();

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const restaurantItems = Object.entries(restaurantImagesMap).map(
    ([restaurantId, restaurantData]) => ({
      id: restaurantId,
      address: restaurantData.address,
      name: restaurantData.name,
      images: restaurantData.images,
    })
  );

  const shortletItems = Object.entries(shortletImagesMap).map(
    ([shortletId, shortletData]) => ({
      id: shortletId,
      address: shortletData.address,
      price: shortletData.price,
      images: shortletData.images,
    })
  );

  const handleCategoryChange = (selectedCategory) =>
    setCategory(selectedCategory);
  const handleSubCategoryChange = (selectedSubCategory) =>
    setSubCategory(selectedSubCategory);
  const handleLocationChange = (selectedLocation) =>
    setLocation(selectedLocation);

  const handleSearch = () => {
    let results = [];

    if (category === "Restaurants") {
      results = restaurantItems.filter((item) =>
        location ? item.address.includes(location) : true
      );
    } else if (category === "Rentals") {
      results = shortletItems.filter((item) =>
        location ? item.address.includes(location) : true
      );
    }

    setSearchResults(results);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white rounded-full p-1.5 pl-4 flex items-center relative">
      <div className="w-1/3 flex flex-col justify-center gap-1.5 px-3">
        <label className="text-gray-400">Category</label>
        <Dropdown
          itemNumber={2}
          placeholder={"Category"}
          itemsArray={["Shortlets", "Restaurants"]}
          width={"200px"}
          border={"none"}
          isSearchable={false}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="w-1/3 flex flex-col justify-center gap-1.5 px-3 border-l border-gray-300">
        <label className="text-gray-400">Sub-category</label>
        <Dropdown
          itemNumber={3}
          placeholder={"Sub-Category"}
          itemsArray={["All", "Popular", "Recent"]}
          width={"200px"}
          border={"none"}
          isSearchable={false}
          onChange={handleSubCategoryChange}
        />
      </div>
      <div className="w-1/3 flex flex-col justify-center gap-1.5 px-3 border-l border-gray-300">
        <label className="text-gray-400">Location</label>
        <Dropdown
          itemNumber={3}
          placeholder={"Location"}
          itemsArray={[
            ...restaurantItems.map((res) => res.address),
            ...shortletItems.map((ren) => ren.address),
          ]}
          width={"200px"}
          border={"none"}
          onChange={handleLocationChange}
        />
      </div>
      <button
        className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-700 ml-4"
        onClick={handleSearch}
      >
        <img src="search-white.svg" alt="Search" className="w-4 h-4" />
      </button>

      {isModalOpen && (
        <>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
            <SearchResults results={searchResults} category={category} />
          </div>

          <style jsx>{`
            .modal-content {
              background-color: white;
              border-radius: 0;
              position: fixed;
              margin: 0;
              padding: 40px;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              display: flex;
              z-index: 1000; /* Ensure it is above other elements */
            }

            .modal-close {
              position: absolute;
              top: 40px;
              right: 40px;
              background: transparent;
              border: none;
              font-size: 20px;
              cursor: pointer;
            }
          `}</style>
        </>
      )}
    </div>
  );
};
