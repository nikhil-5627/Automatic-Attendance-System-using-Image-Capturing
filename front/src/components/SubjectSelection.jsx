import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SubjectSelection.css';
import uploadImage from '../assets/upload2.png';
import sheetImage from '../assets/sheet2.png';
import downloadImage from '../assets/download2.png';

export default function SubjectSelection() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        navigate('/view-attendance', { 
          state: { 
            imageUrl: reader.result 
          } 
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="container-ssf">
      <div className="box-ssf">
        <h1 className='title-ssf'>Select an Option</h1>
        <div className="buttonContainer-ssf">
          <motion.div
            className="element-ssf"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeInOut" }}
          >
            <input 
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />
            <img src={uploadImage} alt="Upload Image" className="image-ssf" />
            <button className="button-ssf" onClick={handleUploadClick}>
              Upload Image
            </button>
          </motion.div>
          
          <motion.div
            className="element-ssf"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
          >
            <img src={sheetImage} alt="Edit Attendance Sheet" className="image-ssf" />
            <button className="button-ssf">Edit Attendance Sheet</button>
          </motion.div>
          
          <motion.div
            className="element-ssf"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
          >
            <img src={downloadImage} alt="Download Attendance" className="image-ssf" />
            <button className="button-ssf">Download Attendance</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}