import { useState } from "react";
import "../layout.css";
import { Dropdown } from "./Dropdown";
import { RentalCard, RestaurantCard } from "./Card";
import Lottie from "lottie-react";
import ComingSoon from "../coming-soon.json";

import { useGlobalState } from "../Contexts/GlobalStateContext";



export const FeaturedTabs = () => {
  const [selectedTab, setSelectedTab] = useState("restaurants");
  const { restaurantImagesMap, shortletImagesMap } = useGlobalState();

  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
  };

  

  console.log(shortletImagesMap);

  return (
    <div className="featured-tabs">
      <h3 className="featured-header">Browse Featured Properties</h3>
      <div className="tab-row">
        <div
          className={`tab-item  ${selectedTab === "rentals" ? "active" : ""}`}
          onClick={() => handleTabChange("rentals")}
        >
          Shortlets
        </div>
        <div
          className={`tab-item  ${
            selectedTab === "restaurants" ? "active" : ""
          }`}
          onClick={() => handleTabChange("restaurants")}
        >
          Restaurants
        </div>
        <div
          className={`tab-item  ${
            selectedTab === "activities" ? "active" : ""
          }`}
          onClick={() => handleTabChange("activities")}
        >
          Activities
        </div>
      </div>

      {selectedTab === "rentals" && <RentalSection shortletImagesMap={shortletImagesMap} />}
      {selectedTab === "restaurants" && <RestaurantSection restaurantImagesMap={restaurantImagesMap} />}
      {selectedTab === "activities" && <ActivitiesSection />}
    </div>
  );
};

export const RentalSection = ({shortletImagesMap}) => {
  return (
    <div className="tab-content-container">
      <div className="tab-content">
        <p className="tab-content-text  ">
        Discover the perfect property. From short lets to long-term 
        rentals and dream homes for sale, 
        we offer a diverse range of housing options. 
        Immerse yourself in virtual tours, calculate expenses, 
        and stay updated with the latest listings.
        </p>
        <div>
          <div className="">
            {/* <Dropdown
              itemNumber={3}
              placeholder={"All Types"}
              itemsArray={["Type 1", "Type 2"]}
              border={"none"}
              isSearchable={false}
            /> */}
          </div>

          <div className="content-item grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {Object.entries(shortletImagesMap)
          .filter(([shortletId, shortletData]) => 
            shortletData.attributes && shortletData.attributes.includes("Featured")
          )
          .map(([shortletId, shortletData]) => (
            <RentalCard
              key={shortletId}
              type="rentals"
              id={shortletId}
              name={shortletData.name}
              address={shortletData.address}
              price={shortletData.price}
              image={shortletData.images.length > 0 ? shortletData.images[0].url : 'default-image.png'}
              width={"43.3%"}
              note={"prevue"}
            />
          ))}
        
          </div>
        </div>{" "}
      </div>
    </div>
  );
};
export const RestaurantSection = ({restaurantImagesMap}) => {
  return (
    <div className="tab-content-container">
      <div className="tab-content">
        <p className="tab-content-text  ">
        Discover the perfect property. From short lets to long-term rentals
         and dream homes for sale, we offer a diverse range of housing options. 
        Immerse yourself in virtual tours, calculate expenses, and stay updated with the latest listings.
        </p>
        <div>
          <div className="">
            {/* <Dropdown
              itemNumber={3}
              placeholder={"All Types"}
              itemsArray={["Type 1", "Type 2"]}
              border={"none"}
              isSearchable={false}
            /> */}
          </div>

          <div className="content-item grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {Object.entries(restaurantImagesMap)
          .filter(([restaurantId, restaurantData]) => 
            restaurantData.attributes && restaurantData.attributes.includes("Featured")
          )
          .map(([restaurantId, restaurantData]) => (
            <RestaurantCard
              key={restaurantId}
              type="restaurants"
              id={restaurantId}
              name={restaurantData.name}
              address={restaurantData.address}
              image={restaurantData.images.length > 0 ? restaurantData.images[0].url : 'default-image.png'}
              width={"43.3%"}
              note={"prevue"}
            />
          ))}
           
          </div>
        </div>
      </div>
    </div>
  );
};
export const ActivitiesSection = () => {
  return (
    <div className="tab-content-container">
      <div className="tab-content">
        <p className="tab-content-text  ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
        <div className="content-row">
          {/* <Dropdown
            itemNumber={3}
            placeholder={"All Types"}
            itemsArray={["Type 1", "Type 2"]}
            border={"none"}
            isSearchable={false}
          /> */}
          <div className="content-item">
            <Lottie style={{ width: "250px" }} animationData={ComingSoon} />
          </div>
        </div>
      </div>
    </div>
  );
};
