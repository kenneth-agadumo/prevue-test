import React, { useState } from 'react';

const Slider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3; // Number of cards to show at a time
  
  // Calculate the total number of rows
  const totalRows = Math.ceil(cards.length / itemsPerPage);

  // Function to handle right arrow click
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= cards.length ? 0 : prevIndex + itemsPerPage
    );
  };

  // Function to handle left arrow click
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0 ? (totalRows - 1) * itemsPerPage : prevIndex - itemsPerPage
    );
  };

  // Get the cards to be displayed based on the currentIndex
  const displayedCards = cards.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrev} className="p-2 bg-gray-300 rounded-full">{"<"}</button>
        <button onClick={handleNext} className="p-2 bg-gray-300 rounded-full">{">"}</button>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)`,
          }}
        >
          {displayedCards.map((card, index) => (
            <div key={index} className="w-1/3 p-2">
              <div className="bg-white shadow-md rounded-md p-4">
                {/* Customize card content */}
                <img src={card.image} alt={card.title} className="w-full h-32 object-cover rounded" />
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
