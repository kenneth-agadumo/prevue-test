import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {collection, getDocs, doc, onSnapshot,deleteDoc, updateDoc } from 'firebase/firestore'
import { updateEmail, updatePassword, sendPasswordResetEmail } from "firebase/auth";
import RestaurantModal from './RestaurantModal.jsx';
import RentalModal from './RentalModal.jsx';
import { SegmentedControl, Table } from '@radix-ui/themes';
import {ImageDrop} from './ImageDrop.jsx'
import '../dashboard.css'
import { set } from "firebase/database";

export const SettingsTab  = (props) => {

  const [selectedTab, handleTabChange] = useState('my-profile')
 

  return (
    <>
      <div className="section-header">
        <h2>Settings</h2>
      </div>

      <div >
        <div className="tab-bar">

          <div className={`properties-tab-item ${selectedTab === 'my-profile' ? 'active' : ''}`} value="" onClick={() => handleTabChange('my-profile')} >
            <span> My Profile </span>
          </div>

          <div   className={`properties-tab-item ${selectedTab === 'password' ? 'active' : ''}`}value="" onClick={() => handleTabChange('password')} >
            <span> Password </span>
          </div>

        </div>
        <hr style={{background: '#eaecf0', height:'1px', border:'none' , transform:'translateY(-6px)'}} />
      </div>                                         
            
      {selectedTab === 'my-profile' && <MyProfile userData={props.userData} documentID={props.documentID}/> }
      {selectedTab === 'password' &&  <Password/> }                                         
    </>

    
    
  )
}

export const MyProfile = (props) => {
  const [firstName, setFirstName] = useState(props.userData?.fullName?.split(' ')[0])
  const [lastName, setLastName] = useState(props.userData?.fullName?.split(' ')[1])
  const [email, setEmail] = useState(props.userData?.email)
  const [phoneNumber, setPhoneNumber] = useState(props.userData?.phoneNumber)
  const [emailChanged, setEmailChanged] = useState(false)


  console.log(
    `first name: ${firstName}, last name: ${lastName}, email: ${email}, phone number: ${phoneNumber}`
  )

  const [inputValue, setInputValue] = useState('Initial Value');

  console.log(auth.currentUser?.email)

   // Function to handle input change events
   const handleInputChange = (e) => {
    switch (e.target.id) {
      case 'first-name' :
        setFirstName(e.target.value)
        break
      case 'last-name' :
        setLastName(e.target.value)
        break
      case 'email' :
        setEmail(e.target.value)
        break
      case 'phone-number' :
        setPhoneNumber(e.target.value)
        break
    }

  };

 
  const updateInfo = async () => {
    const docRef = doc(db, 'users', props.documentID)
    const user = auth.currentUser


    try {
      await updateDoc(docRef, {
        fullName: firstName + ' ' + lastName,
        email: email,
        phoneNumber: phoneNumber
      });
      if (emailChanged){
        // Update email (requires verification)
        updateEmail(user, email)
        .then(() => {
          console.log("Email changed successfully")
        })
      }

      console.log('Your profile was updated successfully!');
      alert('Your profile was updated successfully!')
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  
  }

  
  return(
    <>
    <div className="personal-info">

      <div className="info-header">
        <div>
          <h3>Personal information</h3>
          <p>Update your photo and other personal details here</p>
        </div>
        <hr style={{background: '#eaecf0', height:'1px', border:'none'}} />
      </div>
      <div className="full-name">
        <div className="flex-row">  
          <label htmlFor="">Name</label>
          <div style={{display: 'flex', gap:'24px'}}>
            <input type="text"id="first-name" value={firstName} onChange={(e) => handleInputChange(e)}  className="profile-input"/>
            <input type="text" id="last-name" value={lastName} onChange={(e) => handleInputChange(e)} className="profile-input"/>
            <span style={{cursor:'pointer'}}>edit</span>
          </div>
        </div>
        <hr style={{background: '#eaecf0', height:'1px', border:'none' }} />

      </div>
      <div className="email">
        <div className="flex-row">  
          <label htmlFor="">Email</label>
          <input type="email"id="email"  value={email} 
          onChange={(e) => {
            setEmailChanged(true)
            handleInputChange(e)
          }} 
          className="profile-input"/>
          <span style={{cursor:'pointer'}}>edit</span>

        </div>

        <hr style={{background: '#eaecf0', height:'1px', border:'none' }} />
      </div>
      <div className="phone-number">
        <div className="flex-row">
          <label htmlFor="">Phone </label>
          <input type="text"id="phone-number" value={phoneNumber} onChange={(e) => handleInputChange(e)} className="profile-input"/>
          <span style={{cursor:'pointer'}}>edit</span>
    
        </div>
        <hr style={{background: '#eaecf0', height:'1px', border:'none' }} />

      </div>

      <div className="user-photo">
        <h4>Your Photo</h4>
        <p>This will be displayed on your profile</p>
        <div className="upload-photo">
        <img src="Avatar.svg" alt=""  style={{width:'70px'}}/>
          <ImageDrop/>
        </div>
        <hr style={{background: '#eaecf0', height:'1px', border:'none' }} />
      </div>

      <div className="update-button-bar">
        <button className="cancel" style={{width: 'fit-content'}} >Cancel</button>
        <button onClick={updateInfo} className="save" style={{width: 'fit-content'}}>Save</button>
      </div>
      
    </div>
      
    </>
  )
 
}

export const Password = (props) => {

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const user = firebase.auth().currentUser;

      // Reauthenticate the user with their current password
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await user.reauthenticateWithCredential(credential);

      // Update email (if provided)
      if (newEmail) {
        await user.updateEmail(newEmail);
        // Send email verification if needed
        await user.sendEmailVerification();
      }

      // Update password (if provided)
      if (newPassword) {
        await user.updatePassword(newPassword);
      }

      // Success!
      console.log('Email and/or password updated successfully!');
      // You might want to display a success message to the user here
    } catch (error) {
      setError(error.message);
      console.error('Error updating email/password:', error);
    }
  };

  return(
    <>
      <div className="password">

<div className="password-header">
  <div>
    <h3>Password</h3>
    <p>Reset your password</p>
  </div>
  <hr style={{background: '#eaecf0', height:'1px', border:'none'}} />
</div>

<div className="password-reset">
  <h4 style={{marginBottom: '24px'}}>Change password</h4>
  <div className="flex-row" style={{marginBottom: '20px'}}>
    <div className="column-1">
      <label htmlFor="current-password"> Current Password</label>
      <input type="password"  id="current-password" placeholder="Your current password" className="profile-input"/>
    </div>
    <div className="column-2">
    <label htmlFor="new-password"> New Password</label>
    <input type="password"  id="new-password" placeholder="Your new password" className="profile-input"/>
    </div>
  </div>
    <div className="row">
      <label htmlFor="confirm-password"> Confirm Password</label>
      <input type="password"  id="confirm-password" placeholder="confirm yourpassword" className="profile-input"/>
    </div>
 
  <hr style={{background: '#eaecf0', height:'1px', border:'none' }} />

</div>

<div className="update-button-bar" style={{marginTop:' 16px'}}>
  <button className="cancel" style={{width: 'fit-content'}} >Cancel</button>
  <button onClick={{}} className="save" style={{width: 'fit-content'}}>Save</button>
</div>

</div>
    </>
  )
}
