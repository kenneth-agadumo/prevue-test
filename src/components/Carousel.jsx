// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const slides = [
    { src: "https://kuula.co/share/N28FK?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1&margin=26&alpha=0.60" },
    { src: "https://kuula.co/share/5JJd9?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1" },
    { src: "https://kuula.co/share/5xWlV?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1" },
  ];


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


  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="showcase">
      <div className="w-100% h-[640px] overflow-hidden ">
        <iframe
          src={slides[currentIndex].src}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          title={`Slide ${currentIndex + 1}`}
        />
      </div>

      <div className="flex justify-center mt-9 space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            className={`cursor-pointer ${
              currentIndex === index ? "bg-black" : "bg-gray-400"
            }`}
            style={{
              width: "50px",  
              height: "3px",
              display: "inline-block",
              borderRadius: "5px",
            }}
          ></span>
        ))}
      </div>

      
      <div className="flex justify-center mt-7 space-x-4">
        <button
          onClick={prevSlide}
          className="border-2 border-black flex items-center justify-center size-10 bg-white p-3 rounded-full shadow-lg transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="border-2 border-black flex items-center justify-center size-10 bg-white p-3 rounded-full shadow-lg transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;