import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [category, setCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // Simulate fetching search results based on category and location
  const fetchSearchResults = (category, location) => {
    console.log("Fetching results for:", { category, location });
    if (!category || !location) return [];
    // Simulate results
    return [
      `${category} at ${location} - 1`,
      `${category} at ${location} - 2`,
      `${category} at ${location} - 3`,
    ];
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    const locationParam = queryParams.get("location");

    console.log("Query Params:", {
      category: categoryParam,
      location: locationParam,
    });

    setCategory(categoryParam || "N/A");
    setSearchLocation(locationParam || "N/A");

    // Fetch and set search results
    const results = fetchSearchResults(categoryParam, locationParam);
    setSearchResults(results);
  }, [location]);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-3xl font-bold text-gray-800"
        >
          Search Results for <span className="text-blue-600">{category}</span>
        </button>
        <p className="text-lg text-gray-600">
          Location: <span className="text-blue-600">{searchLocation}</span>
        </p>
      </header>

      {/* Results Section */}
      <section>
        {searchResults.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="p-4 bg-white shadow-md rounded-md border hover:shadow-lg transition-shadow"
              >
                {result}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">
            No results found for the selected category and location.
          </p>
        )}
      </section>
    </div>
  );
};

export default SearchResultsPage;
