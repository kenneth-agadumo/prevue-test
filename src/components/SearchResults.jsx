import { Link } from "react-router-dom";
import { RentalCard, RestaurantCard } from "./Card";

export const SearchResults = ({ results, category }) => {
  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-2xl font-semibold mb-4">Results for {category}</h2>

      {results.length === 0 ? (
        <div className="flex flex-col items-center justify-center  text-gray-500">
          <img
            src="/noresultfound.jpg"
            className="w-1/2 max-w-xl h-auto mb-4 object-cover"
            alt="No results"
          />
          <p className="text-lg font-semibold">No {category} found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {category === "Restaurants"
            ? results.map((restaurant) => (
                <Link
                  to={`/restaurants/${restaurant.id}`}
                  key={restaurant.id}
                  className="no-underline"
                >
                  <RestaurantCard
                    name={restaurant.name}
                    address={restaurant.address}
                    image={
                      restaurant.images.length > 0
                        ? restaurant.images[0].url
                        : "/default-image.png"
                    }
                  />
                </Link>
              ))
            : results.map((rental) => (
                <Link
                  to={`/rentals/${rental.id}`}
                  key={rental.id}
                  className="no-underline"
                >
                  <RentalCard
                    address={rental.address}
                    price={rental.price}
                    image={
                      rental.images.length > 0
                        ? rental.images[0].url
                        : "/default-image.png"
                    }
                  />
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};
