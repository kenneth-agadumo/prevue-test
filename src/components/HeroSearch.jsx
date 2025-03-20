import { useState } from "react";
import { Dropdown } from "./Dropdown";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { useNavigate } from "react-router-dom";

export const HeroSearch = () => {
  const { restaurantImagesMap, shortletImagesMap } = useGlobalState();
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

    navigate("/exploreShortletsAndRestaurants", {
      state: {
        category,
        searchResults: results,
      },
    });
  };

  return (
    <div className="hero-search-bar ">
      <div className="hero-dropdown-1">
        <label htmlFor="">Property Type</label>
        <Dropdown
          itemNumber={2}
          placeholder={"Property Type"}
          itemsArray={["Shortlets", "Restaurants"]}
          width={"200px"}
          border={"none"}
          isSearchable={false}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="hero-dropdown-2">
        <label htmlFor="">Category</label>
        <Dropdown
          itemNumber={3}
          placeholder={"Category"}
          itemsArray={["All", "Popular", "Recent"]}
          width={"200px"}
          border={"none"}
          isSearchable={false}
          onChange={handleSubCategoryChange}
        />
      </div>
      <div className="hero-dropdown-3">
        <label htmlFor="">Location</label>
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
        className="hero-search-button justify-center grid bg-black items-center hover:bg-stone-900"
        onClick={handleSearch}
      >
        <img src="search-white.svg" alt="Search" />
      </button>
    </div>
  );
};
