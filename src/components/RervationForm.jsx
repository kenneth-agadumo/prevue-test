import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; // Import date-fns for date formatting
import '../components.css'
import { ReactComponent as Clock } from '../assets/clock.svg';
import { ReactComponent as Calendar  } from '../assets/calendar.svg';
import { heightPropDefs } from '@radix-ui/themes/props';

const ReservationForm = () => {
  const [startDate, setStartDate] = useState(null); // Initialize with null
  const [selectedTime, setSelectedTime] = useState(null); // Initialize with null

  // Custom input for DatePicker
  const DateCustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <button
    className={className}
    onClick={onClick}
    ref={ref}
    >
        <Calendar style={{color:"#242423"}} />
      {value || "Select Date"} {/* Default value */}

    </button>
  ));

  // Custom input for TimePicker
  const TimeCustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <button
      className={className}
      onClick={onClick}
      ref={ref}
    >
        <Clock style={{color:"#242423", }} />
      {value || "Select Time"} {/* Default value */}
    </button>
  ));

  // Handle time change
  const handleTimeChange = (date) => {
    setSelectedTime(date);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Reservation set for ${startDate ? format(startDate, 'dd/MM/yyyy') : 'No date selected'} at ${selectedTime ? format(selectedTime, 'HH:mm') : 'No time selected'}`);
    // Handle the form submission logic here
  };

  return (
    <div style={{width:'100%', display: 'flex', justifyContent:'space-between'}}>

        <div>
         
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<DateCustomInput className="date-custom-input" />}
            dateFormat="dd/MM/yyyy" // Format the date
          />
        </div>

        <div>
         
          <DatePicker
            selected={selectedTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="HH:mm"
            customInput={<TimeCustomInput className="time-custom-input" />}
          />
        </div>

       <div>
        <select name="" id="">
            <option value="1">1</option>
        </select>
       </div>
    </div>
  );
};

export default ReservationForm;
