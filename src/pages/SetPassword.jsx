import { useEffect, useState } from 'react'
import {app} from '../firebaseConfig.jsx'
import { useLocation } from 'react-router-dom';
import { getAuth, verifyPasswordResetCode, confirmPasswordReset  } from "firebase/auth";
import { auth } from '../firebaseConfig.jsx';
import { Link, useNavigate } from 'react-router-dom';

import '../layout.css'


export const SetPassword = () => {

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const currentUrl = window.location.href;


  const extractOobCodeFromUrl = (url) => {

    // 1. Parse the URL into its components
    const urlParts = new URL(url);
  
    // 2. Get the search parameters (the part after the '?')
    const searchParams = urlParts.searchParams;
  
    // 3. Extract the 'oobCode' parameter
    const oobCode = searchParams.get('oobCode');
  
    // 4. Return the extracted code
    return oobCode;
  }


  const handleResetPassword = async (e, code) => {
    e.preventDefault();
    setError(null);
    setMessage('');
    
    try {
      
        // Verify the password reset code
        await verifyPasswordResetCode(auth, code);

        // Reset the password
        await confirmPasswordReset(auth, code, newPassword);
  
        // Redirect to the success page
        window.location.href = '/passwordresetsuccessful';
      
    } catch (error) {
      setError(error.message);
      console.error('Password reset error:', error);
    }

  };

  useEffect(()=> {
    setCode( extractOobCodeFromUrl(currentUrl))
    console.log(code)
  }, [])
  
    return(
      <div className='form-container'>
        <div className="form">
        <img style={{width:'50px'}} src="key.svg" alt="" />
      <h2>Forgot password?</h2>
      <p> No worries, we'll send you reset instructions</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <form className='fp-form' onSubmit={handleResetPassword}>
        <div className='row-1'>
          <label htmlFor="email"><small>Email:</small></label><br />
          
          <input className='password' 
          type={visible1 ? 'text' : 'password'}
          id="password" 
          value={email}
          placeholder='Enter your email' 
          onChange={(e) => setNewPassword(e.target.value)} required />
          
          <input className='input' 
          type={visible2 ? 'text' : 'password'}
          id="password" 
          value={email}
          placeholder='Confirm new password' 
          onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
      
        
        <button type="submit" className='form-button'>Reset password</button>
        <Link to={'/'}>
        <button className='borderless-button'> <img src="" alt="" style={{width:'15px', paddingRight:'15px'}} /> Back to login</button>
        
        </Link>

        
      </form>
        </div>
    </div>
  );
    
}