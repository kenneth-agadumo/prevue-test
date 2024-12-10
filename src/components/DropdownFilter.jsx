import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const DropdownFilter = () => {
  const [isOpen, setIsOpen] = useState(false); // To toggle the dropdown visibility
  const [selectedOption, setSelectedOption] = useState("All"); // To keep track of the selected option

  const options = ["Restaurants", "Shortlets"];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative inline-block w-32">
      {/* Button-like Dropdown */}
      <button
        onClick={toggleDropdown}
        className="w-full flex justify-between items-center px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
      >
        <span className="text-sm">{selectedOption}</span>
        <IoIosArrowDown className="text-gray-500 text-lg" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
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
