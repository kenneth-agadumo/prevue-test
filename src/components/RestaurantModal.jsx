import React, { useState } from 'react';
import '../components.css'
import { db, auth, storage } from '../firebaseConfig';
import {addDoc, setDoc, collection, doc, deleteDoc} from 'firebase/firestore'
import { ImageDrop } from './ImageDrop';
import {  ref, uploadBytes, getDownloadURL} from 'firebase/storage'

export const RestaurantModal = ({ isOpen, onClose }) => {
  const [images, setImages] = useState()

  const [formData, setFormData] = useState({
    userId : auth?.currentUser?.uid,
    name: '',
    address:'', 
    contactNumber: '',
    // id: `res${}`
  });

  const handleChange = (e) => {
   
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImagesChange = (updatedImages) => {
    setImages(updatedImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
        // Add the restaurant to Firestore and get the document reference
      const docRef = await addDoc(collection(db, 'restaurants'), formData);
      const restaurantId = docRef.id;
      console.log("Restaurant ID:", restaurantId);

      // Upload images
      for (let i = 0; i < images.length; i++) {
        const imageRef = ref(storage, `/restaurants/${restaurantId + '-' + images[i].name}`);
        await uploadBytes(imageRef, images[i])
          .then(() => console.log('Image uploaded successfully'))
          .catch((error) => console.error('Error uploading image:', error));
      }

        onClose(); // Close the modal after form submission
        e.target.value =''
    }catch(error){
        console.log(error)
    }      
    
  };


  console.log(images)


  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-row1">
            <b>Add Restaurant</b>
            <span className="close" onClick={onClose}><img src="/X.svg" alt="" /></span>
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
              <ImageDrop imageNumber={3} onImagesChange={handleImagesChange} width={'80%'} height={'100px'} />
              
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