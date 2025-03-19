import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({ label, type, id, placeholder }) => {
  return (
    <div className="mb-4 ">
      <label
        htmlFor={id}
        className="block text-blackBackground lg:text-sm text-md font-bold mb-2"
      >
        {label}
      </label>
      <Field
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="shadow appearance-none border h-[44px] min-w-[90%] w-[100%] rounded md:w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[20px]  lg:text-[15px]"
      />
      <ErrorMessage name={id} component="div" className="text-red-500 text-xs mt-1" />
    </div>
  );
};

export default InputField;