import HeartButton from "./Like";
import { Link } from "react-router-dom";

export const RentalCard = ({
  image,
  virtualTour,
  name,
  address,
  price,
  note,
  type,
  id,
  rating = 4.5,
  amenities = [],
  badge,
}) => {
  const numericPrice = Number(price);
  const formattedPrice = !isNaN(numericPrice) ? numericPrice.toLocaleString() : price;
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 relative">
      {/* Badge */}
      {badge && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg">
          {badge}
        </div>
      )}

      {/* Image Section */}
      <Link to={`/${type}/${id}`}>
        <div className="w-full h-64 relative overflow-hidden group">
          {/* *<img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />* */}
          <iframe
            src={virtualTour}
            title="Virtual Tour"
            className="w-full h-full border-none"
            allowFullScreen
          ></iframe>
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 pointer-events-none"></div>
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Heart Button */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{address}</p>
          </div>
          <HeartButton />
        </div>

        {/* Price and Rating */}
        <div className="mt-3 flex justify-between items-center">
          <p className="text-gray-700 font-semibold">₦{formattedPrice}/night</p>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={i < Math.round(rating) ? "#facc15" : "none"}
                stroke="#facc15"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M12 17.75l-4.9 2.57c-.36.19-.81-.09-.72-.52l.94-5.48-4-3.87c-.29-.28-.13-.77.27-.82l5.53-.8 2.47-5.01c.17-.36.68-.36.85 0l2.47 5.01 5.53.8c.41.06.57.54.27.82l-4 3.87.94 5.48c.09.43-.36.71-.72.52L12 17.75z"
                />
              </svg>
            ))}
            <span className="ml-1 text-gray-600 text-sm">{rating}</span>
          </div>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}

        {/* Note */}
        {note && <p className="mt-3 text-sm italic text-gray-500">{note}</p>}

        {/* CTA Button */}
        <div className="mt-4">
          <Link
            to={`/${type}/${id}`}
            className="block bg-emerald-500 text-white text-center text-sm py-2 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export const RestaurantCard = ({
  image,
  name,
  address,
  virtualTour,
  cuisine,
  rating = 4.5,
  priceRange = "$$ - $$$",
  type,
  id,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
      {/* Image Section */}
      <Link to={`/${type}/${id}`}>
        <div className="w-full h-64 overflow-hidden">
          {/* <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-all duration-300 hover:brightness-90 group-hover:scale-110"
          /> */}
          <iframe
            src={virtualTour}
            title="Virtual Tour"
            className="w-full h-full border-none"
            allowFullScreen
          ></iframe>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">{cuisine}</p>
          </div>
          <HeartButton />
        </div>

        <div className="mt-3 flex justify-between items-center">
          <p className="text-gray-700 font-semibold">{priceRange}</p>
          <div className="flex items-center">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="ml-1 text-gray-600 text-sm">{rating}</span>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-500">{address}</p>
      </div>
    </div>
  );
};
