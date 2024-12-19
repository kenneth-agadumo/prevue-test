import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Loading from './Loading';  // Import the Loading component
import { FiUploadCloud } from 'react-icons/fi';

export const ImageDrop = ({ imageNumber, width, height, onImagesChange }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Check if the total number of images exceeds the limit
    if (images.length + acceptedFiles.length <= imageNumber) {
      setIsLoading(true);
  
      // Process each new file to add a preview URL
      const newImages = acceptedFiles.map((file) => {
        const preview = URL.createObjectURL(file);
        return Object.assign(file, { preview }); // Attach preview URL to file object
      });
  
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        if (progress >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setUploadProgress(null);
  
          // Combine the existing images with the new ones
          const updatedImages = [...images, ...newImages];
  
          // Update local state
          setImages(updatedImages);
  
          // Notify parent component of the updated image array
          onImagesChange(updatedImages);
        } else {
          progress += 10; // Increment progress
          setUploadProgress(progress);
        }
      }, 200);
    } else {
      alert(`You can only upload a maximum of ${imageNumber} images.`);
    }
  }, [images, imageNumber, onImagesChange]);
  

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages); // Call the callback function with updated images
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*'
  });

  return (
    <div {...getRootProps()} style={dropzoneStyle}>
      <input {...getInputProps()} />
      {
        isDragActive ?
        <>
          <img src='/upload.png' alt=''/>
          <p>Drop the files here ...</p> 
        </>
        :
        <>
          
          <FiUploadCloud className="text-lg mr-2" />
        Upload Images
        </>
      }
      <div style={previewStyle}>
        {images.map((file, index) => (
          <div key={index} style={imageContainerStyle}>
            <button onClick={() => removeImage(index)} style={removeButtonStyle}>X</button>
            <img src={file.preview} alt={`preview ${index}`} style={imageStyle} />
          </div>
        ))}
      </div>
      {isLoading  && <Loading isLoading={isLoading} uploadProgress={uploadProgress} />}
    </div>
  );
};

const dropzoneStyle = {
  border: '1px solid #86708530',
  borderRadius: '8px',
  padding: '10px',
  textAlign: 'center',
  cursor: 'pointer',
  width: '70%'
};

const previewStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '20px'
};

const imageContainerStyle = {
  position: 'relative',
  width: '100px',
  height: '100px',
  margin: '10px',
  border: '1px solid #cccccc',
  borderRadius: '5px',
  overflow: 'hidden'
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const removeButtonStyle = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  cursor: 'pointer',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10
};