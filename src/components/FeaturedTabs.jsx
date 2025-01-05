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
    <div className="featured-tabs bg-gradient-to-b from-gray-50 to-white py-12">
      <h3 className="text-4xl font-bold text-center text-gray-800 mb-4">
        Browse Featured Properties
      </h3>
      <p className="text-center text-gray-600 mb-8 leading-relaxed">
        Discover the perfect property. From short lets to long-term rentals and
        dream homes for sale, we offer a diverse range of housing options.
      </p>

      <div className="flex justify-center space-x-4 mb-6">
        <div
          className={`cursor-pointer px-4 py-2 border-b-2 ${
            selectedTab === "rentals"
              ? "border-green-500 text-green-500 font-semibold"
              : "border-transparent text-primary hover:text-primary hover:border-primary"
          }`}
          onClick={() => handleTabChange("rentals")}
        >
          Shortlets
        </div>
        <div
          className={`cursor-pointer px-4 py-2 border-b-2 ${
            selectedTab === "restaurants"
              ? "border-green-500 text-green-500 font-semibold"
              : "border-transparent text-primary hover:text-primary hover:border-primary"
          }`}
          onClick={() => handleTabChange("restaurants")}
        >
          Restaurants
        </div>
        <div
          className={`cursor-pointer px-4 py-2 border-b-2 ${
            selectedTab === "activities"
              ? "border-green-500 text-green-500 font-semibold"
              : "border-transparent text-primary hover:text-primary hover:border-primary"
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
      <div className="tab-content p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Find Your Dream Home
        </h2>
        <p className="tab-content-text text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-800">
            Discover the perfect property.
          </span>
          From
          <span className="text-emerald-500 font-semibold"> short lets</span> to
          <span className="text-emerald-500 font-semibold">
            long-term rentals
          </span>
          and dream homes for sale, we offer a diverse range of housing options.
          <span className="font-semibold text-gray-800">Immerse yourself</span>
          in virtual tours, calculate expenses, and stay updated with the latest
          listings.
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
              image="/crust.png"
              name="Luxury 2-Bedroom Apartment"
              address="Lekki Phase 1, Lagos"
              price="20,000"
              note="10 mins from the beach"
              type="shortlet"
              id="1"
              rating={4.8}
              amenities={["Wi-Fi", "Parking", "Pool", "Air Conditioning"]}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export const RestaurantSection = ({restaurantImagesMap}) => {
  return (
    <div className="tab-content-container">
      <div className="tab-content p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Discover Exquisite Dining Experiences
        </h2>
        <p className="tab-content-text text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-800">From cozy</span>{" "}
          <span className="text-emerald-500 font-semibold">cafes</span> to
          <span className="text-emerald-500 font-semibold"> fine dining</span>,
          we showcase a curated selection of restaurants that satisfy every
          palate.{" "}
          <span className="font-semibold text-gray-800">Explore menus</span>,
          browse reviews, and uncover hidden gems in your area.
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

              image={restaurantData.images.length > 0 ? restaurantData.images[0].url : 'default-image.png'}
              name={restaurantData.name}
              address={restaurantData.address}
              cuisine="Italian Cuisine"
              priceRange="$$ - $$$"
              type="restaurant"
              id={restaurantId}
              rating={4.6}
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
