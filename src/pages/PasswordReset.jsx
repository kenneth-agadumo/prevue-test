import React, { useState } from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import InputField from "../components/AuthComponents/Input"; // InputField component
import Btn from "../components/AuthComponents/Btn.jsx"; // Button component

const PasswordReset = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const initialValues = {
    email: "",
  };

  const onSubmit = async (values) => {
    setError(null);
    setMessage("");

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, values.email);
      setMessage("Password reset email sent. Please check your email inbox.");
    } catch (error) {
      setError(error.message);
      console.error("Password reset error:", error);
    }
  };

  return (
    <div className="grid place-items-center bg-primary pt-[50px] pb-[150px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <img
          style={{ width: "50px", margin: "0 auto" }}
          src="/key.svg"
          alt="key icon"
        />
        <h2 className="text-2xl font-bold text-center mb-6">Password Reset</h2>
        <p className="text-center mb-4">
          Your password has been successfully reset. <br/> Click below to log in
          magically.
        </p>

        <div className="flex items-center justify-center">
          <Btn text="Continue" href="/login" color='bg-[#f2a20e]' />
        </div>

        <div className="text-center mt-4 flex flex-col">
          <p className="text-sm text-gray-600 mt-4">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-[#f2a20e] hover:text-[#f2a20f] font-semibold"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordReset;
