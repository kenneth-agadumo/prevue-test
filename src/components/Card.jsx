import { useState } from "react";
import Lottie from "lottie-react";
import Heart from "../heart.json";
import HeartButton from "./Like";
import { Link } from "react-router-dom";


export const RentalCard = ({ image, name, address, price, note, type, id}) => {
  

  return (
   
  <div className="bg-white shadow-sm rounded-sm overflow-hidden">
     <Link to={`/${type}/${id}`}>
      <div className="w-full h-64 overflow-hidden rounded-sm flex justify-center items-center">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    </Link>
    <div className="py-4">
    <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-gray-600">{address}</p>
          <p className="text-gray-600">{price}</p>
        </div>
        <HeartButton/>
      </div>
    </div>
  </div>
  );
};

export const RestaurantCard = ({ image, name, address, note, id, type}) => {
  

  return (

  <div className="bg-white shadow-sm rounded-sm overflow-hidden">
    <Link to={`/${type}/${id}`}>
    <div className=" w-full h-64 overflow-hidden rounded-sm flex justify-center items-center">
      <img src={image} alt={name} className="w-full h-full object-cover" />
    </div>
    </Link>
    <div className="py-4">
      <div className="flex justify-between">
        <div className=" w-full">
          <h3 className="text-lg font-semibold mb-2 ">{name}</h3>
          <p className="text-gray-600">{address}</p>
        </div>
        <HeartButton 
        />
      </div>
    </div>
  </div>

  );
};
