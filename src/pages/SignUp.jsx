import React, { useState } from "react";
import Google from "../components/AuthComponents/Google.jsx";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupValidationSchema } from "../auth/signupValidationSchema";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Btn from "../components/AuthComponents/Btn";

const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "", // Add phone to initial values
  };

  const onSubmit = async (values) => {
    setError(null);
    const { fullName, email, password, phone } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        // Send email verification
        await sendEmailVerification(user);

        // Add user details to Firestore
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          fullName: fullName,
          email: email,
          phone: phone, 
          role: "manager",
        });

        navigate("/verify-email");
      } else {
        throw new Error("User not created");
      }
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    }
  };


  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in with Google:", user);
      
      if(user){
        // Send email verification
        await sendEmailVerification(user);

        // Add user details to Firestore
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          fullName: user.displayName,
          email: user.email,
          role: "manager",
        });

      navigate("/verify-email");
      } else {
        throw new Error("User not created");
      }
      
    } catch (error) {
      setError(error.message);
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <div className="grid place-items-center  pt-[50px] pb-[150px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
      <small>{error && <p style={{ color: "red" }}>{error}</p>}</small>

      <Formik
        initialValues={initialValues}
        validationSchema={signupValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-blackBackground text-sm font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <Field
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                className="input w-full p-4"
              />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-blackBackground text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input w-full p-4"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
            </div>

             {/* Phone Input */}
             <div className="mb-4">
              <label className="block text-blackBackground text-sm font-bold mb-2">Phone Number</label>
              <PhoneInput
                country={"ng"}
                value={values.phone}
                onChange={(value) => setFieldValue("phone", value)} // Set Formik value
                inputStyle={{ width: "100%" }}
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-blackBackground text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                className="input w-full p-4"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label
                className="block text-blackBackground text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="input w-full p-4"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
            </div>

           

            <div className="flex items-center justify-center">
              <Btn text="Sign Up" color="bg-[#f2a20e]" />
            </div>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-4 flex flex-col">
        <Google text="Sign up with Google" handleClick={handleSignInWithGoogle} />

          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
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

export default SignUp;
