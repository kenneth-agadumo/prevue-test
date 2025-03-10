import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { FaTwitter, FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { Map } from "../components/Map";

const OverviewModal = ({ isOpen, onClose, title, }) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-center z-50">
      <div className="bg-white w-1/3 h-full shadow-lg flex flex-col relative">
        
        {/* Modal Header - Fixed */}
        <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
          {/* Left Section: Close Button & Property Name */}
          <div className="flex flex-col w-full">
            <IoClose
              className="text-gray-600 text-2xl cursor-pointer hover:text-primary mb-2"
              onClick={onClose}
            />
            <h2 className="text-lg font-semibold">{title}</h2>

            {/* Full-width underline with tabs */}
            <div className="relative mt-2">
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300"></div>
              <div className="flex space-x-6">
                <button
                  className={`pb-2 relative ${activeTab === "overview" ? "text-primary font-semibold" : "text-gray-500"}`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                  {activeTab === "overview" && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-300"></span>
                  )}
                </button>
                <button
                  className={`pb-2 relative ${activeTab === "reservation" ? "text-primary font-semibold" : "text-gray-500"}`}
                  onClick={() => setActiveTab("reservation")}
                >
                  Reservation
                  {activeTab === "reservation" && (
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-300"></span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Section: Dots Menu */}
          <HiOutlineDotsVertical className="text-gray-600 text-xl cursor-pointer hover:text-gray-900" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" ? (
            <>
              {/* Iframe */}
              <div className="w-full h-60 rounded-lg overflow-hidden mb-4">
                <iframe
                  src="https://kuula.co/share/h5Hpv?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title="Property Tour"
                ></iframe>
              </div>

              {/* About Property */}
              <div className="mb-4">
                <h4 className="text-primary text-sm font-medium mb-2">About Property</h4>
                <p className="text-gray-600 text-sm">
                  Discover the perfect property. From shortlets to long-term rentals and dream homes
                  for sale. We offer a diverse range of housing options. Immerse yourself in virtual 
                  tours, calculate expenses, and stay updated with the latest listings.
                </p>
              </div>

              {/* Map */}
              <div>
                <h4 className="text-primary text-sm font-medium mb-4">Location on Map</h4>
                <Map />
              </div>

              {/* Location & Contact */}
              <div className="flex flex-col text-center space-y-4 mt-4">
                <h4 className="pt-5 text-gray-600 font-medium ">Location Contact</h4>
                
                <p className="text-gray-600 text-sm font-light">
                  <span className="text-sm text-gray-600 font-light mr-5">Phone Number</span> +234 812 345 6789
                </p>
                
                <p className=" text-gray-600 text-sm font-light">
                  <span className="text-sm text-gray-600 font-light mr-5 ">Email Address</span> info@circalagos.com
                </p>
                
                <p className="text-gray-600 text-sm font-light">
                  <span className="text-sm text-gray-600 font-light mr-5">Website:</span> 
                  <a
                    href="https://www.circalagos.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-orange-500 ml-1"
                  >
                    www.circalagos.com
                  </a>
                </p>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-4 mt-3">
                <span></span>
                  <a href="#" target="_blank">
                    <FaTwitter className="text-sm text-gray-700 hover:text-orange-500" />
                  </a>
                  <a href="#" target="_blank">
                    <FaInstagram className="text-sm text-gray-700 hover:text-orange-500" />
                  </a>
                  <a href="#" target="_blank">
                    <FaTiktok className="text-sm text-gray-700 hover:text-orange-500" />
                  </a>
                  <a href="#" target="_blank">
                    <FaFacebook className="text-sm text-gray-700 hover:text-orange-500" />
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-lg font-semibold text-gray-700">Reservation Section</h3>
              <p className="text-gray-500 text-sm">Reservation details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewModal;
