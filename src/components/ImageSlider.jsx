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

  return (
    <div style={sliderStyle}>
      <button onClick={prevImage} style={{ ...buttonStyle, left: '10px' }}>
        <img src="left-arrow.svg" alt="previous" style={{ width: '7px' }} />
      </button>

      {/* Conditionally render iframe or image */}
      {showIframe ? (
        <iframe
          src={tourLink}
          style={iframeStyle}
          frameBorder="0"
          allowFullScreen
          title={`Slide ${currentIndex + 1}`}
        />
      ) : (
        <img
          src={images[currentIndex]}
          alt={`slide ${currentIndex}`}
          style={{ ...imageStyle, borderRadius: '20px' }}
        />
      )}

      <button onClick={nextImage} style={{ ...buttonStyle, right: '10px' }}>
        <img src="right-arrow.svg" alt="next" style={{ width: '7px' }} />
      </button>

      {/* Button positioned at the bottom-center to toggle iframe */}
      <button onClick={toggleIframe} style={bottomButtonStyle}>
        {showIframe ? 'Close Tour' : 'Take Tour'}
      </button>
    </div>
  );
};

const sliderStyle = {
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
};

const imageStyle = {
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
};

export default ImageSlider;