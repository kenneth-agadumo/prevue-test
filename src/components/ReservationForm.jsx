// eslint-disable-next-line no-unused-vars
import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "../components.css";
import { ReactComponent as Clock } from "../assets/clock.svg";
import { ReactComponent as Calendar } from "../assets/calendar.svg";
import { heightPropDefs } from "@radix-ui/themes/props";
import { Dropdown } from "./Dropdown";
import Button from "../micro-components/Button";

// const ReservationForm = () => {
//   const [startDate, setStartDate] = useState(null); // Initialize with null
//   const [selectedTime, setSelectedTime] = useState(null); // Initialize with null

//   // Custom input for DatePicker
//   // eslint-disable-next-line react/display-name, react/prop-types
//   const DateCustomInput = forwardRef(({ value, onClick, className }, ref) => (
//     <button
//     className={className}
//     onClick={onClick}
//     ref={ref}
//     >
//         <Calendar style={{color:"#242423"}} />
//       {value || "Select Date"} {/* Default value */}

//     </button>
//   ));

//   // Custom input for TimePicker
//   // eslint-disable-next-line react/display-name, react/prop-types
//   const TimeCustomInput = forwardRef(({ value, onClick, className }, ref) => (
//     <button
//       className={className}
//       onClick={onClick}
//       ref={ref}
//     >
//         <Clock style={{color:"#242423", }} />
//       {value || "Select Time"} {/* Default value */}
//     </button>
//   ));

//   // Handle time change
//   const handleTimeChange = (date) => {
//     setSelectedTime(date);
//   };

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle the form submission logic here
//   };

//   return (
//     <div style={{width:'100%', height:'100%', display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
//         <div style={{width:'100%', display: 'flex', justifyContent:'space-between'}}>
//             <div>

//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)}
//             customInput={<DateCustomInput className="date-custom-input" />}
//             dateFormat="dd/MM/yyyy" // Format the date
//           />
//         </div>

//         <div>
//           <DatePicker
//             selected={selectedTime}
//             onChange={handleTimeChange}
//             showTimeSelect
//             showTimeSelectOnly
//             timeFormat="HH:mm"
//             timeIntervals={30}
//             dateFormat="HH:mm"
//             customInput={<TimeCustomInput className="time-custom-input" />}
//           />
//         </div>
//         </div>

//        <div>
//             <Dropdown itemNumber={5} itemsArray={[ '1', '2', '3', '4', '5+']} backgroundColor={"#f3f3f3"} width={'100%'} border={'none'} borderRadius={'20px'} placeholder={'guests'} />
//        </div>
//        <div>
//             <Button title={'Book Reservation'} width={'100%'} height={'50px'} borderRadius={'30px'} background={'var(--primary-color'} color={'white'} />
//        </div>
//     </div>
//   );
// };

// export default ReservationForm;

const ReservationForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Custom input for DatePicker
  const DateCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="flex items-center gap-2 px-4 py-2 w-full bg-gray-100 border rounded-lg text-gray-600"
      onClick={onClick}
      ref={ref}
    >
      <Calendar style={{ color: "#242423" }} />
      {value || "Select Date"}
    </button>
  ));

  // Custom input for TimePicker
  const TimeCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="flex items-center gap-2 px-4 py-2 w-full bg-gray-100 border rounded-lg text-gray-600"
      onClick={onClick}
      ref={ref}
    >
      <Clock style={{ color: "#242423" }} />
      {value || "Select Time"}
    </button>
  ));

  const handleTimeChange = (date) => setSelectedTime(date);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 w-full bg-white p-6 rounded-lg shadow-md"
    >
      <h4 className="text-lg font-semibold text-gray-800">Make Reservation</h4>

      {/* Date and Time Inputs */}
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-1/2">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<DateCustomInput />}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <DatePicker
            selected={selectedTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="HH:mm"
            customInput={<TimeCustomInput />}
          />
        </div>
      </div>

      {/* Guests Dropdown */}
      <div className="w-full">
        <Dropdown
          itemNumber={5}
          itemsArray={["1", "2", "3", "4", "5+"]}
          backgroundColor={"#f3f3f3"}
          width={"100%"}
          border={"none"}
          borderRadius={"10px"}
          placeholder={"Guests"}
        />
      </div>

      {/* Submit Button */}
      <div className="w-full">
        <Button
          title={"Book Reservation"}
          width={"100%"}
          height={"50px"}
          borderRadius={"30px"}
          background={"var(--primary-color)"}
          color={"white"}
        />
      </div>
    </form>
  );
};

export default ReservationForm;
