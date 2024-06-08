import React, { useState } from 'react';
import '../components.css'
import { db, auth } from '../firebaseConfig';
import {addDoc, setDoc, collection, doc, deleteDoc} from 'firebase/firestore'

export const RestaurantModal = ({ isOpen, onClose }) => {


  const [formData, setFormData] = useState({
    userId : auth?.currentUser?.uid,
    name: '',
    address:'', 
    contactNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
        await addDoc(collection (db, 'restaurants'), formData)
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
            <b>Add Restaurant</b>
            <span className="close" onClick={onClose}><img src="X.svg" alt="" /></span>
            </div>
          
            <form onSubmit={handleSubmit}  className='rest-form'>
              {/* Form fields */}
              <div className='row2'>
                <label htmlFor="name">Restaurant Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='E.g Food Shack'/>
              </div>

              <div className='row2'>
                <label htmlFor="address">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder='Num, Street, city' />
              </div>

              <div className='row2'>
                <label htmlFor="contactNumber">Telephone</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder='+234...' />
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

export default RestaurantModal;