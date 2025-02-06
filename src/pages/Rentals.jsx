import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { Dropdown } from "../components/Dropdown";
import { RentalCard } from "../components/Card";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { storage } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export const Rentals = () => {
  const { userData, rentals, shortletImagesMap } = useGlobalState();

  return (
    <>
      <div className="w-full bg-primary text-white py-16 mt-16">
        <div className="flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-semibold mb-6 leading-tight">
            Find Your Perfect Property
          </h1>
          <p className="max-w-3xl text-lg text-gray-200 mb-6">
            Whether you're looking for short-term rentals, dream homes for sale,
            or vacation properties, we offer a variety of options to suit your
            needs. Explore virtual tours, calculate your expenses, and stay
            up-to-date with the latest listings.
          </p>
        </div>
      </div>

      <div className="rental-catalogue py-16">
        <div className="catalogue-top-row px-6 flex flex-col md:flex-row justify-between mb-8">
          <Dropdown
            itemNumber={3}
            itemsArray={["Filters", "Type 1", "Type 2"]}
            border="none"
          />
          <div className="rental-search-bar flex items-center gap-[16px] mt-4 md:mt-0">
            <img src="/search.svg" alt="search" />
            <input
              type="text"
              placeholder="Search Property by name, type or location"
              className="px-4 py-2 border rounded-lg w-full"
            />
          </div>
          <Dropdown
            itemNumber={3}
            itemsArray={["All Types", "Recent", "Popular"]}
            border="none"
          />
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-6">
          {Object.entries(shortletImagesMap).map(
            ([shortletId, shortletData]) => (
              <RentalCard
               virtualTour="https://kuula.co/share/h5Hpv?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
                key={shortletId}
                type="rentals"
                id={shortletId}
                address={shortletData.address}
                price={shortletData.price}
               /* image={
                  shortletData.images.length > 0
                    ? shortletData.images[0].url
                    : "default-image.png"
                }*/
                width={"100%"}
                onHeartClick={() => {
                  // Handle the heart click (e.g., add to favorites)
                  console.log(`Rental ${shortletId} favorited!`);
                }}
              />
            )
          )}
        </div>

        <div className="load-more flex justify-center mt-8">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg">
            Load More
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};
