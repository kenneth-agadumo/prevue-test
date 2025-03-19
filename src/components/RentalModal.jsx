import React, { useState } from 'react';
import '../components.css';
import { db, managerAuth, storage } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { ImageDrop } from './ImageDrop';

export const RentalModal = ({ isOpen, onClose }) => {
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    userId: managerAuth?.currentUser?.uid,
    price: '',
    address: '',
    rooms: '',
    phoneNumber: '',
    virtualTourLink: '' // Keep this as is
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
      // Add the rental to Firestore and get the document reference
      const docRef = await addDoc(collection(db, 'rentals'), formData);
      const rentalId = docRef.id;
      console.log('Rental ID:', rentalId);

      for (let i = 0; i < images.length; i++) {
        const imageRef = ref(storage, `/rentals/${rentalId}-${images[i].name}`);

        await uploadBytes(imageRef, images[i])
          .then(() => console.log('success'))
          .catch((error) => console.log(error));
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
              <b>Add Rental</b>
              <span className="close" onClick={onClose}>
                <img src="/X.svg" alt="" />
              </span>
            </div>

            <form onSubmit={handleSubmit} className="rest-form">
              <div className="row2">
                <label htmlFor="rooms">Rooms</label>
                <input
                  type="text"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  placeholder="E.g 4 Bedroom Duplex"
                />
              </div>

              <div className="row2">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Num, Street, city"
                />
              </div>

              <div className="row2">
                <label htmlFor="price">Price (Naira)</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="E.g 1,000,000"
                />
              </div>

              <div className="row2">
                <label htmlFor="phoneNumber">Contact Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+234..."
                />
              </div>
              
              <div className="row2">
                <label htmlFor="virtualTourLink">Link</label>
                <input
                  type="text"
                  name="virtualTourLink" // Ensure this matches the state property
                  value={formData.virtualTourLink}
                  onChange={handleChange}
                  placeholder="Enter virtual tour link..."
                />
              </div>

              <div className="row2">
                <ImageDrop
                  imageNumber={3}
                  onImagesChange={handleImagesChange}
                  width={'80%'}
                  height={'100px'}
                />
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

export default RentalModal;