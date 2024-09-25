import { useState } from "react";
import Lottie from "lottie-react";
import Heart from "../heart.json";

export const RentalCard = ({ image, name, address, price }) => {
  const [iconclicked, setIconClicked] = useState(false);

  const handleDoubleClick = () => {
    setIconClicked(!iconclicked);
  };

  return (
    <div className="display-card">
      <div className="card-image">
        <img src={image} alt="" />
      </div>

      <div className="card-address">
        <span>{address}</span>
      </div>

      <div className="card-info-cont" style={{ marginTop: "0" }}>
        <div className="rental-info">
          <span className="name">
            <img src="/bed.png" alt="" /> 2 Bedrooms{" "}
          </span>
          <span className="name">
            <img src="/bath.png" alt="" /> 2 Baths
          </span>
          <span className="name">
            <img src="/ruler.png" alt="" /> 1,200 sqft
          </span>
        </div>
        <div className="like">
          {!iconclicked ? (
            <img
              className="like"
              src="/unlike.svg"
              alt=""
              onDoubleClick={handleDoubleClick}
            />
          ) : (
            <Lottie
              style={{ width: "45px" }}
              animationData={Heart}
              loop={false}
              onDoubleClick={handleDoubleClick}
            />
          )}
        </div>
      </div>
      <div className="card-price">
        <span>₦{price}</span>
      </div>
    </div>
  );
};

export const RestaurantCard = ({ image, name, address }) => {
  const [iconclicked, setIconClicked] = useState(false);

  const handleDoubleClick = () => {
    setIconClicked(!iconclicked);
  };

  return (
    <div className="display-card">
      <div className="card-image">
        <img src={image} alt="" />
      </div>
      <div className="card-info-cont">
        <div className="rest-info">
          <span className="name">{name}</span>
          <span className="address">{address}</span>
        </div>
        <div className="like">
          {!iconclicked ? (
            <img
              className="like"
              src="/unlike.svg"
              alt=""
              onDoubleClick={handleDoubleClick}
            />
          ) : (
            <Lottie
              style={{ width: "45px" }}
              animationData={Heart}
              loop={false}
              onDoubleClick={handleDoubleClick}
            />
          )}
        </div>
      </div>
      <div className="card-address"></div>
    </div>
  );
};
