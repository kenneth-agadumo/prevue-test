// import { useState } from "react";
// import { Dropdown } from "./Dropdown";
// import { useGlobalState } from "../Contexts/GlobalStateContext";
// import { SearchResults } from "./SearchResults";

// export const HeroSearch = () => {
//   const { restaurantImagesMap, shortletImagesMap } = useGlobalState();

//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [location, setLocation] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

//   const restaurantItems = Object.entries(restaurantImagesMap).map(
//     ([restaurantId, restaurantData]) => ({
//       id: restaurantId,
//       address: restaurantData.address,
//       name: restaurantData.name,
//       images: restaurantData.images,
//     })
//   );

//   const shortletItems = Object.entries(shortletImagesMap).map(
//     ([shortletId, shortletData]) => ({
//       id: shortletId,
//       address: shortletData.address,
//       price: shortletData.price,
//       images: shortletData.images,
//     })
//   );

//   const handleCategoryChange = (selectedCategory) =>
//     setCategory(selectedCategory);
//   const handleSubCategoryChange = (selectedSubCategory) =>
//     setSubCategory(selectedSubCategory);
//   const handleLocationChange = (selectedLocation) =>
//     setLocation(selectedLocation);

//   const handleSearch = () => {
//     let results = [];

//     if (category === "Restaurants") {
//       results = restaurantItems.filter((item) =>
//         location ? item.address.includes(location) : true
//       );
//     } else if (category === "Rentals") {
//       results = shortletItems.filter((item) =>
//         location ? item.address.includes(location) : true
//       );
//     }

//     setSearchResults(results);
//     setIsModalOpen(true); // Open the modal when search is triggered
//   };

//   const closeModal = () => {
//     setIsModalOpen(false); // Close the modal
//   };

//   return (
//     <div className="hero-search-bar ">
//       <div className="hero-dropdown-1">
//         <label htmlFor="">Category</label>
//         <Dropdown
//           itemNumber={2}
//           placeholder={"Category"}
//           itemsArray={["Shortlets", "Restaurants"]}
//           width={"200px"}
//           border={"none"}
//           isSearchable={false}
//           onChange={handleCategoryChange}
//         />
//       </div>
//       <div className="hero-dropdown-2">
//         <label htmlFor="">Sub-category</label>
//         <Dropdown
//           itemNumber={3}
//           placeholder={"Sub-Category"}
//           itemsArray={["All", "Popular", "Recent"]}
//           width={"200px"}
//           border={"none"}
//           isSearchable={false}
//           onChange={handleSubCategoryChange}
//         />
//       </div>
//       <div className="hero-dropdown-3">
//         <label htmlFor="">Location</label>
//         <Dropdown
//           itemNumber={3}
//           placeholder={"Location"}
//           itemsArray={[
//             ...restaurantItems.map((res) => res.address),
//             ...shortletItems.map((ren) => ren.address),
//           ]}
//           width={"200px"}
//           border={"none"}
//           onChange={handleLocationChange}
//         />
//       </div>
//       <button
//         className="hero-search-button justify-center grid items-center hover:bg-stone-900"
//         onClick={handleSearch}
//       >
//         <img src="search-white.svg" alt="Search" />
//       </button>

//       {/* Search Results as a Modal */}
//       {isModalOpen && (
//         <>
//           <div className="modal-content">
//             <button className="modal-close" onClick={closeModal}>
//               X
//             </button>
//             <SearchResults results={searchResults} category={category} />
//           </div>

//           <style jsx>{`
//             .modal-content {
//               background-color: white;
//               border-radius: 0;
//               position: fixed;
//               margin: 0;
//               padding: 40px;
//               top: 0;
//               left: 0;
//               width: 100%;
//               height: 100%;
//               display: flex;
//               z-index: 1000; /* Ensure it is above other elements */
//             }

//             .modal-close {
//               position: absolute;
//               top: 40px;
//               right: 40px;
//               background: transparent;
//               border: none;
//               font-size: 20px;
//               cursor: pointer;
//             }
//           `}</style>
//         </>
//       )}
//     </div>
//   );
// };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "./Dropdown";
import { useGlobalState } from "../Contexts/GlobalStateContext";

export const HeroSearch = () => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const { restaurantImagesMap, shortletImagesMap } = useGlobalState();

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
    navigate(`/search-results?category=${category}&location=${location}`);
  };

  return (
    <div className="hero-search-bar">
      <div className="hero-dropdown-1">
        <label>Category</label>
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
      <div className="hero-dropdown-2">
        <label>Sub-category</label>
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
      <div className="hero-dropdown-3">
        <label>Location</label>
        <Dropdown
          itemNumber={3}
          placeholder={"Location"}
          // itemsArray={["Location 1", "Location 2", "Location 3"]} // Example locations
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
        className="hero-search-button justify-center grid items-center hover:bg-stone-900"
        onClick={handleSearch}
      >
        <img src="search-white.svg" alt="Search" />
      </button>
    </div>
  );
};
