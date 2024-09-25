
import { useState, useEffect } from "react";
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { Dropdown } from "../components/Dropdown";
import { RentalCard } from "../components/Card";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { storage } from "../firebaseConfig";

export const Rentals = () => {
    const { userData, rentals, rentalImagesMap} = useGlobalState();
    
   


    return (
        <>
            <div className="rental-top-section px-[50px]">
                <h1>Shortlets</h1>
                <p>
                    Discover the perfect property. From short lets to long-term rentals and dream homes for sale, we offer a diverse range of housing options.
                    Immerse yourself in virtual tours, calculate expenses, and stay updated with the latest listings.
                </p>
            </div>
            <div className="rental-catalogue">
                <div className="catalogue-top-row" >
                    <Dropdown itemNumber={3} itemsArray={['Filters', 'Type 1', 'Type 2']} border='none' />
                    <div className="rental-search-bar">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <img src="/search.svg" alt="" />
                            <input type="text" placeholder="Search Property by name, type or location" />
                        </div>
                        <Dropdown itemNumber={3} itemsArray={['All Types', 'Recent', 'Popular']} border='none'  />
                    </div>
                    <Dropdown itemNumber={3} itemsArray={['Featured', 'Recent', 'Popular']} border='none'  />
                </div>
                <div className="catalogue">
                {Object.entries(rentalImagesMap).map(([rentalId, rentalData]) => (
                    <RentalCard
                    key={rentalId}  
                    address={rentalData.address}        
                    price={rentalData.price}
                    image={rentalData.images.length > 0 ? rentalData.images[0].url : 'default-image.png'}
                    width={'33%'}
                    />
                ))}

                </div>
                <div className="load-more">
                    {/* <button>Load More</button> */}
                </div>
            </div>
            <div className="footer">
                <div className="footer-row-1">
                    <div className="row1-left">
                        <p className='newsletter-header'>Stay Updated</p>
                        <p className='newsletter-text'>Subscribe to our newsletter for the latest location previews and special offers</p>
                        <div className="newsletter">
                            <input type="email" name="n-email" placeholder='Yourown@gmail.com' id="" style={{ color: '#fdfdfd' }} />
                            <button>Go <img src="/forward.svg" alt="" /></button>
                        </div>
                    </div>
                    <div className="row1-right">
                        <ul>
                            <p>Quick Links</p>
                            <li>Home</li>
                            <li>Restaurants</li>
                            <li>Properties</li>
                            <li>Activities</li>
                        </ul>
                        <ul>
                            <p>Socials</p>
                            <li>X(Twitter)</li>
                            <li>Instagram</li>
                            <li>LinkedIn</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-row-2">
                    <div className="column">
                        <p>info@prevue.com</p>
                        <p>+234 81234567890</p>
                    </div>
                    <p> ©2023 legal</p>
                </div>
                <div className="footer-row-3">
                    <img src="prevue.png" alt="" />
                </div>
            </div>
        </>
    );
};