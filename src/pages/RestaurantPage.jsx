import {React, useState} from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import {ImageSlider} from '../components/ImageSlider'
import {Map} from '../components/Map'
import Lottie from "lottie-react" 
import ReservationForm from "../components/RervationForm";
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
                            <div>    
                                <h4 style={{marginBottom: "6px", fontSize: '22px'}} >Cactus Restaurant</h4>
                                <p>Okunde Bluewaters scheme Twinwaters Lagos, off Remi Olowude St, Eti-Osa, Lekki</p>
                            </div>
                           
                            <div className="like-share" style={{boxSizing:'border-box', overflow: 'hidden'}}>
                                {!iconclicked ? <img className="like" style={{width: '25px', padding:'15px'}} src ='/unlike.svg' alt="" onDoubleClick={handleDoubleClick} /> : <Lottie style={{width:'60px'}} animationData={Heart} loop={false} onDoubleClick={handleDoubleClick} />}
                                <img className="share"  src ='/share.svg' alt="" onDoubleClick={handleDoubleClick} /> 
                            </div>
                        </div>
                    </div>
                    <div className="description-about">
                        <h4 style={{color:'var(--primary-color)', fontWeight:'300', marginBottom:'16px'}}>About Property</h4>
                        <p style={{wordSpacing:'3px'}}>
                            Discover the perfect property. From short lets to long-term rentals and dream homes for sale, 
                            we offer a diverse range of housing options. Immerse yourself in virtual tours, calculate expenses,
                            and stay updated with the latest listings. Discover the perfect property.
                            From short lets to long-term rentals and dream homes for sale, we offer a diverse range of housing options. 
                            Immerse yourself in virtual tours, calculate expenses, and stay updated with the latest listings.
                        </p>
                    </div>

                    <div className="description-location">
                        <h4 style={{color:'var(--primary-color)', fontWeight:'300', marginBottom:'16px'}}>Location on map</h4>
                        <Map/>
                    </div>
                </div>
                <div className="description-right">
                    <div className="dright-col-1">
                        <h4 style={{color: "#50504F;"}}>Contact Information</h4>
                        <div className="col1"> 
                            <p>Phone Number</p>
                            <p>+234 81 2345 6789</p>
                        </div>
                        <div className="col1">
                            <p>Email</p>
                            <a href="mailto:agadumok@gmail.com.com">
                                <p>info@cactus.com</p>
                            </a>
                        </div>
                        <div className="col1">
                            <p>Website</p>
                            <p>cactus.com</p>
                        </div>
                        <div className="col1">
                            <p>Socials</p>
                           <span style={{width:'85px', height:'50px'}}>

                                <a href="">
                                    <img src="/twitter.svg" alt="" style={{marginRight: '8px'}} />
                                </a> 

                                <a href="">
                                    <img src="/tiktok.svg" alt="" style={{marginRight: '8px'}} />
                                </a> 
                                
                                <a href="">
                                    <img src="/instagram.svg" alt="" style={{marginRight: '8px'}} /> 
                                </a>

                                <a href="">
                                    <img src="/facebook.svg" alt="" />
                                </a> 
                            
                           </span>
                        </div>
                    </div>
                    <div className="dright-col-1">
                    <h4 style={{color: "#50504F;"}}>Make Reservation</h4>
                        <ReservationForm />
                    </div>
                </div>
            </div>
        </>
    )
};
   
