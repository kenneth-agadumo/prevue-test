import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from 'react-icons/io5';
import { FiUploadCloud } from 'react-icons/fi'; 

const amenitiesList = [
  'WiFi',
  'Air Conditioning',
  'TV',
  'Kitchen',
  'Washing Machine',
  'Parking Space',
  'Swimming Pool',
  'Gym',
  'Heating',
  'Balcony',
  'Wardrobe',
  'Pet Friendly',
  'Hardwood Floor',
  'Range Oven'
];

export const ShortletModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // State to manage current step
  const [formData, setFormData] = useState({
    userId: auth?.currentUser?.uid,
    propertyName: '',
    about: '',
    address: '',
    telephone: '',
    email: '',
    amenities: [],
    rooms: 1,
    bathrooms: 1,
    parking: 1,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'shortlets'), formData);
      console.log('Shortlet added successfully:', formData);
      onClose();
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
        <label className="block text-sm font-medium text-gray-600 text-xs mb-1">
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
     {/* Upload Images Button */}
     <div className="mt-4 mb-8">
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
        onChange={(e) => handleImageUpload(e)}
        className="hidden "
      />
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
                onClick={onClose}
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
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder=""
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3"
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
                      onClick={onClose}
                      className="px-12 py-1 bg-gray-100 border text-gray-700 rounded-3xl hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="px-12 py-1 bg-amber-500 text-white rounded-3xl hover:bg-amber-600"
                    >
                      Next
                    </button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-12 py-1 bg-gray-100 border text-gray-700 rounded-3xl hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-12 py-1 bg-amber-500 text-white rounded-3xl hover:bg-amber-600"
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

