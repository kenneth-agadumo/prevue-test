import {  createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification } from "firebase/auth";
import {  auth , googleProvider, db} from '../firebaseConfig.jsx'
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../layout.css'


export const  Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  // const [verificationSent, setVerificationSent] = useState(false); // verification email status
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user)

      if (user){
        // Send email verification  
        await sendEmailVerification(user);
 
         await addDoc(collection (db, 'users'), {
         uid : user.uid,
         fullName : fullName,
         email: email,
         phoneNumber: phoneNumber,
     
        })
        
        
        
        navigate('/verify-email')       
       }else{
         throw new Error('User not created');
       }
       // Optionally, you can store additional user data in Firebase Firestore or Realtime Database
       // Example: firebase.firestore().collection('users').doc(user.uid).set({ userName });
 
    } catch (error) {
      setError(error.message);
      console.error('Registration error:', error);
    }
  };


  
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User signed in with Google:', user);
  
      // Add user details to Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        fullName: user.displayName,
        email: user.email
      });

      const imageRef = ref(storage, `/users/${user.uid + '-image-1'}`);
      await uploadBytes(imageRef, user.p)
        .then(() => console.log('Image uploaded successfully'))
        .catch((error) => console.error('Error uploading image:', error));

      console.log(user.displayName)
  
      // Optionally, send email verification (though usually Google accounts are already verified)
      await sendEmailVerification(user);
  
      navigate('/dashboard'); // Redirect to Dashboard after successful sign-in
    } catch (error) {
      setError(error.message);
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
      <h2>Create an account</h2>
      <p>Start your 30-day free trial</p>
      <small>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      </small>
      <form onSubmit={handleRegister} className="register-form" style={{boxSizing: 'border-box'}}>
        <div>
          <label htmlFor="fullName">Name*</label>

          <input className='input' type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name" required />
        </div>
        <div>
          <label htmlFor="email">Email*</label>
          <input className='input' type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
        </div>
        <div>
          <label htmlFor="email">Phone Number*</label>
          <input className='input' type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your Phone Number" required />
        </div>
        <div>
          <label htmlFor="password">Password*</label>
          <input className='input' type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create your password" required /> <br />
          <small>Must be at least 8 characters</small>
        </div>
        <div>
          <button type="submit" className="form-button" style={{width:'100%', marginLeft: '-10px'}}>Get started</button>
          <button type="button" onClick={handleSignInWithGoogle} className="google-button" style={{width:'100%', marginLeft: '-10px'}}> <img src="/google.svg" alt="" style={{width:'15px', paddingRight:'15px'}} /> Sign up with Google</button>
        </div>
        <small> Already have an account? <Link to={'/login'}> Login</Link></small>
      </form>
      </div>
      
    </div>
  );
};