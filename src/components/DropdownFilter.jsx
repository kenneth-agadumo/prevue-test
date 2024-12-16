import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DropdownFilter = () => {
  const [isOpen, setIsOpen] = useState(false); // To toggle the dropdown visibility
  const [selectedOption, setSelectedOption] = useState("All"); // To keep track of the selected option

  const options = ["All", "Restaurants", "Shortlets"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative inline-block w-32 mb-2 md:mb-2">
    {/* Button-like Dropdown */}
    <button
      onClick={toggleDropdown}
      className="w-full flex justify-between items-center px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
    >
      <span className="text-xs sm:text-sm">{selectedOption}</span>
      <IoIosArrowDown className="text-gray-500 text-sm sm:text-lg" />
    </button>
  
    {/* Dropdown Menu */}
    {isOpen && (
      <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
        {options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionClick(option)}
            className="px-2 py-1 text-xs sm:px-3 sm:py-2 sm:text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            {option}
          </li>
        ))}
      </ul>
    )}
  </div>
  
  );
};

export default DropdownFilter;
