import "react-datepicker/dist/react-datepicker.css";
import '../App.css'
import '../components.css'
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Dropdown } from "./Dropdown";
import Button from '../micro-components/Button';

const DateRangePicker = ({ costPerNight, cautionFee }) => { // Destructure costPerNight from props
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Calculate total estimated cost
  const calculateTotalCost = () => {
    if (startDate && endDate) {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const numberOfDays = Math.ceil((endDate - startDate) / millisecondsPerDay); // Difference in days
      let totalCost = ((numberOfDays * Number(costPerNight)) + Number(cautionFee) ) 
      return totalCost.toLocaleString() ;
    }
    return 0;
  };

  return (
    <div className="w-full " style={{ padding: "20px", textAlign: "center" }}>
      {/* Date Picker with range selection */}
      <div className="" style={{ marginBottom: "20px" }}>
        <DatePicker
          selected={startDate}
          onChange={(update) => setDateRange(update)} // Updates the date range
          startDate={startDate}
          endDate={endDate}
          selectsRange
          placeholderText="Select Date Range"
          className="date-picker border-neutral-400"
          inline
        />
      </div>

      {/* Display Selected Dates */}
      <div className="w-full h-28 flex flex-wrap box-border border overflow-hidden border-neutral-400 rounded-md justify-start mb-4">
        <div className="flex flex-col justify-center box-border border-r border-neutral-400 p-1" style={{ width: '50%' }}>
          <p>CHECK-IN</p> {startDate ? startDate.toDateString() : "--/--/--"}
        </div>

        <div className="flex flex-col justify-center box-border border-neutral-400 p-1" style={{ width: '50%' }}>
          <p>CHECK-OUT</p> {endDate ? endDate.toDateString() : "--/--/--"}
        </div>

        <div className="basis-full w-full h-full box-border overflow-hidden  bg-white mb-6 border-t border-neutral-400">
         <input type="number"
          name="guests"
          min="0"
          max="5"
          placeholder="Guests"
          className="w-full h-14  flex justify-center align-center p-3"
          style={{}}
         />
        </div>
      </div>

      {/* Total Estimated Cost */}
      <div className="flex justify-between my-5">
        <p>Total Estimated Cost</p>
        <p className="text-xl font-semibold text-primary">
          ₦{startDate && endDate ? calculateTotalCost() : '-----'}
        </p>
      </div>

      <div>
        <Button
          title={'Book Reservation'}
          width={'100%'}
          height={'50px'}
          borderRadius={'30px'}
          background={'var(--primary-color'}
          color={'white'}
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
