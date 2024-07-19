import React from 'react';
import Lottie from "lottie-react" 
import Loader from '../loading.json'


const Loading = ({ isLoading }) => {
  if (!isLoading  === null) return null;

  return (
    <div style={loadingContainerStyle}>
      <Lottie style={{width:'45px'}} animationData={Loader}    />

    </div>
  );
};

const loadingContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  padding: '20px',
  borderRadius: '10px',
  zIndex: 1000,
};

const loadingImageStyle = {
  width: '50px',
  height: '50px',
};

export default Loading;