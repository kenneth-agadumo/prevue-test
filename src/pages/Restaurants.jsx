import { useState } from "react";
import { Dropdown } from "../components/Dropdown";
import { RestaurantCard } from "../components/Card";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import Footer from "../components/Footer";
import RestaurantsCarousel from "../components/RestaurantsCarousel";
import useRestaurants from "../hooks/useRestaurants";

export const Restaurants = () => {
  const { restaurants, loadMore, loading } = useRestaurants();
  const { restaurantImagesMap } = useGlobalState();
  const [viewType, setViewType] = useState("card");


console.log(restaurants)
  return (
    <div>
      <div className="w-full bg-primary text-white py-16 mt-16">
        <div className="flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-semibold mb-6 leading-tight">
            Find Your Perfect Resturants
          </h1>
          <p className="max-w-3xl text-lg text-gray-200 mb-6">
            Looking for the best dining experiences? Discover top-rated
            restaurants, trendy spots, and hidden gems across the city. From
            fine dining to casual eateries, explore a variety of cuisines, view
            menus, and make reservations easily.
          </p>
        </div>
      </div>
      <div className="rental-catalogue">
        <div className="catalogue-top-row">
          <Dropdown
            itemNumber={3}
            itemsArray={["Filters", "Type 1", "Type 2"]}
            border="none"
          />
          <div className="rental-search-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <img src="search.svg" alt="" />
              <input
                type="text"
                placeholder="Search Property by name, type or location"
              />
            </div>
            <Dropdown
              itemNumber={3}
              itemsArray={["All Types", "Recent", "Popular"]}
              border="none"
            />
          </div>
          <Dropdown
            itemNumber={3}
            itemsArray={["Featured", "Recent", "Popular"]}
            border="none"
          />
          <button
            onClick={() => setViewType(viewType === "grid" ? "cards" : "grid")}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg ml-4"
          >
            {viewType === "grid" ? "Grid View" : " Card View"}
          </button>
        </div>

        {viewType === "grid" ? (
          <RestaurantsCarousel restaurants={restaurants} />
        ) : (
          <>
            <div
              className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 py-6 mx-auto"
              style={{ width: "90%" }}
            >
              {restaurants.map(
                (restaurant) => (
                 
                  <RestaurantCard
                    type="restaurants"
                    id={restaurant.id}
                    name={restaurant.name}
                    address={restaurant.address}
                    virtualTour={restaurant.virtualTourLink}
                  />
                )
              )}
            </div>
            <div>
              <div className="load-more flex justify-center mt-8">
                <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">
                  Load More
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};
