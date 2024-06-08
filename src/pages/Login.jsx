
import { useState } from 'react'
import {app, auth} from '../firebaseConfig.jsx'
import {  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import '../layout.css'

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redirect to Dashboard after successful login
    } 
    catch (error) {
      setError(error.message);
      console.error('Login error:', error);
    }

  };


  const handleSignInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('User signed in with Google:', user);

      navigate('/dashboard'); // Redirect to Dashboard after successful sign-in
      // Send email verification
      // await sendEmailVerification(user);

    } catch (error) {
      setError(error.message);
      console.error('Google sign-in error:', error);
    }
  };

  return (
    <div className='form-container'>
      <div className="form">
      <h2>Welcome back!</h2>
      <p>Please enter your details to login</p>
      
      <form className='' onSubmit={handleLogin}>
      {error && <small style={{ color: 'red' }}>{error}</small>}
        <div className='row-1'>
          <label htmlFor="email"><small>Email:</small></label><br />
          <input className='input' type="email" id="email" 
          value={email}
          placeholder='Enter your email' 
          onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='row-2'>
          <label htmlFor="password"><small>Password:</small></label><br />
          <input className='input' type="password" id="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className='row-3'>
         <span className='input-span'   >
         <input className='row-3-input' type="checkbox" id="remember" name='remember'  />
          <label htmlFor="remember"><small>Remember for 30 days</small></label>
          </span>
          <Link to={'/forgot-password'} style={{paddingTop:'10px'}}><small > Forgot Password</small></Link>
        </div>
        
        <button type="submit" className='form-button '>Sign in</button>
        <button type="button"  onClick={handleSignInWithGoogle} className='google-button'> <img src="google.svg" alt="" style={{width:'15px', paddingRight:'15px'}} /> Sign in with Google</button>

        <small> Don't have an account? <Link to={'/register'}>Sign up</Link></small>
      </form>
      </div>
    </div>
  );
};
