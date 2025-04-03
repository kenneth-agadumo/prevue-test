import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { ImageSlider } from "../components/ImageSlider";
import { Map } from "../components/Map";
import ReservationForm from "../components/ReservationForm";
import { Dropdown } from "../components/Dropdown";
import Heart from "../heart.json";
import Footer from "../components/Footer";
import { RestaurantCard } from "../components/Card";
import "../layout.css";
import { h1 } from "framer-motion/client";
import HeartButton from "../components/Like";
import DateRangePicker from "../components/ReservationCalendar";
import { FaTv, FaParking, FaSwimmingPool } from "react-icons/fa"; // Import some icons
import { TbAirConditioning } from "react-icons/tb";
import { MdBalcony, MdOutlinePets } from "react-icons/md";
import { FaWifi, FaKitchenSet, FaDumbbell } from "react-icons/fa6"; // Import some icons
import { BiCloset } from "react-icons/bi";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust path as necessary
import Loading from "../house-loading.json";
import Lottie from "lottie-react";

// import { LuWashingMachine } from 'react-icons/lu';
import {
  RiTwitterXFill,
  RiTiktokFill,
  RiInstagramFill,
  RiFacebookFill,
} from "react-icons/ri";

export const RentalPage = () => {
  const { shortletId } = useParams();
  const { shortletImagesMap } = useGlobalState();
  const[ shortletData, setShortletData] = useState(null);
  const [loading, setLoading] = useState(true);

  

  const amenitiesIconMap = {
    WiFi: <FaWifi className="w-6 h-6" />,
    "Air Conditioning": <TbAirConditioning className="w-6 h-6" />,
    TV: <FaTv className="w-6 h-6" />,
    Kitchen: <FaKitchenSet className="w-6 h-6" />,
    "Washing Machine": <FaKitchenSet className="w-6 h-6" />,
    "Parking Space": <FaParking className="w-6 h-6" />,
    "Swimming Pool": <FaSwimmingPool className="w-6 h-6" />,
    Gym: <FaDumbbell className="w-6 h-6 " />,
    Balcony: <MdBalcony className="w-6 h-6" />,
    Wardrobe: <BiCloset className="w-6 h-6" />,
    "Pet Friendly": <MdOutlinePets className="w-6 h-6" />,
  };

  const [iconclicked, setIconClicked] = useState(false);

  
  useEffect(() => {
    const fetchShortletData = async () => {
      if (!shortletId) return;
      setLoading(true);
      try {
        const docRef = doc(db, "shortlets", shortletId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setShortletData(docSnap.data());
        } else {
          setShortletData(null);
        }
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShortletData();
  }, [shortletId]);

  if (loading) {
    return  <div
    className="loading-container"
    style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    }}
  >
    <Lottie style={{ width: "300px" }} animationData={Loading} />
  </div>;
  }



  const handleDoubleClick = () => {
    setIconClicked(!iconclicked);
  };

  if (!shortletData) {
    return <div className="text-center mt-20 ">Shortlet not found</div>;
  }

  const imageUrls = rentalData?.images?.map((image) => image.url);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="slider pt-6">
      {/*<ImageSlider images={imageUrls} tourLink={rentalData.virtualTourLink} />*/}
      <iframe 
        src={shortletData.virtualTourLink}
        style={{ width: '90%', 
          height: '523px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin:'auto',
          position: 'relative', 
          borderRadius: '20px', 
          border: 'none' }} 
        frameBorder="0"
        allowFullScreen
        title="Virtual Tour"
      />
      </div>
      <div className="description flex flex-col md:flex-row gap-8">
        <div className="description-left w-full md:w-2/3">
          <div className="description-header ">
            <div className="d-header">
              <div>
                <h4 style={{ marginBottom: "6px", fontSize: "22px" }}>
                  {" "}
                  {shortletData.propertyName}
                </h4>
                <p>{shortletData.address}</p>
              </div>

              <div
                className="like-share "
                style={{ boxSizing: "border-box", overflow: "hidden" }}
              >
                <HeartButton size={"w-6 h-6"} />
                <button>
                  <img
                    className=" w-12 h-12"
                    src="/share.svg"
                    alt=""
                    onDoubleClick={handleDoubleClick}
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="description-about mt-4">
            <h4
              style={{
                color: "var(--primary-color)",
                fontWeight: "300",
                marginBottom: "16px",
              }}
            >
              About Property
            </h4>
            <p style={{ wordSpacing: "3px" }}>{shortletData.about}</p>
          </div>

          <div className="description-about box-border overflow-hidden mt-6">
            <h4
              style={{
                color: "var(--primary-color)",
                fontWeight: "300",
                marginBottom: "16px",
              }}
            >
              Location Amenities
            </h4>
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              style={{ wordSpacing: "3px" }}
            >
              {shortletData.amenities.map((amenity, index) => (
                <div
                  className="flex flex-col items-center"
                  key={index}
                 
                >
                  {amenitiesIconMap[amenity] || (
                    <span style={{ color: "var(--secondary-color)" }}>❓</span>
                  )}
                  <span className="text-sm text-center mt-2">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="description-location mt-6">
            <h4
              style={{
                color: "var(--primary-color)",
                fontWeight: "300",
                marginBottom: "8px",
              }}
            >
              Location on map
            </h4>
            <Map />
          </div>
        </div>
        <div className="description-right w-full md:w-1/3">
          <div className="dright-col-1">
            <h4 style={{ color: "#50504F;" }}>Contact Information</h4>
            <div className="col1">
              <p>Phone Number</p>
              <p>{shortletData.telephone}</p>
            </div>
            <div className="col1">
              <p>Email</p>
              <a href={`mailto:'${shortletData.email}'`}>
                <p>{shortletData.email}</p>
              </a>
            </div>
            <div className="col1">
              <p>Website</p>
              <p>cactus.com</p>
            </div>
            <div className="col1">
              <p>Socials</p>
              <span
                className="flex gap-1"
                style={{ width: "85px", height: "50px" }}
              >
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
            <h4 className="text-primary text-lg font-normal">
              Cost Estimation
            </h4>
            <div className="w-full flex justify-between">
              <p className="text-grey">Cost/Night</p>
              <p className="text-grey">
                ₦{Number(shortletData.costPerNight).toLocaleString()}
              </p>
            </div>
            <div className="w-full flex justify-between text-neutral-600">
              <p className="text-grey">Caution Fee</p>
              <p className="text-grey">
                ₦{Number(shortletData.cautionFee).toLocaleString()}
              </p>
            </div>
            <DateRangePicker
              costPerNight={shortletData.costPerNight}
              cautionFee={shortletData.cautionFee}
            />
          </div>
        </div>
      </div>
      <div
        className="recomended mt-6"
        style={{ width: "90%", background: "#3233433", margin: "0 auto 100px" }}
      >
        <h3 className="text-lg font-semibold mb-5">Recommended Properties like this</h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        
        >
          <RestaurantCard
            name={"Hard Rock Cafe"}
            address={"10 Admiralty Way, Lekki, Lagos"}
            image={"/hard-rock.png"}
            width={"25%"}
          />
          <RestaurantCard
            name={"Hard Rock Cafe"}
            address={"10 Admiralty Way, Lekki, Lagos"}
            image={"/hard-rock.png"}
            width={"25%"}
          />
          <RestaurantCard
            name={"Hard Rock Cafe"}
            address={"10 Admiralty Way, Lekki, Lagos"}
            image={"/hard-rock.png"}
            width={"25%"}
          />
          <RestaurantCard
            name={"Hard Rock Cafe"}
            address={"10 Admiralty Way, Lekki, Lagos"}
            image={"/hard-rock.png"}
            width={"25%"}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
