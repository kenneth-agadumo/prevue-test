import { useState } from "react";
import Select from 'react-select';
import '../components.css'; // Optional: If you have additional styles

export const Dropdown = ({ onChange, itemNumber, itemsArray, width, maxWidth, height, border, borderTop,  borderRadius, color, backgroundColor, isSearchable, placeholder }) => {
  // Prepare options for react-select
  const options = itemsArray.slice(0, itemNumber).map(item => ({ value: item, label: item }));

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption); // Update local state
    onChange(selectedOption.value); // Pass the selected value to the parent
  };

  // Custom styles for react-select
  const customStyles = {
    container: (provided) => ({
      ...provided,
      maxWidth: width || 'auto', // Set the container width as needed
    }),
    control: (provided, state) => ({
      ...provided,
      fontSize: '14px',
      minHeight: height || '38px',
      borderRadius: borderRadius,
      border: border || 'none',

      boxShadow: 'none',
      
      padding: '4px',
      backgroundColor: backgroundColor,
      maxWidth:  maxWidth || 'fit-content',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999',
      fontSize: '14px',
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '10px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      zIndex: 9999,
      fontSize: '14px',
      width: 'max-content',
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '12px 30px',
      backgroundColor: state.isSelected ? '#f0f0f0' : state.isFocused ? '#e0e0e0' : 'white',
      color: state.isSelected ? '#333' : '#000',
      fontSize: '14px',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#333',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    input: (provided) => ({
      ...provided,
      width: '100%',
      minWidth: '100px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }),
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleSelect} // Updated to pass the selected option object
      options={options}
      styles={customStyles}
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder={placeholder}
    />
  );
};  