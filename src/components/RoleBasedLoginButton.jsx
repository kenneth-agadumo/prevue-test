import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, googleProvider, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useGlobalState } from "../Contexts/GlobalStateContext";

const LoginButton = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [user, setUser] = useState(null); // state for authenticated user
  const {currentUserRole, setCurrentUserRole} = useGlobalState()
  const navigate = useNavigate();


  // Listen for authentication state changes.
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleUserClick = () => {
    setIsModalOpen(true);
    setDropdownOpen(false);
    setIsSignup(true);
  };

  const handleManagerClick = () => {
    navigate("/login"); // Redirect to manager login page
  };

    // -----------------------------
  // // Email/Password Signup Handler
  // // -----------------------------
  // const onSubmit = async (values) => {
  //   setError(null);
  //   const { fullName, email, password, phone } = values;

  //   try {
  //     // Query Firestore for a document with the same email
  //     const q = query(collection(db, "users"), where("email", "==", email));
  //     const querySnapshot = await getDocs(q);
  //     let userExistsInFirestore = false;

  //     if (!querySnapshot.empty) {
  //       // There is at least one document with a matching email.
  //       const docSnap = querySnapshot.docs[0];
  //       const data = docSnap.data();
  //       if (data.roles && data.roles.includes("manager")) {
  //         // If the roles array already contains "manager", navigate to dashboard
  //         userExistsInFirestore = true;
  //         navigate('/dashboard')
  //       } else {
  //         // The document exists but does not include "manager".
  //         // Update the document to add the "manager" role.
  //         await updateDoc(doc(db, "users", docSnap.id), {
  //           roles: arrayUnion("manager"),
  //         });
  //         userExistsInFirestore = true;
  //         navigate('/dashboard')
  //       }
  //     }

  //     let user;
  //     if (userExistsInFirestore) {
  //       // The user exists in Firestore (but not as a manager) so we sign them in.
  //       const userCredential = await signInWithEmailAndPassword(auth, email, password);
  //       user = userCredential.user;
  //       navigate('/dashboard')
  //     } else {
  //       // No document was found, so create a new auth user.
  //       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //       user = userCredential.user;

  //       if(!user.emailVerified){
  //         await sendEmailVerification(user);
  //       }

  //       // Create a new document in Firestore with the user's details.
  //       await setDoc(doc(db, "users", user.uid), {
  //         uid: user.uid,
  //         fullName: fullName,
  //         email: email,
  //         phone: phone,
  //         roles: ["manager"],
  //       });
  //     }
  //     navigate("/verify-email");
  //   } catch (error) {
  //     setError(error.message);
  //     console.error("Registration error:", error);
  //   }
  // };

  const handleSignInWithGoogle = async () => {
    try {
      // Sign in with Google.
      const result = await signInWithPopup(auth, googleProvider);
      const signedInUser = result.user;
      console.log("User signed in with Google:", signedInUser);
      
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
          fullname: signedInUser.displayName || "",
          email: signedInUser.email,
          phonenumber: signedInUser.phoneNumber || "",
          userid: signedInUser.uid,
          roles: ["user"],
        });
        setCurrentUserRole('user')
        console.log("Created new user document with 'user' role");
      }

      // Redirect to Dashboard after successful sign-in.
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      // Optionally, display the error message in the UI.
    }
    console.log(currentUserRole)
  };

  // Helper function to compute initials from a full name (or email if needed).
  const getInitials = (name) => {
    console.log(name)
    if (!name) {
      return ""
    }
    else{
      const names = name.split(" ");
      const initials = names.map((n) => n[0].toUpperCase()).join("");
      return initials;
    }
  };

  // Handler for logout.
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="relative">
      {user && currentUserRole === 'user' ? (
        // If a user is logged in, display a thumbnail button.
        <>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 cursor-pointer"
          >
            {user.photoURL ? (
              // If there is a user image, display it.
              <img
                src={user.photoURL}
                alt="User Thumbnail"
                className="w-full h-full object-cover"
              />
            ) : (
              // Otherwise, display the initials.
              <div className="w-full h-full flex items-center justify-center bg-gray-500 text-white font-bold">
                {getInitials(user.displayName || user.email)}
              </div>
            )}
          </div>

          {/* Dropdown for the logged in user */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg overflow-hidden shadow-lg">
              <button
                onClick={handleLogout}
                className="flex gap-3 items-center w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="px-1 py-1 w-24 h-10 bg-primary text-white rounded-2xl shadow-md"
          >
            Sign In
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg overflow-hidden shadow-lg">
              <button
                onClick={handleUserClick}
                className="flex gap-3 items-center w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                <FaUser /> User
              </button>
              <button
                onClick={handleManagerClick}
                className="flex gap-3 items-center w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                <FaUserTie /> Manager
              </button>
            </div>
          )}

          {/* User Modal for Signup/Login */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[30%]">
                <div className="flex justify-between mb-2">
                  <h2 className="text-lg font-bold">
                    {isSignup ? "User Signup" : "User Login"}
                  </h2>
                  <IoClose
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setIsModalOpen(false)}
                  />
                </div>

                {isSignup ? (
                  <>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-3 py-5 mb-6 border rounded"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-5 mb-6 border rounded"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-3 py-5 mb-6 border rounded"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-3 py-5 mb-6 border rounded"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-3 py-5 mb-6 border rounded"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-3 py-5 mb-6 border rounded"
                    />
                  </>
                )}

                <div className="flex flex-col gap-3 items-center">
                  <button 
                  className="w-full px-4 py-2 bg-primary text-white rounded-2xl" 
                  onClick={`${isSignup ? () => onSubmit(isSignup) : onSubmit}`}
                  >
                    {isSignup ? "Sign Up" : "Sign In"}
                  </button>
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
                    {isSignup
                      ? "Already have an account? Sign in"
                      : "Don't have an account? Sign up"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LoginButton;
