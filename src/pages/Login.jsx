import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { loginValidationSchema } from "../auth/loginValidationSchema";
import { motion } from "framer-motion";
import InputField from "../components/AuthComponents/Input";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  GoogleAuthProvider,
  onAuthStateChanged
} from "firebase/auth";
import {  managerAuth, googleProvider } from "../firebaseConfig.jsx";
import Btn from "../components/AuthComponents/Btn.jsx";
import Google from "../components/AuthComponents/Google.jsx";
import { useGlobalState } from "../Contexts/GlobalStateContext.jsx";

const Login = () => {
  const [error, setError] = useState(null);
  const {currentUserRole, setCurrentUserRole, rememberMe, setRememberMe} = useGlobalState()
  const navigate = useNavigate();


  useEffect(() => {
    // Check if user is already signed in
    const unsubscribe = onAuthStateChanged(managerAuth, (user) => {
      if (user) {
        console.log("User already signed in, redirecting to dashboard...");
        navigate("/dashboard"); // Redirect if already logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);


  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    setError(null);
    const { email, password } = values;

    try {
      // Set persistence based on the "Remember me" checkbox
      const persistence = browserLocalPersistence
      await setPersistence(managerAuth, persistence);

      // Sign in with email and password
      await signInWithEmailAndPassword(managerAuth, email, password);
      setCurrentUserRole('manager')
      // Redirect to Dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Login error:", error);
    }
  };

  const handleSignInWithGoogle = async () => {
    

    try {
      // Set persistence based on the "Remember me" checkbox
      const persistence = rememberMe
        && browserLocalPersistence
       
      

      // Sign in with Google
      const result = await signInWithPopup(managerAuth, googleProvider);
      const user = result.user;
      console.log("User signed in with Google:", user);

      setCurrentUserRole('manager')
      // Redirect to Dashboard after successful sign-in
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Google sign-in error:", error);
    }
  };
  console.log(managerAuth.currentUser);
  return (
    <div className="grid place-items-center pt-[50px] pb-[150px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Welcome back!</h2>
        <p className="text-center mb-4">Please enter your details to login</p>
        <small>{error && <p style={{ color: "red" }}>{error}</p>}</small>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
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
                placeholder="Enter your password"
              />
              <div className="flex justify-between items-center my-4">
                <span className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="form-checkbox"
                  />
                  <label htmlFor="rememberMe">
                    <small>Keep me signed in for 30 days</small>
                  </label>
                </span>
                <Link to="/forgot-password" className="text-sm text-[#f2a20e]">
                  Forgot Password?
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <Btn text="Sign In" color="bg-[#f2a20e]" />
              </div>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4 flex flex-col">
          <Google  text="Sign in with Google" handleClick={handleSignInWithGoogle} />
          <p className="text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#f2a20e] hover:text-[#f2a20f] font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
