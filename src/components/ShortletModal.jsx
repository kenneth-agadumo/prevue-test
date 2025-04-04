import React, { useState } from 'react';
import { db, managerAuth, storage } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from 'react-icons/io5';
import { FiUploadCloud } from 'react-icons/fi'; 
import { ImageDrop } from './ImageDrop';
import {ButtonLoading} from './Loading';

import imageCompression from 'browser-image-compression';




import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

 

const amenitiesList = [
  'WiFi',
  'Air Conditioning',
  'TV',
  'Kitchen',
  'Washing Machine',
  'Parking Space',
  'Swimming Pool',
  'Gym',
  'Balcony',
  'Wardrobe',
  'Pet Friendly',
];

export const ShortletModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // State to manage current step
  const [images, setImages] = useState([]);
  const [phone, setPhone] = useState('')

  const initialValue = {
    userId: managerAuth?.currentUser?.uid,
    propertyName: '',
    about: '',
    address: '',
    telephone: '',
    email: '',
    amenities: [],
    rooms: 1,
    bathrooms: 1,
    parking: 1,
    likes: 0, 
    attributes: [],
    virtualTourLink:'',
    socialMedia: {
      twitter: '',
      tiktok: '',
      instagram: '' ,
      facebook: ''
    },
    imageNames: [],

  }

  const [formData, setFormData] = useState(initialValue);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Handle form input changes
  const handleClose = () => {
    onClose()
    setImages([])
    setFormData(initialValue);
  };

  // Handle selecting an amenity
  const handleAmenitySelect = (amenity) => {
    if (!formData.amenities.includes(amenity)) {
      setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
    } else {
      handleRemoveAmenity(amenity); // Remove if already selected
    }
  };

  // Handle removing a selected amenity
  const handleRemoveAmenity = (amenity) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((item) => item !== amenity),
    });
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

  
  // *** Handle Form Submission ***
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData.imageNames)
      const docRef = await addDoc(collection(db, 'shortlets'), formData);
      console.log('Shortlet added successfully:', formData);
      onClose();
      const shortletId = docRef.id

      // Upload images
      for (let i = 0; i < images.length; i++) {
        const imageRef = ref(storage, `/shortlets/${shortletId}-${images[i].name}`);
        console.log(images[i])
        await uploadBytes(imageRef, images[i])
          .then(() => console.log('success'))
          .catch((error) => console.log(error));
      }

      console.log('Shortlet Added');

    } catch (error) {
      console.error('Error adding shortlet:', error);
    }
  };

  // Step Navigation Links
  const renderStepLinks = () => (
    <div className="flex mb-4">
      <button
        onClick={() => setStep(1)}
        className={`text-sm font-medium px-2 py-2 ${
          step === 1
            ? 'text-zinc-500 border-b-2 border-amber-500'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Basic Information
      </button>
      <button
        onClick={() => setStep(2)}
        className={`text-sm font-medium px-2 py-2  ${
          step === 2
            ? 'text-zinc-500 border-b-2 border-amber-500'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Amenities
      </button>
    </div>
  );

  // Render amenities with row layout
  const renderAmenities = () => (
    <div className="">
      <div className="flex flex-wrap p-4 border rounded-md gap-2">
        {amenitiesList.map((amenity) => (
          <div
            key={amenity}
            onClick={() => handleAmenitySelect(amenity)}
            className={`cursor-pointer p-1 text-xs rounded-xl font-light text-gray-700 border ${
              formData.amenities.includes(amenity)
                ? 'border-amber-500 bg-gray-100'
                : 'border-gray-300 hover:border-amber-400 hover:bg-gray-100'
            }`}
          >
            {amenity}
          </div>
        ))}
      </div>
      {/* New Inputs for Rooms, Bathrooms, and Parking */}
      <div className="flex gap-4 mt-4">
        {/* Rooms */}
        <div className="flex-1 relative">
          <label className="block text-xs font-normal text-gray-600 mb-1">
            Number of Rooms
          </label>
          <div className="relative">
            <input
              type="number"
              name="rooms"
              min="1"
              value={formData.rooms}
              onChange={handleChange}
              className="block w-full rounded-md text-xs text-gray-500 border border-gray-300 p-4 pr-6"
            />
            <IoIosArrowDown className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Bathrooms */}
        <div className="flex-1 relative">
          <label className="block text-xs font-normal text-gray-600 mb-1">
            Number of Bathrooms
          </label>
          <div className="relative">
            <input
              type="number"
              name="bathrooms"
              min="1"
              value={formData.bathrooms}
              onChange={handleChange}
              className="block w-full text-xs  rounded-md border border-gray-300 p-4 pr-6"
            />
            <IoIosArrowDown className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Parking */}
        <div className="flex-1 relative">
          <label className="block font-normal text-gray-600 text-xs mb-1">
            Parking Spaces
          </label>
          <div className="relative">
            <input
              type="number"
              name="parking"
              min="1"
              value={formData.parking}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 text-xs p-4 pr-6"
            />
            <IoIosArrowDown className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
       {/* Cost Per Night and Caution Fee */}
    <div className="flex gap-4 mt-4">
      {/* Cost Per Night */}
      <div className="flex-1">
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Cost Per Night (₦)
        </label>
        <input
          type="number"
          name="costPerNight"
          min="0"
          placeholder="0.00"
          value={formData.costPerNight || ''}
          onChange={handleChange}
          className="block w-full text-xs rounded-md border border-gray-300 p-4"
        />
      </div>

      {/* Caution Fee */}
      <div className="flex-1">
        <label className="block  font-medium text-gray-600 text-xs mb-1">
          Caution Fee (Refundable) (₦)
        </label>
        <input
          type="number"
          name="cautionFee"
          min="0"
          placeholder="0.00"
          value={formData.cautionFee || ''}
          onChange={handleChange}
          className="block w-full text-xs rounded-md border border-gray-300 p-4"
        />
      </div>
    </div>
     
     {/* Display thumbnails for selected images */}
     <div className="mt-4 flex flex-wrap gap-2">
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
          {images.map((file, index) => (
            <div key={index} className="relative">
              <img
                src={file.preview}
                alt={`preview ${index}`}
                className="w-20 h-20 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs p-1"
              >
                X
              </button>
            </div>
          ))}
        </div>
    </div>

  );

  

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white w-[90%] max-w-lg rounded-lg shadow-lg p-6">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">Add a Shortlet</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                <IoClose />
              </button>
            </div>
            <hr className="my-3 border-t border-gray-300" />

            {/* Navigation Links */}
            {renderStepLinks()}

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <>
                  {/* Property Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Property Name
                    </label>
                    <input
                      type="text"
                      name="propertyName"
                      value={formData.propertyName}
                      onChange={handleChange}
                      placeholder=""
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3"
                    />
                  </div>

                  {/* About */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">About</label>
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      placeholder=""
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder=""
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3"
                    />
                  </div>

                  {/* Telephone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telephone</label>
                   
                    <PhoneInput
                    country={"ng"}
                    value={phone}
                    onChange={(value) => setPhone(value)}
                    inputStyle={{ width: "100%" }}
                  />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3"
                    />
                  </div>
                </>
              )}

              {/* Step 2: Amenities */}
              {step === 2 && renderAmenities()}

              {/* Action Buttons */}
              <div className="flex justify-center gap-6 mt-6">
                {step === 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-12 py-1 bg-gray-100 border text-gray-700 rounded-3xl hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="px-12 py-1 bg-[#f2a20e] text-white rounded-3xl hover:bg-amber-600"
                    >
                      Next
                    </button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-12 py-1 bg-gray-100 border text-gray-700 rounded-3xl hover:bg-gray-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-12 py-1 bg-[#f2a20e] text-white rounded-3xl hover:bg-amber-600"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ShortletModal;






