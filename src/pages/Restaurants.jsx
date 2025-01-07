import React from "react";
import { Dropdown } from "../components/Dropdown";
import { RestaurantCard } from "../components/Card";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";


export const Restaurants = () => {
  const { restaurantImagesMap } = useGlobalState();
  const navigate = useNavigate();


  

  return (
    <div >
      <div className="rental-top-section ">
        <h1>Restaurants</h1>
        <p >
          Discover the perfect property. From short lets to long-term rentals and dream homes for sale, we offer a diverse range of housing options.
          Immerse yourself in virtual tours, calculate expenses, and stay updated with the latest listings.
        </p>
      </div>
      <div className="rental-catalogue">
        <div className="catalogue-top-row">
          <Dropdown itemNumber={3} itemsArray={['Filters', 'Type 1', 'Type 2']} border='none' />
          <div className="rental-search-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src="search.svg" alt="" />
              <input type="text" placeholder="Search Property by name, type or location" />
            </div>
            <Dropdown itemNumber={3} itemsArray={['All Types', 'Recent', 'Popular']}  border='none'/>
          </div>
          <Dropdown itemNumber={3} itemsArray={['Featured', 'Recent', 'Popular']} border='none'/>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 py-6 mx-auto" style={{width: '90%'}} >
          {Object.entries(restaurantImagesMap).map(([restaurantId, restaurantData]) => (
            
             // eslint-disable-next-line react/jsx-key
             <RestaurantCard
              type="restaurants"
               id={restaurantId}
               name={restaurantData.name}
               address={restaurantData.address}
               image={restaurantData.images.length > 0 ? restaurantData.images[0].url : '/default-image.png'}
              
             />
           
          ))}
        </div>
        
        <div className="load-more justify-center grid">
          <button>Load More</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};