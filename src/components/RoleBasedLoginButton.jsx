import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserTie } from "react-icons/fa6";
import { signInWithPopup, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence, } from "firebase/auth";
import { userAuth, googleProvider, db } from "../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useGlobalState } from "../Contexts/GlobalStateContext";
import UserLogin from "../userApp/UserLogin";
import UserSignUp from "../userApp/UserSignUp";

const LoginButton = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [user, setUser] = useState(null); 
  const [isLoading, setIsLoading] = useState(false)
  const {currentUserRole, setCurrentUserRole} = useGlobalState()
  const navigate = useNavigate();



  // Listen for authentication state changes.
  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = onAuthStateChanged(userAuth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
  
        // Fetch user role from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setCurrentUserRole(userData.roles?.includes("user") ? "user" : ""); 
        }
      } else {
        setUser(null);
        setCurrentUserRole(""); // Reset role when no user
      }
    });
  
    setIsLoading(false)
    return () => unsubscribe();

  }, []);

  const handleUserClick = () => {
    setIsModalOpen(true);
    setDropdownOpen(false);
    setIsSignup(false);
  };

  const handleManagerClick = () => {
    navigate("/login"); // Redirect to manager login page
  };

   

  const handleSignUp = async (values) => {
    try {
      const { fullName, email, phone, password } = values;
      const userCredential = await createUserWithEmailAndPassword(userAuth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        phone,
        roles: [... "user"],
      });
      
      navigate("/");
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };

  

  console.log(userAuth.currentUser)
  const handleSignInWithGoogle = async () => {
    try {
      // Set persistence based on the "Remember me" checkbox
      const persistence = browserLocalPersistence
      await setPersistence(userAuth, persistence);

      // Sign in with Google.
      const result = await signInWithPopup(userAuth, googleProvider);
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
      await signOut(userAuth);
      setDropdownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  console.log("User", userAuth.currentUser)
  return (
    isLoading ? (
      <>
        <p>
          Loading
        </p>
      </>
    ) : (
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
            isSignup ? (
              <UserSignUp
              setIsModalOpen={setIsModalOpen} 
              isSignup={isSignup} 
              setIsSignup ={setIsSignup}
              handleSignInWithGoogle={handleSignInWithGoogle}
              />
            ) : (
              <UserLogin
              setIsModalOpen={setIsModalOpen} 
              isSignup={isSignup} 
              setIsSignup ={setIsSignup}
              handleSignInWithGoogle={handleSignInWithGoogle}
              
              />
            )
          )}
        </>
      )}
      </div>
    )
   
    
  );
};

export default LoginButton;
