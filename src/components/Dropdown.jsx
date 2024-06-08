import { useState } from "react";
import '../components.css'

export const Dropdown = ({itemNumber, itemsArray, width}) => {
    const [selectedItem, setSelectedItem] = useState(itemsArray[0])

    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value)
    };

    const dropdownStyle = {
        width: 'fit-content' || 'auto', // Set width to 'auto' if not provided
      };

    return (
        <select className="dropdown" style={dropdownStyle} value={selectedItem} onChange={handleSelectChange}>
          {itemsArray.slice(0, itemNumber).map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      );
}