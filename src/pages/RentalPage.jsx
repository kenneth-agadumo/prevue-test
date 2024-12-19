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
import { h1 } from "framer-motion/client";
import HeartButton from "../components/Like";
import DateRangePicker from "../components/ReservationCalendar";
import { FaTv, FaParking, FaSwimmingPool  } from 'react-icons/fa'; // Import some icons
import { TbAirConditioning } from 'react-icons/tb';
import { MdBalcony, MdOutlinePets } from 'react-icons/md';
import { FaWifi, FaKitchenSet, FaDumbbell   } from 'react-icons/fa6'; // Import some icons
import { BiCloset } from 'react-icons/bi';
import { LuWashingMachine } from 'react-icons/lu';
import { RiTwitterXFill, RiTiktokFill, RiInstagramFill, RiFacebookFill } from "react-icons/ri";


export const RentalPage = () => {
    const { shortletId } = useParams();
    const {  shortletImagesMap } = useGlobalState();
    const rentalData = shortletImagesMap[shortletId];
    
    const amenitiesIconMap = {
        'WiFi' : <FaWifi className="w-6 h-6" />,
        'Air Conditioning' : <TbAirConditioning className="w-6 h-6" />,
        'TV' : <FaTv className="w-6 h-6"/>,
        'Kitchen' : <FaKitchenSet className="w-6 h-6"/>,
        'Washing Machine' : <LuWashingMachine className="w-6 h-6"/>,
        'Parking Space' : <FaParking className="w-6 h-6"  />,
        'Swimming Pool' : <FaSwimmingPool className="w-6 h-6"/>,
        'Gym' :  <FaDumbbell className="w-6 h-6 "/>,
        'Balcony' : <MdBalcony className="w-6 h-6"/>,
        'Wardrobe' : <BiCloset className="w-6 h-6"/>,
        'Pet Friendly' : <MdOutlinePets className="w-6 h-6"/>,
      };
  
    const [iconclicked, setIconClicked] = useState(false);
    
    const handleDoubleClick = () => {
          setIconClicked(!iconclicked)
    };
  
    if (!rentalData) {
      return <div>Rental not found</div>;
    }
  
    const imageUrls = rentalData?.images?.map(image => image.url);
  
    return(
        <div >
            <div className="slider pt-6">
                <ImageSlider images={imageUrls}  tourLink={rentalData.virtualTourLink}/>
            </div>
        <div className="description">
            
            <div className="description-left">
                <div className="description-header ">
                    <div className='d-header'>
                        <div>    
                            <h4 style={{marginBottom: "6px", fontSize: '22px'}}> {rentalData.propertyName}</h4>
                            <p>{rentalData.address}</p>
                        </div>
                    
                        <div className="like-share " style={{boxSizing:'border-box', overflow: 'hidden'}}>
                          <HeartButton size={'w-6 h-6'}/>
                          <button>
                            <img className=" w-12 h-12"  src ='/share.svg' alt="" onDoubleClick={handleDoubleClick} /> 
                          </button>
                        </div>
                    </div>
                </div>
                <div className="description-about">
                    <h4 style={{color:'var(--primary-color)', fontWeight:'300', marginBottom:'16px'}}>About Property</h4>
                    <p style={{wordSpacing:'3px'}}>
                    {rentalData.about}
                    </p>
                </div>

                <div className="description-about box-border overflow-hidden">
                    <h4 style={{ color: 'var(--primary-color)', fontWeight: '300', marginBottom: '16px' }}>
                        Location Amenities
                    </h4>
                    <div className="flex gap-10 flex-wrap  justify-around  pl-3 pr-10 pt-4" style={{ wordSpacing: '3px' }}>
                        {rentalData.amenities.map((amenity, index) => (
                        <div className="flex flex-col basis-11" key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            {amenitiesIconMap[amenity] || <span style={{ color: 'var(--secondary-color)' }}>❓</span>}
                            <span className="text-sm text-center mt-3" >{amenity}</span>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="description-location">
                    <h4 style={{color:'var(--primary-color)', fontWeight:'300', marginBottom:'8px'}}>Location on map</h4>
                    <Map/>
                </div>
            </div>
            <div className="description-right">
                <div className="dright-col-1">
                    <h4 style={{color: "#50504F;"}}>Contact Information</h4>
                    <div className="col1"> 
                        <p>Phone Number</p>
                        <p>{rentalData.telephone}</p>
                    </div>
                    <div className="col1">
                        <p>Email</p>
                        <a href={`mailto:'${rentalData.email}'`}>
                            <p>{rentalData.email}</p>
                        </a>
                    </div>
                    <div className="col1">
                        <p>Website</p>
                        <p>cactus.com</p>
                    </div>
                    <div className="col1">
                        <p>Socials</p>
                        <span className='flex gap-1'  style={{width:'85px', height:'50px'}}>

                            <a href="">
                                <RiTwitterXFill className="text-black hover:text-primary" />
                            </a> 

                            <a href="">
                                <RiTiktokFill className="text-black hover:text-primary" />
                            </a> 
                            
                            <a href="">
                               
                                <RiInstagramFill className="text-black hover:text-primary" />
                               
                            </a>

                            <a href="">
                                <RiFacebookFill className="text-black hover:text-primary" />
                            </a> 
                        </span>
                    </div>
                </div>
                <div className="dright-col-2">
                    <h4 className="text-primary text-lg font-normal">Cost Estimation</h4>
                    <div className="w-full flex justify-between">
                        <p className="text-grey">Cost/Night</p>
                        <p className="text-grey">₦{rentalData.costPerNight.toLocaleString()}</p>
                    </div>
                    <div className="w-full flex justify-between text-neutral-600">
                        <p className="text-grey">Caution Fee</p>
                        <p className="text-grey">₦{rentalData.cautionFee}</p>
                    </div>
                    <DateRangePicker  costPerNight={rentalData.costPerNight} cautionFee={rentalData.cautionFee} />
               
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
}