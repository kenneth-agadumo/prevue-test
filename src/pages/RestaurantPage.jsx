// import { React, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useGlobalState } from "../Contexts/GlobalStateContext";
// import { ImageSlider } from "../components/ImageSlider";
// import { Map } from "../components/Map";
// import Lottie from "lottie-react";
// import ReservationForm from "../components/ReservationForm";
// import { Dropdown } from "../components/Dropdown";
// import Heart from "../heart.json";
// import Footer from "../components/Footer";
// import { RestaurantCard } from "../components/Card";
// import "../layout.css";
// import HeartButton from "../components/Like";

// export const RestaurantPage = () => {
//   const { restaurantId } = useParams();
//   const { restaurantImagesMap } = useGlobalState();
//   const restaurantData = restaurantImagesMap[restaurantId];

//   const [iconclicked, setIconClicked] = useState(false);

//   const handleDoubleClick = () => {
//     setIconClicked(!iconclicked);
//   };

//   if (!restaurantData) {
//     return <div>Restaurant not found</div>;
//   }

//   const imageUrls = restaurantData?.images?.map((image) => image.url);
//   return (
//     <div>
//       <div className="slider pt-6">
//         <ImageSlider
//           images={imageUrls}
//           tourLink={restaurantData.virtualTourLink}
//         />
//       </div>
//       <div className="description">
//         <div className="description-left">
//           <div className="description-header">
//             <div className="d-header">
//               <div>
//                 <h4 style={{ marginBottom: "6px", fontSize: "22px" }}>
//                   {" "}
//                   {restaurantData.name}
//                 </h4>
//                 <p>{restaurantData.address}</p>
//               </div>

//               <div
//                 className="flex justify-center al"
//                 style={{ boxSizing: "border-box", overflow: "hidden" }}
//               >
//                 <HeartButton size={"w-6 h-6"} />
//                 <button>
//                   <img
//                     className="w-12 h-12"
//                     src="/share.svg"
//                     alt=""
//                     onDoubleClick={handleDoubleClick}
//                   />
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="description-about">
//             <h4
//               style={{
//                 color: "var(--primary-color)",
//                 fontWeight: "300",
//                 marginBottom: "16px",
//               }}
//             >
//               About Property
//             </h4>
//             <p style={{ wordSpacing: "3px" }}>{restaurantData.description}</p>
//           </div>

//           <div className="description-location">
//             <h4
//               style={{
//                 color: "var(--primary-color)",
//                 fontWeight: "300",
//                 marginBottom: "8px",
//               }}
//             >
//               Location on map
//             </h4>
//             <Map />
//           </div>
//         </div>
//         <div className="description-right">
//           <div className="dright-col-1">
//             <h4 style={{ color: "#50504F" }}>Contact Information</h4>
//             <div className="col1">
//               <p>Phone Number</p>
//               <p>+234 81 2345 6789</p>
//             </div>
//             <div className="col1">
//               <p>Email</p>
//               <a href="mailto:agadumok@gmail.com.com">
//                 <p>info@cactus.com</p>
//               </a>
//             </div>
//             <div className="col1">
//               <p>Website</p>
//               <p>cactus.com</p>
//             </div>
//             <div className="col1">
//               <p>Socials</p>
//               <span className="flex" style={{ width: "85px", height: "50px" }}>
//                 <a href="">
//                   <img
//                     src="/twitter.svg"
//                     alt=""
//                     style={{ marginRight: "8px" }}
//                   />
//                 </a>

//                 <a href="">
//                   <img
//                     src="/tiktok.svg"
//                     alt=""
//                     style={{ marginRight: "8px" }}
//                   />
//                 </a>

//                 <a href="">
//                   <img
//                     src="/instagram.svg"
//                     alt=""
//                     style={{ marginRight: "8px" }}
//                   />
//                 </a>

//                 <a href="">
//                   <img src="/facebook.svg" alt="" />
//                 </a>
//               </span>
//             </div>
//           </div>
//           <div className="dright-col-2">
//             <h4 style={{ color: "#50504F" }}>Make Reservation</h4>
//             <ReservationForm />
//           </div>
//         </div>
//       </div>
//       <div
//         className="recomended"
//         style={{ width: "90%", background: "#3233433", margin: "0 auto 100px" }}
//       >
//         <h3>Recommended Properties like this</h3>
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             gap: "36px",
//             justifyContent: "36px",
//           }}
//         >
//           <RestaurantCard
//             name={"Hard Rock Cafe"}
//             address={"10 Admiralty Way, Lekki, Lagos"}
//             image={"/hard-rock.png"}
//             width={"25%"}
//           />
//           <RestaurantCard
//             name={"Hard Rock Cafe"}
//             address={"10 Admiralty Way, Lekki, Lagos"}
//             image={"/hard-rock.png"}
//             width={"25%"}
//           />
//           <RestaurantCard
//             name={"Hard Rock Cafe"}
//             address={"10 Admiralty Way, Lekki, Lagos"}
//             image={"/hard-rock.png"}
//             width={"25%"}
//           />
//           <RestaurantCard
//             name={"Hard Rock Cafe"}
//             address={"10 Admiralty Way, Lekki, Lagos"}
//             image={"/hard-rock.png"}
//             width={"25%"}
//           />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import { ImageSlider } from "../components/ImageSlider";
import { Map } from "../components/Map";
import ReservationForm from "../components/ReservationForm";
import HeartButton from "../components/Like";
import Footer from "../components/Footer";
import { RestaurantCard } from "../components/Card";

export const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { restaurantImagesMap } = useGlobalState();
  const restaurantData = restaurantImagesMap[restaurantId];

  const [iconclicked, setIconClicked] = useState(false);

  const handleDoubleClick = () => {
    setIconClicked(!iconclicked);
  };

  if (!restaurantData) {
    return <div className="text-center mt-20">Restaurant not found</div>;
  }

  const imageUrls = restaurantData?.images?.map((image) => image.url);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Image Slider */}
      <div className="pt-6 slider">
        <ImageSlider
          images={imageUrls}
          tourLink={restaurantData.virtualTourLink}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-[90%] mx-auto my-8 flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-xl font-semibold mb-1">
                {restaurantData.name}
              </h4>
              <p className="text-gray-600">{restaurantData.address}</p>
            </div>
            <div className="flex items-center space-x-4">
              <HeartButton size={"w-6 h-6"} />
              <button>
                <img
                  className="w-12 h-12"
                  src="/share.svg"
                  alt="Share"
                  onDoubleClick={handleDoubleClick}
                />
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-8">
            <h4 className="text-primary font-medium mb-4">About Property</h4>
            <p className="leading-relaxed">{restaurantData.description}</p>
          </div>

          {/* Location Section */}
          <div>
            <h4 className="text-primary font-medium mb-4">Location on Map</h4>
            <Map />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-4">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p>Phone Number</p>
                <p>+234 81 2345 6789</p>
              </div>
              <div className="flex justify-between">
                <p>Email</p>
                <a
                  href="mailto:info@cactus.com"
                  className="text-blue-600 underline"
                >
                  info@cactus.com
                </a>
              </div>
              <div className="flex justify-between">
                <p>Website</p>
                <p>cactus.com</p>
              </div>
              <div className="flex justify-between">
                <p>Socials</p>
                <div className="flex space-x-3">
                  <a href="">
                    <img src="/twitter.svg" alt="Twitter" className="w-6 h-6" />
                  </a>
                  <a href="">
                    <img src="/tiktok.svg" alt="TikTok" className="w-6 h-6" />
                  </a>
                  <a href="">
                    <img
                      src="/instagram.svg"
                      alt="Instagram"
                      className="w-6 h-6"
                    />
                  </a>
                  <a href="">
                    <img
                      src="/facebook.svg"
                      alt="Facebook"
                      className="w-6 h-6"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Reservation Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">Make Reservation</h4>
            <ReservationForm />
          </div>
        </div>
      </div>

      {/* Recommended Properties */}
      <div className="max-w-[90%] mx-auto my-8 bg-gray-100 p-8 rounded-lg">
        <h3 className="text-lg font-semibold mb-6">
          Recommended Properties like this
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RestaurantCard
            name={"Hard Rock Cafe"}
            address={"10 Admiralty Way, Lekki, Lagos"}
            image={"/hard-rock.png"}
          />
          <RestaurantCard
            name={"Hard Rock Cafe"}
            address={"10 Admiralty Way, Lekki, Lagos"}
            image={"/hard-rock.png"}
          />
          <RestaurantCard
            name={"Hard Rock Cafe"}
            address={"10 Admiralty Way, Lekki, Lagos"}
            image={"/hard-rock.png"}
          />
          <RestaurantCard
            name={"Hard Rock Cafe"}
            address={"10 Admiralty Way, Lekki, Lagos"}
            image={"/hard-rock.png"}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};
