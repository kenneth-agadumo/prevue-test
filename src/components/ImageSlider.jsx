import React, { useState } from 'react';

export const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };
  console.log(images[currentIndex])

  return (
    <div style={sliderStyle}>
      <button onClick={prevImage} style={{ ...buttonStyle, left: '10px' }}> <img src="left-arrow.svg" alt="" style={{width:'7px'}}  /> </button>
      
      <img src={images[currentIndex]} alt={`slide ${currentIndex}`} style={{...imageStyle, borderRadius: '20px'}} />
      <button onClick={nextImage} style={{ ...buttonStyle, right: '10px' }}>  <img src="right-arrow.svg" alt="" style={{width:'7px'}} /> </button>
    
    </div>
  );
};

const sliderStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '90%',
  minHeight: '523px',
  margin: 'auto',
  borderRadius: '100px',
  // border: ' 20px solid red'
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
  borderRadius: '50%'
};

const imageStyle = {
  width: '100%',
  maxHeight: '500px',
  objectFit: 'cover'
};

export default ImageSlider;