import React, { useState } from "react";
import { Formik, Form } from "formik";
import { signupValidationSchema } from "../auth/signupValidationSchema";
import { motion } from "framer-motion";
import InputField from "../components/AuthComponents/Input";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { auth, googleProvider, db } from "../firebaseConfig.jsx";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Btn from "../components/AuthComponents/Btn.jsx";
import Google from "../components/AuthComponents/Google.jsx";

const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = async (values) => {
    setError(null);
    const { fullName, email, password, phoneNumber } = values;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        // Send email verification
        await sendEmailVerification(user);

        // Add user details to Firestore
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          fullName: fullName,
          email: email,
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

      // Add user details to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email,
      });

      await sendEmailVerification(user);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Google sign-in error:", error);
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
          Create Your Account
        </h2>
        <small>{error && <p style={{ color: "red" }}>{error}</p>}</small>
        <Formik
          initialValues={initialValues}
          validationSchema={signupValidationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <InputField
                label="Full Name"
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
              />
              <InputField
                label="Email Address"
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
              />
              <InputField
                label="Password"
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
              />
              <InputField
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
              />
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
