import { RentalCard, RestaurantCard } from "./Card";
import { Link } from "react-router-dom";

export const SearchResults = ({ results, category }) => {
    return (
        <div className="search-results" style={{ zIndex: '1' }}>
            <h2>Results for {category}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {category === 'Restaurants' ? 
                    results.map((restaurant) => (
                        <Link to={`/restaurants/${restaurant.id}`} key={restaurant.id} style={{ textDecoration: 'none', width: '33%' }}>
                            <RestaurantCard
                                name={restaurant.name}
                                address={restaurant.address}
                                image={restaurant.images.length > 0 ? restaurant.images[0].url : '/default-image.png'}
                            />
                        </Link>
                    )) :
                    results.map((rental) => (
                        <Link to={`/rentals/${rental.id}`} key={rental.id} style={{ textDecoration: 'none', width: '33%' }}>
                            <RentalCard
                                address={rental.address}
                                price={rental.price}
                                image={rental.images.length > 0 ? rental.images[0].url : '/default-image.png'}
                            />
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};
