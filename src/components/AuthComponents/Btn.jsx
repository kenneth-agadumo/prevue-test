"use client";
import React, { useState } from "react";


const Btn = ({ href, text, color, border, borderColor,textColor }) => {
  const [isClicked, setIsClicked] = useState(false);

  
  return (
    <button
      className={`custom-button ${color} ${textColor}  ${border} ${borderColor} text-whiteBackground font-bold lg:py-2 lg:px-4 py-1 px-[10px] md:min-w-[400px]  min-w-[90%] min-h-[40px] rounded-full md:text-[.7rem] lg:text-[15px] hover:bg-[#f2a20ec2]`}
      
    >
      {text}
    </button>
  );
};

export default Btn;