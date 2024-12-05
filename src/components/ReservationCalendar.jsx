import "react-datepicker/dist/react-datepicker.css";
import '../App.css'
import '../components.css'
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const DateRangePicker = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

  return (
    <div className="w-full " style={{ padding: "20px", textAlign: "center",  }}>
    

    {/* Date Picker with range selection */}
    <div className="" style={{ marginBottom: "20px" }}>
      <DatePicker
        selected={startDate}
        onChange={(update) => setDateRange(update)} // Updates the date range
        startDate={startDate}
        endDate={endDate}
        selectsRange
        placeholderText="Select Date Range"
        className="date-picker "
        
        inline
      />
    </div>

    {/* Display Selected Dates */}
    <div className="w-full flex border border-neutral-300 rounded-md" style={{}}>
      <div className="box-border p-1">
        <p >CHECK-IN </p> <br /> {startDate ? startDate.toDateString() : "--/--/--"}
      </div>
      <div className="box-border">
        <p>Check-OUT</p> {endDate ? endDate.toDateString() : "--/--/--"}
      </div>

    </div>
  </div>
);
};

export default DateRangePicker;
