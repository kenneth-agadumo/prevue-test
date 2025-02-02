import React, { useState } from 'react';
import '../components.css';
import { db, auth, storage } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { ImageDrop } from './ImageDrop';
import { ref, uploadBytes } from 'firebase/storage';

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FiUploadCloud } from 'react-icons/fi';
import imageCompression from 'browser-image-compression';

  

export const RestaurantModal = ({ isOpen, onClose }) => {
  const [images, setImages] = useState([]);
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
  console.log(auth.currentUser.uid)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // *** Handle Image Upload and Compression ***
  const handleImageChange = async (e) => {
    const newFiles = Array.from(e.target.files);

    // Limit to 3 images total
    if (images.length + newFiles.length > 3) {
      alert("You can only upload up to 3 images.");
      return;
    } else if (newFiles.length < 1) {
      alert("You must upload at least one image for each property");
      return;
    }
    
    // Compression options
    const options = {
      maxSizeMB: 1, // Maximum file size in MB
      maxWidthOrHeight: 800, // Max width or height in pixels
      useWebWorker: true, // Enable web worker for better performance
    };
    
    try {
      const compressedFiles = await Promise.all(
        newFiles.map(async (file) => {
          const compFile = await imageCompression(file, options);
          // Create a preview URL for the compressed file
          const preview = URL.createObjectURL(compFile);
          return Object.assign(compFile, { preview });
        })
      );
      // Update images state by appending the new compressed files
      const updatedImages = [...images, ...compressedFiles];
      setImages(updatedImages);
      // Update formData.imageNames with the names of all compressed images
      setFormData((prev) => ({
        ...prev,
        imageNames: updatedImages.map((img) => img.name),
      }));
    } catch (error) {
      console.error("Image compression error:", error);
    }
  };

  // Remove an image from state
  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setFormData((prev) => ({
      ...prev,
      imageNames: updatedImages.map((img) => img.name),
    }));
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
        <div className=" fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className=" relative bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-6">
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
                  className='text-sm mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-4'
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
                  type="text "
                  className='text-sm mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-4'
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
                  className='text-sm mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-4'
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
                  className='text-sm mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-4'
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
                  className='text-sm mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-4'
                  name="name"
                  value={formData.socialMedia.instagram}
                  onChange={handleChange}
                  placeholder="instagram.com/"
                />
              </div>

              <div className="flex flex-col gap-2 ">
                 {/* Upload Images Button */}
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Upload Images
                </label>
                <label
                  htmlFor="fileInput"
                  className="flex items-center justify-center w-full text-xs px-4 py-3 text-gray-700 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-amber-500"
                >
                  <FiUploadCloud className="text-lg mr-2" />
                  Upload Images
                </label>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="flex flex-row gap-2">
                  {images.map((file, index) => (
                    <div key={index} className="relative inline-block">
                      <img
                        src={file.preview}
                        alt={`preview ${index}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs p-1"
                      >
                        X
                      </button>
                    </div>
                  
                  ))}
                </div>
                 
              </div>

              <div className="button-row mx-auto">
                <button type="button" onClick={onClose}
                 className="px-12 py-1 bg-gray-100 border text-gray-700 rounded-3xl hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button type="submit" 
                   className="px-12 py-1 bg-[#f2a20e] text-white rounded-3xl hover:bg-amber-600"

                >
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
