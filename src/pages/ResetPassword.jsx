import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { managerAuth } from "../firebaseConfig.jsx";
import { setNewPasswordSchema } from "../auth/setPassword.js";
import InputField from "../components/AuthComponents/Input.jsx";
import Btn from "../components/AuthComponents/Btn.jsx";

const ResetPassword = () => {
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  // Extract the 'oobCode' from the URL
  useEffect(() => {
    const url = window.location.href;
    const urlParams = new URLSearchParams(new URL(url).search);
    const oobCode = urlParams.get("oobCode");
    setCode(oobCode);
  }, []);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (values) => {
    setError(null);
    const { newPassword } = values;

    try {
      // Verify the password reset code
      await verifyPasswordResetCode(managerAuth, code);

      // Confirm the new password
      await confirmPasswordReset(managerAuth, code, newPassword);

      // Redirect to success page
      navigate("/passwordresetsuccessful");
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
        <h2 className="text-2xl font-bold text-center mb-6">
          Set new Password{" "}
        </h2>
        <small>{error && <p style={{ color: "red" }}>{error}</p>}</small>
        <Formik
          initialValues={initialValues}
          validationSchema={setNewPasswordSchema} // Use imported schema
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <InputField
                label="New Password"
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
              />
              <InputField
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
              />
              <div className="flex items-center justify-center">
                <Btn text="Reset Password" color="bg-[#f2a20e]" />
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4 flex flex-col">
          <p className="text-sm text-gray-600 mt-4">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-[#f2a20e] hover:text-[#f2a20f] font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
