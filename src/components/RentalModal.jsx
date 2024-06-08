import React, { useEffect, useState } from 'react';
import '../components.css'
import { db, auth } from '../firebaseConfig';
import {addDoc, setDoc, collection, doc, deleteDoc} from 'firebase/firestore'

export const RentalModal = ({ isOpen, onClose }) => {



  const [userId, setUserId] = useState('')
  const [price, setPrice] = useState('')
  const [address, setAddress] = useState('')
  const [rooms, setRooms] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')



  useEffect(() => {
    if (auth?.currentUser) {
      setUserId(auth.currentUser.uid);
    }
  }, []); 


  const handleSubmit = async (e) => {
   
    e.preventDefault();
    
    try{
        await addDoc(collection (db, 'rentals'), {
          userId: userId,
          price: price,
          address: address,
          rooms: rooms,
          phoneNumber: phoneNumber,
        })
        console.log("data sumitted")

        onClose(); // Close the modal after form submission
        e.target.value =''
    }catch(error){
        console.log(error)
    }      
    
  };




  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-row1">
            <b>Add Rental</b>
            <span className="close" onClick={onClose}><img src="X.svg" alt="" /></span>
            </div>
          
            <form onSubmit={handleSubmit}  className='rest-form'>
              {/* Form fields */}
              <div className='row2'>
                <label htmlFor="name">Description</label>
                <input type="text" name="rooms" value={rooms} onChange={(e) => setRooms(e.target.value)} placeholder='E.g 4 Bedroom Duplex'/>
              </div>

              <div className='row2'>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Num, Street, city' />
              </div>

              <div className='row2'>
                <label htmlFor="name">Price (Naira)</label>
                <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='E.g 1,000,000'/>
              </div>


              <div className='row2'>
                <label htmlFor="contactNumber">Contact Number</label>
                <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) =>  setPhoneNumber(e.target.value)} placeholder='+234...' />
              </div>

              <div className='row2' >
              <input type="file" name="Image" className='image-upload' />
              </div>
               
            
              <div className="button-row">
              <button type="button"  onClick={onClose} className='cancel' >Cancel</button>
              <button type="submit" className='save' > Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RentalModal;