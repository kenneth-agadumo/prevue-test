import { useState, useEffect } from "react";
import "../layout.css";
import { Dropdown } from "./Dropdown";
import { RentalCard, RestaurantCard } from "./Card";
import Lottie from "lottie-react";
import ComingSoon from "../coming-soon.json";

import { useGlobalState } from "../Contexts/GlobalStateContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

import {  CardLoading } from "./Loading";





export const FeaturedTabs = () => {
  const [selectedTab, setSelectedTab] = useState("restaurants");
  const [filteredData, setFilteredData] = useState({ restaurants: {}, shortlets: {} });
  const [isLoading, setIsLoading] = useState(false);
  const {fetchFilteredData} = useGlobalState()


  const handleTabChange = (newValue) => {
    setSelectedTab(newValue);
    console.log(newValue)
  };


  const restaurantRef = collection(db, 'restaurants');
  const shortletRef = collection(db, 'shortlets'); 
  const userRef = collection(db, 'users'); 
 
  

 



  useEffect(() => {
    if (!selectedTab) return;  // Avoid fetching with an empty state
  
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchFilteredData(selectedTab, "attributes", "array-contains", "Featured");
        setFilteredData((prevState) => ({
          ...prevState,
          [selectedTab]: data,
        }));
      } catch (error) {
        console.error("Error fetching filtered data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [selectedTab]);  
  


 
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
            selectedTab === "shortlets"
              ? "border-green-500 text-green-500 font-semibold"
              : "border-transparent text-primary hover:text-primary hover:border-primary"
          }`}
          onClick={() => handleTabChange("shortlets")}
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

     
        {selectedTab === "shortlets" ? (
        <RentalSection data={filteredData.shortlets} isLoading={isLoading}/>
      ) : selectedTab === "restaurants" ? (
        <RestaurantSection data={filteredData.restaurants} isLoading={isLoading} />
      ) : (
        <ActivitiesSection />
      )}
    </div>
  );
};






export const RentalSection = ({ data, isLoading }) => {

  return (
    <div className="tab-content-container">
      <div className="tab-content p-6 bg-gray-50 rounded-lg shadow-md box-border">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Find Your Dream Home
        </h2>
          <div className="content-item grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {isLoading ? 
          <>
            <CardLoading />
            <CardLoading />
            <CardLoading />
          </>
           : (
            Object.entries(data).map(([id, shortletData]) => (
              <RentalCard
                key={id}
                image={shortletData.images?.[0]?.url || "default-image.png"}
                name={shortletData.propertyName}
                address={shortletData.address}
                virtualTour={shortletData.virtualTourLink}
                price={shortletData.price}
                note={shortletData.about}
                type="rentals"
                id={id}
                rating={4.8}
                amenities={shortletData.amenities}
              />
            ))

          )}
          </div>
        
      </div>
    </div>
  );
}


export const RestaurantSection = ({ data, isLoading }) => {


  return (
    <div className="tab-content-container">
      <div className="tab-content p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Discover Exquisite Dining Experiences
        </h2>
        <div className="content-item grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {isLoading ?
          <>
            <CardLoading/>
            <CardLoading/>
            <CardLoading/>  
          </>
          :
           
          Object.entries(data).map(([id, restaurantData]) => (
            <RestaurantCard
              key={id}
              image={restaurantData.images?.[0]?.url || "default-image.png"}
              name={restaurantData.name}
              address={restaurantData.address}
              virtualTour = {restaurantData.virtualTourLink}
              cuisine="Italian Cuisine"
              priceRange="$$ - $$$"
              type="restaurants"
              id={id}
              rating={4.6}
            />
          ))
        }
          
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
          We'll be coming to you soon with the most bubbling activities in a city near you 😉
        </p> 
        <div className="content-row">
        
          <div className="content-item">
            <Lottie style={{ width: "250px" }} animationData={ComingSoon} />
          </div>
        </div>
      </div>
    </div>
  );
};

