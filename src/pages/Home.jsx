// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import '../layout.css';
import { FeaturedTabs } from '../components/FeaturedTabs';
import {HeroSearch} from '../components/HeroSearch'
import { Dropdown } from '../components/Dropdown';
import { EmbedScript } from '../components/VirtualTour';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';


export const Home = () => {
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     // Simulate loading data/components, you can replace this with actual loading logic
    //     const loadComponents = async () => {
    //         // Simulate a delay for loading components
    //         await new Promise((resolve) => setTimeout(resolve, 3000));
    //         setLoading(false);
    //     };

    //     loadComponents();
    // }, []);

   

    return (
        <>
            <div className="hero-section">
                <div className="hero-container">
                    <h1 className="hero-text"> Discover, Preview, and Explore Locations of Your Choice</h1>
                    <HeroSearch />
                </div>
                <div className="oval"></div>
            </div>

            <div className="featured-section">
                <img src="double-down-arrow.svg" alt="" style={{ width: '15px', marginBottom: '56px' }} />
                <h3 className="featured-header">Browse Featured Properties</h3>
                <FeaturedTabs />
            </div>
            <div className="about-oval"></div>
            <div className="about-section-container">
                <div className="about-section">
                    <div className="about-left">
                        <p>About Prevue</p>
                        <h3>Headline with USP related to how your product or service works</h3>
                        <button className="learn-more">Learn More</button>
                    </div>
                    <div className="about-right">
                        <p>
                            At Prevue, we are your gateway to unforgettable experiences. Our mission is to simplify your quest for the perfect property, dining experience, or outing.
                            Our platform offers immersive virtual reality tours, allowing you to step inside properties or explore dining destinations before you arrive.
                            We are committed to transparency in your planning, with cost estimates that cover every detail, from property costs to VAT and caution fees.
                        </p>
                        <button className="learn-more">Learn More</button>
                    </div>
                </div>
                <img src="/about-image.png" alt="" />
            </div>

            <div className="steps-section-container">
                <div className="steps-section md:flex sm:grid my-[100px] mx-[20px] md:text-start sm:text-center justify-center">
                    <div className=" lg:block md:hidden sm:hidden">
                        <img src="/steps-image.png" alt="" />
                    </div>
                    <div className="steps-right">
                        <h3>
                            How it works <br /> in 3 simple steps
                        </h3>
                        <div className="steps">
                            <div className="step-1">
                                <span className="step-number">01</span>
                                <p className="step-header">Start by selecting a category</p>
                                <p className="">Whether is a charming property, a delightful dining spot, or an exciting adventure, our platform has you covered</p>
                            </div>
                            <div className="step-1">
                                <span className="step-number">02</span>
                                <p className="step-header">Start by selecting a category</p>
                                <p className="">Whether its a charming property, a delightful dining spot, or an exciting adventure, our platform has you covered</p>
                            </div>
                            <div className="step-1">
                                <span className="step-number">03</span>
                                <p className="step-header">Start by selecting a category</p>
                                <p className="">Whether its a charming property, a delightful dining spot, or an exciting adventure, our platform has you covered</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="showcase-section">
                <div className="flex flex-row px-[70px] ">
                    <div className="headline-left ">
                        <h4>Preview Locations</h4>
                        <h3>Step into Your Favorite Locations with our panoramic virtual tours</h3>
                    </div>
                    <div className="headline-right">
                        <p>
                            Our 360° location previews take you on a mesmerizing journey to explore properties, restaurants, and activities like never before.
                        </p>
                    </div>
                </div>
                <Carousel/>
            </div>
            <Footer/>
        </>
    );
};