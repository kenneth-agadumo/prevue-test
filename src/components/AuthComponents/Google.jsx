"use client";
import React, { useState } from "react";


const Google = ({ href, handleClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <button
      className={`custom-button  flex justify-center md:border md:border-[#b1afaf] text-whiteBackground font-bold lg:py-2 lg:px-4 py-1 px-[10px] lg:min-w-[400px]  min-w-[90px] min-h-[20px] rounded-full md:text-[.7rem] lg:text-[15px] hover:bg-[#c4c3c3]`}
      onClick={handleClick}
    >
     <img src="/google.svg" alt="Google Icon" className="w-6 h-6 mr-2" />
     Sign up with Google
    </button>
   
  );
};

export default Google;