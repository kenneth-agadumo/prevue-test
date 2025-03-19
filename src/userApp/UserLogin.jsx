import { Formik, Form } from "formik";
import { loginValidationSchema } from "../auth/loginValidationSchema";
import InputField from "../components/AuthComponents/Input";
import { IoClose } from "react-icons/io5";
import {
    signInWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
    onAuthStateChanged
  } from "firebase/auth";
  import {  userAuth, googleProvider } from "../firebaseConfig.jsx";
import {  useNavigate } from "react-router-dom";
import { useGlobalState } from "../Contexts/GlobalStateContext.jsx";



const UserLogin = ({ setIsModalOpen, isSignup, setIsSignup,  handleSignInWithGoogle}) => {

    const {currentUserRole, setCurrentUserRole, rememberMe, setRememberMe} = useGlobalState()
    const navigate = useNavigate();


    const initialValues = {
        email: "",
        password: "",
      };

    //   * handle signin function *
      const handleSignIn = async (values) => {
        const { email, password } = values;

        try {
            // Set persistence based on the "Remember me" checkbox
            const persistence = browserLocalPersistence
            await setPersistence(userAuth, persistence);

            
            const result = await signInWithEmailAndPassword(userAuth, email, password);
            const signedInUser = result.user

            setCurrentUserRole('user')
            navigate("/");
        } catch (error) {
          console.error("Sign In Error:", error);
        }
      };
        
    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg ">
                <div className="flex justify-between mb-2">
                  <h2 className="text-lg font-bold">
                     User Login
                  </h2>
                  <IoClose
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => setIsModalOpen(false)}
                  />
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={handleSignIn}
                >   
                    { () => (
                        <Form>

                            <InputField
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="w-full px-3 py-5 mb-6 border rounded"
                            />

                            <InputField
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="w-full px-3 py-5 mb-6 border rounded"
                            />

                            

                            <button 
                            
                            className="w-full px-4 py-2 bg-primary text-white rounded-2xl" 
                            >
                                    Sign In
                            </button>
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
                     Don't have a User account? Sign up
                  </p>

                </div>
            </div>
        </div>
    )
}

export default UserLogin