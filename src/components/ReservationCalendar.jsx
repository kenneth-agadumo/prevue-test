import "react-datepicker/dist/react-datepicker.css";
import '../App.css'
import '../components.css'
import React, { useState } from "react";
import DatePicker from "react-datepicker";

const DateRangePicker = () => {
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
    <h2>Date Range Picker</h2>

    {/* Date Picker with range selection */}
    <div style={{ marginBottom: "20px" }}>
      <DatePicker
        selected={startDate}
        onChange={(update) => setDateRange(update)} // Updates the date range
        startDate={startDate}
        endDate={endDate}
        selectsRange
        placeholderText="Select Date Range"
        className="date-picker"
        
        inline
      />
    </div>

    {/* Display Selected Dates */}
    <div style={{ marginTop: "20px" }}>
      <div style={{ marginBottom: "10px" }}>
        <strong>Start Date:</strong> {startDate ? startDate.toDateString() : "Not Selected"}
      </div>
      <div>
        <strong>End Date:</strong> {endDate ? endDate.toDateString() : "Not Selected"}
      </div>
    </div>
  </div>
);
};

export default DateRangePicker;
