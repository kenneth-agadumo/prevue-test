import { useState } from "react";

const RentalsCarousel = ({ shortlets, rentals }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // rentals.map((rental) => ({
  //   src: rental.virtualTour,
  // }));

  const slides = shortlets
  ? 
   Object.entries(shortlets).map(([shortletId, shortletData]) => (
    {
      id: shortletId,
      src: shortletData?.virtualTourLink
    }
  ))
  : {};

  console.log(slides)
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
  console.log(rentals, "slides");
  return (
    <div className="relative w-11/12 md:w-[90%]  mx-auto rounded-2xl overflow-hidden">
      <div className="w-full overflow-hidden rounded-lg">
        <iframe
          src={slides[currentIndex].src}
          className="w-full h-[70vh] md:h-[523px] min-h-screen  rounded-2xl"
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

export default RentalsCarousel;
