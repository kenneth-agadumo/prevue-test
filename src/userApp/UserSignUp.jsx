import { IoClose } from "react-icons/io5";

const UserSignUp = ({ isSignup, setIsSignup, setIsModalOpen, handleSignUp, handleSignInWithGoogle}) => {

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
            

                <div className="flex flex-col gap-3 items-center">

                    <button 
                    onClick={ handleSignUp }
                    className="w-full px-4 py-2 bg-primary text-white rounded-2xl" 
                    >
                        Sign Up
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
                     Already have a User account? Sign in
                        
                    </p>
                </div>
            </div>
       </div>
    )
}

export default UserSignUp;