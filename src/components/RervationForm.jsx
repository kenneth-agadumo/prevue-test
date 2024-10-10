// eslint-disable-next-line no-unused-vars
import React, { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns'; // Import date-fns for date formatting
import '../components.css'
import { ReactComponent as Clock } from '../assets/clock.svg';
import { ReactComponent as Calendar  } from '../assets/calendar.svg';
import { heightPropDefs } from '@radix-ui/themes/props';
import {Dropdown} from '../components/Dropdown'
import Button from '../micro-components/Button';

const ReservationForm = () => {
  const [startDate, setStartDate] = useState(null); // Initialize with null
  const [selectedTime, setSelectedTime] = useState(null); // Initialize with null

  // Custom input for DatePicker
  // eslint-disable-next-line react/display-name, react/prop-types
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
  // eslint-disable-next-line react/display-name, react/prop-types
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
    <div style={{width:'100%', height:'100%', display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
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


        </div>

        
       <div>
            <Dropdown itemNumber={5} itemsArray={[ '1', '2', '3', '4', '5+']} backgroundColor={"#f3f3f3"} width={'100%'} border={'none'} borderRadius={'20px'} placeholder={'guests'} />
       </div>
       <div>
            <Button title={'Book Reservation'} width={'100%'} height={'50px'} borderRadius={'30px'} background={'var(--primary-color'} color={'white'} /> 
       </div>
    </div>
  );
};

export default ReservationForm;
