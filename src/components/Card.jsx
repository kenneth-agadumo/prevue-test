import { useState } from "react"
import Lottie from "lottie-react" 
import Heart from  '../heart.json'   

export const RentalCard = ({image, name, address}) => {
    return(
        <div className="display-card">
            <div className="card-image">
            <img src={image} alt="" />
            </div>
            <div className="card-name">
                <span>{name}</span>
                <Lottie animationData={Heart}/>jj
            </div>
            <div className="card-address">
                <span>{address}</span>
            </div>
        </div>

    )

} 

export const RestaurantCard = ({image, name, address, width}) => {
    const [iconclicked, setIconClicked] = useState(false);

    const handleDoubleClick = () => {
        setIconClicked(!iconclicked)
    };

    return(
        <div className="display-card" style={{width: width}}>
            <div className="card-image">
            <img src={image} alt="" />
            </div>
            <div className="card-info-cont">
                <div className="info">
                    <span className="name">{name}</span>
                    <span className="address">{address}</span>
                </div>
                <div className="like">
                    {!iconclicked ? <img className="like" src ='unlike.svg' alt="" onDoubleClick={handleDoubleClick} /> : <Lottie style={{width:'45px'}} animationData={Heart} loop={false} onDoubleClick={handleDoubleClick} />}
                </div>
            </div>
            <div className="card-address">
                
            </div>
        </div>

    )

} 