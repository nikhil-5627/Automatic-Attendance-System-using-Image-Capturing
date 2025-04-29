import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import './OptionStudent.css';
import sheetImage from '../assets/sheet2.png';
import downloadImage from '../assets/download2.png';

export default function OptionStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { year, section, subject, studentEmail } = location.state || {}; // Retrieve Year, Section, Subject, Student Email from state

  const handleViewAttendance = () => {
    // Navigate to View Attendance with year, section, subject, and studentEmail
    navigate('/view-attendance', { 
      state: { 
        year, 
        section, 
        subject, 
        studentEmail 
      } 
    });
  };

  const handleDownloadAttendance = () => {
    // Navigate to Download Attendance with year, section, subject, and studentEmail
    navigate('/download-attendance', { 
      state: { 
        year, 
        section, 
        subject, 
        studentEmail 
      } 
    });
  };

  return (
    <div className="container-oss">
      <div className="box-oss">
        <h1 className='title-oss'>Select an Option</h1>
        <div className="buttonContainer-oss">
          <motion.div
            className="element-oss"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
          >
            <img src={sheetImage} alt="View Attendance" className="image-oss" />
            <button className="button-oss" onClick={handleViewAttendance}>View Attendance</button>
          </motion.div>
          <motion.div
            className="element-oss"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
          >
            <img src={downloadImage} alt="Download Attendance" className="image-oss" />
            <button className="button-oss" onClick={handleDownloadAttendance}>Download Attendance</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
