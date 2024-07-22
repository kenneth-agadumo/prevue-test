import {React, useState} from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import {ImageSlider} from '../components/ImageSlider'
import Lottie from "lottie-react" 
import Heart from  '../heart.json'  

export const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { restaurantImagesMap } = useGlobalState();
  const restaurantData = restaurantImagesMap[restaurantId];

  const [iconclicked, setIconClicked] = useState(false);
  
  const handleDoubleClick = () => {
        setIconClicked(!iconclicked)
  };

  if (!restaurantData) {
    return <div>Restaurant not found</div>;
  }

  const imageUrls = restaurantData?.images?.map(image => image.url);
   return(
        <>
            <div className="slider">
                <ImageSlider images={imageUrls} />
            </div>
            
    {/* <div className="restaurant-detail">
      <h1>{restaurantData.name}</h1>
      <p>{restaurantData.address}</p>
      {restaurantData.images.map((image, index) => (
        <img key={index} src={image.url} alt={restaurantData.name} />
      ))}
      <p>{restaurantData.description}</p>
    </div> */}
    <div className="description">
                <div className="description-left">
                    <div className="description-header">
                        <div className='d-header'>
                            <h4>Cactus Restaurant</h4>
                            <p>Okunde Bluewaters scheme Twinwaters Lagos, off Remi Olowude St, Eti-Osa, Lekki</p>
                           
                        </div>
                        <div className="like-share" style={{boxSizing:'border-box', overflow: 'hidden'}}>
                            {!iconclicked ? <img className="like" style={{width: '25px', padding:'15px'}} src ='/unlike.svg' alt="" onDoubleClick={handleDoubleClick} /> : <Lottie style={{width:'60px'}} animationData={Heart} loop={false} onDoubleClick={handleDoubleClick} />}

                        </div>
                       
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
   
