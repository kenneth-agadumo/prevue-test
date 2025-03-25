
import { Formik, Form, ErrorMessage, Field } from "formik";
import { signupValidationSchema } from "../auth/signupValidationSchema";
import InputField from "../components/AuthComponents/Input";
import { IoClose } from "react-icons/io5";
import {
  createUserWithEmailAndPassword, 
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged
  } from "firebase/auth";
import { collection, query, where, getDoc, updateDoc, arrayUnion, setDoc, doc } from "firebase/firestore";
  import {  userAuth, googleProvider, db } from "../firebaseConfig.jsx";
import {  useNavigate } from "react-router-dom";
import { useGlobalState } from "../Contexts/GlobalStateContext.jsx";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Google from "../components/AuthComponents/Google.jsx";



const UserSignUp = ({ isSignup, setIsSignup, setIsModalOpen, handleSignInWithGoogle}) => {

  const {currentUserRole, setCurrentUserRole, rememberMe, setRememberMe} = useGlobalState()
  const navigate = useNavigate()
    const initialValues = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "", // Add phone to initial values
      };
    
  const handleSignUp = async (values) => {
    try {
        // Set persistence based on the "Remember me" checkbox
        const persistence = browserLocalPersistence
        await setPersistence(userAuth, persistence);
        
      const { fullName, email, phone, password } = values;
      const userCredential = await createUserWithEmailAndPassword(userAuth, email, password);
      const signedInUser = userCredential.user;

       // Reference to the user's document in Firestore.
       const userDocRef = doc(db, "users", signedInUser.uid);
       const userDocSnap = await getDoc(userDocRef);
      

       if (userDocSnap.exists()) {
        // If the document exists, check the roles field.
        const userData = userDocSnap.data();
        
        const roles = userData.roles ;
        if (!roles.includes("user")) {
          await updateDoc(userDocRef, {
            roles: arrayUnion("user"),
          });
          console.log("Added 'user' role to existing user document");
        } else {
          console.log("User already has 'user' role");
        }
        setCurrentUserRole('user')
        console.log(currentUserRole)
      } else {
        // Create a new document if none exists.
        await setDoc(userDocRef, {
          fullName,
          email,
          phone,
          userid: signedInUser.uid,
          roles: ["user"],
        });
        setCurrentUserRole('user')
        console.log("Created new user document with 'user' role");
      }

    //   await setDoc(doc(db, "users", user.uid), {
    //     uid: user.uid,
    //     fullName,
    //     email,
    //     phone,
    //     roles: [... "user"],
    //   });
      
      navigate("/");
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[30%]">
                <div className="flex justify-between mb-2">
                    <h2 className="text-lg font-bold">
                        User Signup
                    </h2>
                    <IoClose
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>

                <Formik
                initialValues={initialValues}
                validationSchema={signupValidationSchema}
                onSubmit={handleSignUp}
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
                            <button 
                            className="w-full px-4 py-2 bg-primary text-white rounded-2xl" 
                            >
                                    Sign Up
                            </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="flex flex-col gap-3 items-center">
                    <button
                        className="w-full px-4 py-2 md:border md:border-gray-300 text-black rounded-2xl"
                        onClick={handleSignInWithGoogle}
                    >
                        Sign In With Google
                    </button>
                    <p
                        className="text-sm text-gray-600 cursor-pointer hover:underline"
                        onClick={() => setIsSignup(!isSignup)}
                    >
                     Already have a User account? Sign in
                        
                    </p>
                </div>
            </div>
       </div>
    )
}

export default UserSignUp;