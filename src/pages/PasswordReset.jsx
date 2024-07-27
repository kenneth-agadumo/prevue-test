import { useState } from 'react'
import {app} from '../firebaseConfig.jsx'
import { getAuth, sendPasswordResetEmail  } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';

import '../layout.css'


export const PasswordReset = () => {

  

  return(
    <div className='form-container'>
      <div className="form">
        <img style={{width:'50px'}} src="/key.svg" alt="" />
        <h2>Forgot password?</h2>
        <p> No worries, we'll send you reset instructions</p>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}

        <form className='fp-form' onSubmit={handleResetPassword}>
          <div className='row-1'>
            <label htmlFor="email"><small>Email:</small></label><br />
            <input className='input' type="email" id="email" 
            value={email}
            placeholder='Enter your email' 
            onChange={(e) => setEmail(e.target.value)} required />
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