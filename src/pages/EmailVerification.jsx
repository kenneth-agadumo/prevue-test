import React, { useState, useEffect } from "react";
import { auth } from "../firebaseConfig.jsx";
import { sendEmailVerification } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../layout.css";

export const EmailVerification = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(20);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      // Redirect to login if no user is found
      navigate("/login");
      return;
    }
    
    setEmail(user.email); // Set email from the authenticated user

    // Check email verification status periodically
    const interval = setInterval(async () => {
      await user.reload();
      if (user.emailVerified) {
        clearInterval(interval);
        navigate("/dashboard");
      }
    }, 1000); // Check every second

    // Set up the timer for enabling the resend button
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    } else {
      setIsButtonDisabled(false);
    }

    // Clear intervals on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [timer, navigate]);

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setTimer(30);
      setIsButtonDisabled(true);
    } catch (error) {
      console.error("Error resending verification email:", error);
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
          <img style={{ width: "50px", margin: "0 auto" }} src="/message.png" alt="Email Icon" />
          <h2 className="text-2xl font-bold mb-2">Check your email</h2>
          <p className="text-sm text-gray-600 mb-2">
            We sent you a verification link to
          </p>
          {email ? ( // Conditional rendering for email
            <p className="text-lg font-semibold">{email}</p>
          ) : (
            <p className="text-lg font-semibold text-red-500">No email found.</p>
          )}
          <p className="text-sm text-gray-600 mt-4">
            If you didn't receive an email,{" "}
            <span
              style={{
                color: "var(--primary-color)",
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
              onClick={!isButtonDisabled ? handleResendVerification : null}
            >
              click to resend
            </span>
          </p>
          <small className="block mt-2 text-sm text-gray-500">
            Resend button will be enabled in {timer} seconds.
          </small>
          <button
            type="button"
            className={`form-button mt-4 ${isButtonDisabled && "disabled"}`}
            onClick={handleResendVerification}
            disabled={isButtonDisabled}
          >
            Resend Verification
          </button>
        </div>
        <div className="text-center mt-4">
          <Link to="/login" className="text-[#f2a20e] hover:text-[#f2a20f] font-semibold">
            Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
