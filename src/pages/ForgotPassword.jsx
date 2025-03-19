import React, { useState } from "react";
import { managerApp } from "../firebaseConfig.jsx";
import { sendPasswordResetEmail } from "firebase/auth";
import {  managerAuth } from "../firebaseConfig";

import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import InputField from "../components/AuthComponents/Input";
import Btn from "../components/AuthComponents/Btn.jsx";
import { forgotPasswordSchema } from "../auth/forgotPassword.js";


const ForgotPassword = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const handleResetPassword = async (values) => {
    setError(null);
    setMessage("");

    try {
     
      await sendPasswordResetEmail(managerAuth, values.email);
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
        <div className="text-center mb-6">
          <img style={{ width: "50px", margin: "0 auto" }} src="/key.svg" alt="Key Icon" />
          <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-sm text-gray-600">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {/* Display messages */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}

        <Formik
          initialValues={initialValues}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleResetPassword}
        >
          {() => (
            <Form className="fp-form">
              <InputField
                label="Email Address"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <div className="flex items-center justify-center mt-4">
                <Btn text="Reset Password" color="bg-[#f2a20e]" />
              </div>
            </Form>
          )}
        </Formik>

        <div className="text-center mt-4 flex flex-col">
          <Link to="/login" className="text-[#f2a20e] hover:text-[#f2a20f] font-semibold mt-4">
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
