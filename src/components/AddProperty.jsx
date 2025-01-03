import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import { AiOutlineHome } from "react-icons/ai"; // Home icon for Shortlet
import { RiCupLine } from "react-icons/ri"; // Cup icon for Restaurant
import { IoClose } from "react-icons/io5"; // Close icon
import RestaurantModal from './RestaurantModal'; // Import Restaurant Modal
import ShortletModal from './ShortletModal';     // Import Shortlet Modal

const AddPropertyButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isShortletModalOpen, setIsShortletModalOpen] = useState(false);

  // Toggle Main Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Open Restaurant Modal
  const openRestaurantModal = () => {
    setIsRestaurantModalOpen(true);
    setIsModalOpen(false);
  };

  // Open Shortlet Modal
  const openShortletModal = () => {
    setIsShortletModalOpen(true);
    setIsModalOpen(false);
  };

  // Close Modals
  const closeRestaurantModal = () => setIsRestaurantModalOpen(false);
  const closeShortletModal = () => setIsShortletModalOpen(false);

  return (
    <div>
      {/* Add Button */}
      <button
        onClick={toggleModal}
        className="flex items-center gap-2 px-4 py-2 bg-[#f2a20e] hover:bg-amber-400 text-white font-semibold text-sm rounded-md shadow-md"
      >
        <GoPlus />
        <span className="text-sm">Add</span>
      </button>

      {/* Main Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-5">
            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
            >
              <IoClose />
            </button>

            {/* Modal Title */}
            <h2 className="text-lg font-semibold text-gray-800">Add Property</h2>

            {/* Divider */}
            <hr className="my-3 border-t border-gray-300" />

            {/* Instructional Text */}
            <p className="text-sm text-gray-600 mb-4">
              What property are you adding?
            </p>

            {/* Cards */}
            <div className="flex items-center gap-4">
              {/* Shortlet Card */}
              <div
                className="flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer border border-gray-200 rounded-lg p-4 hover:shadow-md hover:bg-gray-100 transition w-full"
                onClick={openShortletModal}
              >
                <AiOutlineHome className="text-3xl" />
                <h3 className="text-sm text-gray-700 whitespace-nowrap">
                  Add a Shortlet
                </h3>
              </div>

              {/* Restaurant Card */}
              <div
                className="flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer border border-gray-200 rounded-lg p-4 hover:shadow-md hover:bg-gray-100 transition w-full"
                onClick={openRestaurantModal}
              >
                <RiCupLine className="text-3xl" />
                <h3 className="text-sm text-gray-700 whitespace-nowrap">
                  Add a Restaurant
                </h3>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <RestaurantModal isOpen={isRestaurantModalOpen} onClose={closeRestaurantModal} />
      <ShortletModal isOpen={isShortletModalOpen} onClose={closeShortletModal} />
    </div>
  );
};

export default AddPropertyButton;
