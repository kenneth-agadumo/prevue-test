// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import "../layout.css";
import { FeaturedTabs } from "../components/FeaturedTabs";
// import { Dropdown } from "../components/Dropdown";
// import { EmbedScript } from "../components/VirtualTour";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import { HeroSearch } from "../components/HeroSearch";
import StepsSection from "../components/StepSection";
import AboutUs from "../components/AboutUs";
import NewsLetterModal  from "../components/NewsLetterModal";


export const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Show the modal when the page loads
    setModalVisible(true);
  }, []);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <NewsLetterModal isVisible={isModalVisible} onClose={handleCloseModal} />

      <div className="flex  justify-center h-screen relative">
        <div className="hero-container">

          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10"
            poster="/hero-bg.png"
          >
            <source src="/herovideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-black bg-opacity-50 -z-10"></div>

          <div className="px-4 flex flex-col gap-6 mt-40">
            <h1 className="text-3xl md:text-5xl text-primary font-bold mb-4 animate-slideInLeft">
              Discover Your Perfect Stay or Dine in Style
            </h1>
            <p className="text-lg md:text-xl text-center mb-8 text-primary">
              Luxury shortlets and fine dining experiences, curated just for you.
            </p>
            <HeroSearch />
          </div>
        </div>
      </div>
      <div className="featured-section">
        <div className="oval"></div>

        <FeaturedTabs />
      </div>
      <div className="about-oval"></div>
      <AboutUs />
      <StepsSection />
      <div className="bg-gray-50 py-16 px-6 lg:px-24 text-center">
        <div className="max-w-5xl mx-auto">
          <h4 className="text-sm font-bold text-primary uppercase tracking-wide">
            Preview Locations
          </h4>
          <h3 className="mt-4 text-4xl font-bold text-gray-900 leading-tight">
            Explore Your Favorite Spots in Virtual Reality
          </h3>
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            Immerse yourself in stunning 360° views of properties and destinations. Experience it virtually before stepping in physically.
          </p>
        </div>

        <div className="mt-12 relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <Carousel />
        </div>
      </div>
      <Footer />
    </>
  );
};