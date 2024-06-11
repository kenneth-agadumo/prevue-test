import React, { useEffect, useState, createContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Login } from './pages/Login'
import {Register} from './pages/Register'
import {Dashboard} from './pages/Dashboard'
import {ForgotPassword} from './pages/ForgotPassword'
import { SetPassword } from './pages/SetPassword';
import { PasswordReset } from './pages/PasswordReset';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Activities } from './pages/Activities';
import { Restaurants } from './pages/Restaurants';
import { Rentals } from './pages/Rentals';
import { EmailVerification } from './pages/EmailVerification';
import './App.css'

export const UserContext = createContext()

 const App = () => {
  

  return (
    <div className='root' id='root'> 
      <Router>
        <div>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/rentals' element={<Rentals/>} />
            <Route path='/restaurants' element={<Restaurants/>} />
            <Route path='/activities' element={<Activities/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>} />
            <Route path='/set-password' element={<SetPassword/>} />
            <Route path='/reset-successful' element={<PasswordReset/>} />
            <Route path='/verify-email' element={<EmailVerification/>} />
          </Routes>
        </div>
       
      </Router>
    </div>
  );
};

export default App;

