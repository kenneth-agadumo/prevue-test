import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig.jsx';
import { sendEmailVerification } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import '../layout.css';

export const EmailVerification = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(20);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check email verification status periodically
    const interval = setInterval(async () => {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        clearInterval(interval);
        navigate('/dashboard');
      }
    }, 1000); // Check every second

    // Set up the timer for enabling the resend button
    if (timer > 0) {
      const timerInterval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    } else {
      setIsButtonDisabled(false);
    }

    // Clear intervals on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [timer, navigate]);

  const handleResendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      setTimer(30);
      setIsButtonDisabled(true);
    } catch (error) {
      console.error("Error resending verification email:", error);
    }
  };

  return (
    <div className='form-container'>
      <div className="form">
        <img style={{width:'50px'}} src="/message.png" alt="" />
        <h2>Check your email</h2>
        <p>We sent you a verification link to</p>
        <p>{auth.currentUser.email}</p>
        <p>If you didn't receive an email, 
          <span 
            style={{color: 'var(--primary-color)', cursor: isButtonDisabled ? 'not-allowed' : 'pointer'}} 
            onClick={!isButtonDisabled ? handleResendVerification : null}
          >
            click to resend
          </span>
        </p>
        <small>Resend button will be enabled in {timer} seconds.</small>
        <button 
          type="button" 
          className={`form-button ${isButtonDisabled && 'disabled'}`} 
          onClick={handleResendVerification} 
          disabled={isButtonDisabled}
        >
          Resend Verification
        </button>
        
        <Link to={'/login'}>
          <button className='borderless-button'>Back to login</button>  
        </Link>
      </div>
    </div>
  );
};