
import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Dropdown } from "../components/Dropdown";
import { RentalCard } from "../components/Card";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { storage } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export const Rentals = () => {
    const { userData, rentals, shortletImagesMap} = useGlobalState();
    
   


    return (
        <>
            <div className="rental-top-section px-[50px] ">
                <h1 className="text-2xl mb-8 ">Shortlets</h1>
                <p className="">
                    Discover the perfect property. From short lets to long-term rentals and dream homes for sale, we offer a diverse range of housing options.
                    Immerse yourself in virtual tours, calculate expenses, and stay updated with the latest listings.
                </p>
            </div>
            <div className="rental-catalogue">
                <div className="catalogue-top-row" >
                    <Dropdown itemNumber={3} itemsArray={['Filters', 'Type 1', 'Type 2']} border='none' />
                    <div className="rental-search-bar">
                        <div className="flex items-center gap-[16px]">
                            <img src="/search.svg" alt="" />
                            <input type="text" placeholder="Search Property by name, type or location" />
                        </div>
                        <Dropdown itemNumber={3} itemsArray={['All Types', 'Recent', 'Popular']} border='none'  />
                    </div>
                    <Dropdown itemNumber={3} itemsArray={['Featured', 'Recent', 'Popular']} border='none'  />
                </div>


                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 mx-auto" style={{width: '90%'}}  >
                {Object.entries(shortletImagesMap).map(([shortletId, shortletData]) => (
                    
                    <RentalCard
                    key={shortletId}  
                    type="rentals"
                    id={shortletId}
                    address={shortletData.address}        
                    price={shortletData.price}
                    image={shortletData.images.length > 0 ? shortletData.images[0].url : 'default-image.png'}
                    width={'33%'}
                    onHeartClick={() => {
                        // Handle the heart click (e.g., add to favorites)
                        console.log(`Rental ${shortletId} favorited!`);
                      }}
                    />
                
                ))}

                </div>
                <div className="load-more">
                    {/* <button>Load More</button> */}
                </div>
            </div>
           <Footer/>
        </>
    );
};