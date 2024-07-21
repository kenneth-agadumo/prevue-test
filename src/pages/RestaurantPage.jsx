import React from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../Contexts/GlobalStateContext";

export const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { restaurantImagesMap } = useGlobalState();
  const restaurantData = restaurantImagesMap[restaurantId];

  if (!restaurantData) {
    return <div>Restaurant not found</div>;
  }

  
   return(
        <>
           
    <div className="restaurant-detail">
      <h1>{restaurantData.name}</h1>
      <p>{restaurantData.address}</p>
      {restaurantData.images.map((image, index) => (
        <img key={index} src={image.url} alt={restaurantData.name} />
      ))}
      <p>{restaurantData.description}</p>
    </div>
    <div className="description">
                <div className="description-left">
                    <div className="description-info">
                        <h4>Cactus Restaurant</h4>
                        <p>Okunde Bluewaters scheme Twinwaters Lagos, off Remi Olowude St, Eti-Osa, Lekki</p>
                        <img src="prevue.png" alt="" /><img src="prevue.png" alt="" /><img src="prevue.png" alt="" /><img src="prevue.png" alt="" />
                    </div>
                    <div className="description-about">
                        
                    </div>
                </div>
                <div className="description-right">

                </div>
            </div>
        </>
    )
};
   
