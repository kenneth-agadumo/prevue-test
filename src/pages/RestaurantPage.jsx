import {React, useState} from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import {ImageSlider} from '../components/ImageSlider'
import {Map} from '../components/Map'
import Lottie from "lottie-react" 
import ReservationForm from "../components/ReservationForm";
import { Dropdown } from "../components/Dropdown";
import Heart from  '../heart.json'  
import Footer from "../components/Footer";
import { RestaurantCard } from "../components/Card";
import '../layout.css'
import HeartButton from "../components/Like";

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
    <div >
            <div className="slider pt-6">
                <ImageSlider images={imageUrls} tourLink={restaurantData.virtualTourLink}/>
            </div>
        <div className="description">
            <div className="description-left">
                <div className="description-header">
                    <div className='d-header'>
                        <div>    
                            <h4 style={{marginBottom: "6px", fontSize: '22px'}}> {restaurantData.name}</h4>
                            <p>{restaurantData.address}</p>
                        </div>
                    
                        <div className="flex justify-center al" style={{boxSizing:'border-box', overflow: 'hidden'}}>
                            <HeartButton size={'w-6 h-6'}/>
                            <button>
                                <img className="w-12 h-12"  src ='/share.svg' alt="" onDoubleClick={handleDoubleClick} /> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="description-about">
                    <h4 style={{color:'var(--primary-color)', fontWeight:'300', marginBottom:'16px'}}>About Property</h4>
                    <p style={{wordSpacing:'3px'}}>
                    {restaurantData.description}
                    </p>
                </div>

                <div className="description-location">
                    <h4 style={{color:'var(--primary-color)', fontWeight:'300', marginBottom:'8px'}}>Location on map</h4>
                    <Map/>
                </div>
            </div>
            <div className="description-right">
                <div className="dright-col-1">
                    <h4 style={{color: "#50504F"}}>Contact Information</h4>
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
                <div className="dright-col-2">
                    <h4 style={{color: "#50504F"}}>Make Reservation</h4>
                    <ReservationForm />
                </div>
            </div>
        </div>
        <div className="recomended" style={{width:'90%', background:'#3233433', margin:'0 auto 100px',}}>
            <h3>Recommended Properties like this</h3>
            <div style={{width:'100%', display:'flex', gap: '36px', justifyContent:'36px'}}>
                <RestaurantCard name={'Hard Rock Cafe'} address={'10 Admiralty Way, Lekki, Lagos'}  image={'/hard-rock.png'} width={'25%'} />
                <RestaurantCard name={'Hard Rock Cafe'} address={'10 Admiralty Way, Lekki, Lagos'}  image={'/hard-rock.png'} width={'25%'} />
                <RestaurantCard name={'Hard Rock Cafe'} address={'10 Admiralty Way, Lekki, Lagos'}  image={'/hard-rock.png'} width={'25%'} />
                <RestaurantCard name={'Hard Rock Cafe'} address={'10 Admiralty Way, Lekki, Lagos'}  image={'/hard-rock.png'} width={'25%'} />
            </div>
        </div>
        <Footer />
    </div>
    )
};
   
