import React, { useState } from 'react';
import '../components.css';
import { db, auth, storage } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { ImageDrop } from './ImageDrop';
import { ref, uploadBytes } from 'firebase/storage';

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
  

export const RestaurantModal = ({ isOpen, onClose }) => {
  const [images, setImages] = useState();
  const [phone, setPhone] = useState('')
   
  const [formData, setFormData] = useState({
    userId: auth?.currentUser?.uid,
    name: '',
    address: '',
    contactNumber: '',
    email: '',
    likes: 0, 
    attributes: [],
    virtualTourLink:'',
    socialMedia: {
      twitter: '',
      tiktok: '',
      instagram: '' ,
      facebook: ''
    }
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

    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-row1">
              <b>Add Restaurant</b>
              <span className="close" onClick={onClose}>
                <img src="/X.svg" alt="" />
              </span>
            </div>

            <form onSubmit={handleSubmit} className="rest-form">
              {/* Form fields */}
              <div className="row2">
                <label className='text-sm' htmlFor="name">Property Name</label>
                <input
                  className='text-sm'
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="E.g Ocean Villa"
                />
              </div>

              <div className="row2">
                <label className='text-sm' htmlFor="address">Address</label>
                <input
                  type="text"
                  className='text-sm'
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Num, Street, city"
                />
              </div>

              <div className="row2">
                <label className='text-sm' htmlFor="contactNumber">Telephone</label>
                
                <PhoneInput
                country={"ng"}
                value={phone}
                onChange={(value) => setPhone(value)}
                inputStyle={{ width: "100%" }}
                />
              </div>

              <div className="row2">
                <label className='text-sm' htmlFor="name">Email</label>
                <input
                  type="text"
                  className='text-sm'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>

              <div className="row2">
                <label className='text-sm' htmlFor="virtualTourLink">Virtual Tour Link</label>
                <input
                  type="text"
                  className='text-sm'
                  name="virtualTourLink"
                  value={formData.virtualTourLink}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </div>

              <div className="row2 ">
                <label className='text-sm' htmlFor="name">Instagram Link</label>
                <input
                  type="text"
                  className='text-sm'
                  name="name"
                  value={formData.socialMedia.instagram}
                  onChange={handleChange}
                  placeholder="instagram.com/"
                />
              </div>

              <div className="row2">
                <ImageDrop imageNumber={3} onImagesChange={handleImagesChange} width={"80%"} height={"100%"} />
              </div>

              <div className="button-row">
                <button type="button" onClick={onClose} className="cancel">
                  Cancel
                </button>
                <button type="submit" className="save">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantModal;
