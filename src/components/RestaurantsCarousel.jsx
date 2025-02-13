import { useState } from "react";

const RestaurantsCarousel = ({ restaurants }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = restaurants.map((rental) => ({
    src: rental.virtualTour,
  }));

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative mt-6 w-full overflow-hidden">
      <div className="w-full h-[500px] overflow-hidden rounded-lg">
        <iframe
          src={slides[currentIndex].src}
          className="w-full h-[500px]"
          frameBorder="0"
          allowFullScreen
          title={`Slide ${currentIndex + 1}`}
        />
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 p-2 bg-white border rounded-full"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 p-2 bg-white border rounded-full"
      >
        {">"}
      </button>
    </div>
  );
};

export default RestaurantsCarousel;
