import React, { useState } from 'react';

export const ImageSlider = ({ images, tourLink }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIframe, setShowIframe] = useState(false); // State to control iframe visibility

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const toggleIframe = () => {
    setShowIframe(!showIframe);
  };
  {/*const sliderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '90%',
    height: '523px',  // Ensure a fixed height for the slider
    margin: 'auto',
    borderRadius: '20px',
  };
  
  const buttonStyle = {
   
    width: '40px',
    height: '40px',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 1,
    borderRadius: '50%',
    display: showIframe ? 'none' : 'block',
  };
  
  {/*const imageStyle = {
    width: '100%',
    maxHeight: '500px',
    objectFit: 'cover',
  };
  
  const iframeStyle = {
    width: '100%',
    height: '100%', // Set iframe height to fill its parent container
    borderRadius: '20px',
  };
  
  const bottomButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'white',
    color: '#232324',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    zIndex: 1,
  };*/}
  

  return (
    <div className="relative w-11/12 md:w-[90%] mx-auto rounded-2xl overflow-hidden">
//       <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10">
//         <img src="left-arrow.svg" alt="previous" style={{ width: '7px' }} />
//       </button>

//       {/* Conditionally render iframe or image */}
//       {/* {showIframe ? (
//         <iframe 
//           src={tourLink}
//            className="w-full h-[70vh] md:h-[523px] rounded-2xl"
//           frameBorder="0"
//           allowFullScreen
//           title={`Slide ${currentIndex + 1}`}
//         />
//       ) : (
//         <img
//           src={images[currentIndex]}
//           alt={`slide ${currentIndex}`}
//           className="w-full h-[70vh] md:h-[523px] object-cover rounded-2xl"
//         />
//       )} */}

//       <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full z-10">
//         <img src="right-arrow.svg" alt="next" className="w-4" />
//       </button>
//      {/* Button positioned at the bottom-center to toggle iframe */}
//       <button onClick={toggleIframe} className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-lg z-10">
//         {showIframe ? 'Close Tour' : 'Take Tour'}

//       </button>*/}

        <iframe 
          src={tourLink}
          style={iframeStyle}
          frameBorder="0"
          allowFullScreen
          title={`Slide ${currentIndex + 1}`}
        />

    </div>
  );
};


export default ImageSlider;