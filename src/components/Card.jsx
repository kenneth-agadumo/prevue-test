import { useState } from "react";
import Lottie from "lottie-react";
import Heart from "../heart.json";
import HeartButton from "./Like";


export const RentalCard = ({ image, name, address, price, note }) => {
  

  return (
    <div className="display-card " >
      <div className="card-image">
        <img src={image} alt=""  className="pics hidden sm:block"/>
        
      <div className="para">
        {note}
      </div>
      </div>

      <div className="card-address mt-4">
        <span>{address}</span>
      </div>

      <div className="card-info-cont" style={{ marginTop: "" }}>
        <div className="flex items-center space-x-2 ">
        <img src="/bed.png" alt="" /> 
          <span className="name text-sm text-slate-600 font-normal">
            2 Bedrooms
          </span>
          <img src="/bath.png" alt="" />
          <span className="name text-sm text-slate-600 font-normal ">
            2 Baths
          </span>
          <img src="/ruler.png" alt="" />
          <span className="name text-sm text-slate-600 font-normal">
            1,200 sqft
          </span>
        </div>
        <div className="">
        <HeartButton/>
        </div>
        
      </div>
      <div className="card-price mt-4">
        <span>₦{price}</span>
      </div>
    </div>
  );
};

export const RestaurantCard = ({ image, name, address, note }) => {
  

  return (
    <div className="display-card">
      <div className="card-image">
        <img src={image} alt="" className="pics"/>
        <div className="para">
        {note}
      </div>
      </div>
      <div className="card-info-cont">
        <div className="rest-info">
          <span className="name">{name}</span>
          <span className="address text-slate-600 text-sm">{address}</span> 
        </div>
        <HeartButton/>
       
      </div>
      <div className="card-address"></div>
    </div>
  );
};
