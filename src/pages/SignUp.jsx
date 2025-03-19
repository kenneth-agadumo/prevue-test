import React, { useState, useEffect } from "react";
import Google from "../components/AuthComponents/Google.jsx";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupValidationSchema } from "../auth/signupValidationSchema";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from "firebase/auth";
import { managerAuth, db, googleProvider } from "../firebaseConfig";
import { collection, query, where, getDocs, updateDoc, arrayUnion, setDoc, doc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Btn from "../components/AuthComponents/Btn";
import { useGlobalState } from "../Contexts/GlobalStateContext.jsx";


const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {currenUserRole, setCurrentUserRole} = useGlobalState()


  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "", // Add phone to initial values
  };


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

  // -----------------------------
  // Email/Password Signup Handler
  // -----------------------------
  const onSubmit = async (values) => {
    setError(null);
    const { fullName, email, password, phone } = values;

    try {
      // Query Firestore for a document with the same email
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      let userExistsInFirestore = false;

      if (!querySnapshot.empty) {
        // There is at least one document with a matching email.
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        if (data.roles && data.roles.includes("manager")) {
          // If the roles array already contains "manager", throw an error
          throw new Error("User already exists. Sign in to access dashboard")
        } else {
          // The document exists but does not include "manager".
          // Update the document to add the "manager" role.
          await updateDoc(doc(db, "users", docSnap.id), {
            roles: arrayUnion("manager"),
          });
          userExistsInFirestore = true;
          
          navigate('/dashboard')
        }
      }

      let user;
      if (userExistsInFirestore) {
        // The user exists in Firestore (but not as a manager) so we sign them in.
        const userCredential = await signInWithEmailAndPassword(managerAuth, email, password);
        user = userCredential.user;
        setCurrentUserRole('manager')
        navigate('/dashboard')
      } else {
        // No document was found, so create a new auth user.
        const userCredential = await createUserWithEmailAndPassword(managerAuth, email, password);
        user = userCredential.user;

        if(!user.emailVerified){
          await sendEmailVerification(user);
        }

        // Create a new document in Firestore with the user's details.
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          fullName: fullName,
          email: email,
          phone: phone,
          roles: ["manager"],
        });
      }
      setCurrentUserRole('manager')
      navigate("/verify-email");
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    }
  };

  // -----------------------------
  // Google Sign-Up Handler
  // -----------------------------
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(managerAuth, googleProvider);
      const user = result.user;
      console.log("User signed in with Google:", user);
      if (!user) throw new Error("User not created");

      await sendEmailVerification(user);

      // Query Firestore for a document with the same email.
      const q = query(collection(db, "users"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      let userExistsInFirestore = false;

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        if (data.roles && data.roles.includes("manager")) {
          // If the roles array already contains "manager", navigate to dashboard
          userExistsInFirestore = true;
          setCurrentUserRole('manager')
          navigate('/dashboard')
        } else {
          // Update the document to add the "manager" role.
          await updateDoc(doc(db, "users", docSnap.id), {
            roles: arrayUnion("manager"),
          });
          userExistsInFirestore = true;
          setCurrentUserRole('manager')
          navigate('/dashboard')
        }
      }
      if (!userExistsInFirestore) {
        // No matching document, so create a new one.
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          fullName: user.displayName,
          email: user.email,
          phone: user.phoneNumber || "",
          roles: ['manager'],
        });
      }
      setCurrentUserRole('manager')
      
      if(!user.emailVerified){
        navigate("/verify-email")
      }
      else{
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.message);
      console.error("Google sign-in error:", error);
    }
    console.log(currenUserRole)
  };

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
        <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
        {error && <small style={{ color: "red" }}>{error}</small>}

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
                  onChange={(value) => setFieldValue("phone", value)}
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
                <label className="block text-blackBackground text-sm font-bold mb-2" htmlFor="confirmPassword">
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
            <Link to="/login" className="text-[#f2a20e] hover:text-[#f2a20f] font-semibold">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
