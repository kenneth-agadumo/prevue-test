import { CustomProvider } from 'firebase/app-check';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const ImageDrop = () => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setImages(prevImages => [...prevImages, ...newImages]);
  }, []);

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
          <img src='uploap.png' alt=''/>
          <p>Drop the files here ...</p> 
        </>
        :
        <>
          <img src='upload.png' alt='' />
          <p style={{ fontWeight:'500'}}><span style={{color:'#158b8d', fontWeight:'500'}}>Click to upload</span> or drag and drop</p>
        </>
      }
      <div style={previewStyle}>
        {images.map((file, index) => (
          <div key={index} style={imageContainerStyle}>
            <img src={file.preview} alt={`preview ${index}`} style={imageStyle} />
          </div>
        ))}
      </div>
    </div>
  );
};

const dropzoneStyle = {
  border: '1px solid #86708530',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  width: '50%'
};

const previewStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  marginTop: '20px'
};

const imageContainerStyle = {
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
