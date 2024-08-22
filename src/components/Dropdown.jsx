import { useState } from "react";
import Select from 'react-select';
import '../components.css'; // Optional: If you have additional styles

export const Dropdown = ({ itemNumber, itemsArray, width, height, border, borderRadius, color, backgroundColor, isSearchable, placeholder }) => {
  // Prepare options for react-select
  const options = itemsArray.slice(0, itemNumber).map(item => ({ value: item, label: item }));

  const [selectedOption, setSelectedOption] = useState(placeholder);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  // Custom styles for react-select
  const customStyles = {
    container: (provided) => ({
      ...provided,
      maxWidth:  width || 'auto', // Set the container width as needed
    }),
    control: (provided, state) => ({
      ...provided,
      fontSize: '14px',
      minHeight: height ||'38px',
      borderRadius: borderRadius,
      border: border,
      borderColor: state.isFocused ? 'blue' : 'grey',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'blue',
      },
      padding: '4px',
      backgroundColor: backgroundColor,
      // Ensure the input doesn't resize
      maxWidth: 'fit-content', // Maintain width of the control
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999',
      fontSize: '14px',
    }),
    menu: (provided) => ({
      ...provided,
      marginTop:'10px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      zIndex: 9999,
      fontSize: '14px',
      width: 'max-content',
      
    }),
    option: (provided, state) => ({
      ...provided,
      padding : '12px 30px',
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
      // Ensure the input doesn't resize with content
      width: '100%',
      minWidth: '100px', // Optional: Set a minimum width
      overflow: 'hidden', // Hide overflow if necessary
      textOverflow: 'ellipsis', // Add ellipsis if text overflows
    }),
  };
  

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      styles={customStyles}
      className="react-select-container"
      classNamePrefix="react-select"
      isSearchable={isSearchable} // Disable searching
      placeholder= {placeholder}
    />
  );
};