import React from 'react';
import Lottie from "lottie-react" 
import Loader from '../loading.json'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



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



export const ButtonLoading = ({ isLoading }) => {
  if (!isLoading  === null) return null;

  return (
    <DotLottieReact
      src="https://lottie.host/cb3813bb-a24c-4ff6-ae32-a5584641439c/azgJ1okJCS.lottie"
      loop
      autoplay
    />
  );
};


export const CardLoading = ({ isLoading, width }) => {
  if (!isLoading  === null) return null;


  return (
    <DotLottieReact
      src="https://lottie.host/def3db52-32b4-4682-872e-c79bf34e5997/2StXr0fpgy.lottie"
      loop
      autoplay
      style={{width:'40em'}}
  />
  );
};


export const TableLoading = ({ isLoading }) => {
  if (!isLoading  === null) return null;

  return (
    <DotLottieReact
      src="https://lottie.host/479efcc8-412b-47fb-a11d-949bbc1b73c9/UWjlhd4rcJ.lottie"
      loop
      autoplay
    />
  );
};


export const SearchLoading = ({ isLoading }) => {
  if (!isLoading  === null) return null;

  return (
    <DotLottieReact
      src="https://lottie.host/479efcc8-412b-47fb-a11d-949bbc1b73c9/UWjlhd4rcJ.lottie"
      loop
      autoplay
    />
  );
};


