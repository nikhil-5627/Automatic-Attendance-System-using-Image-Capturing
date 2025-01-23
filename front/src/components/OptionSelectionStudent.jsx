import React from 'react';
import { motion } from 'framer-motion';
import './OptionSelectionStudent.css';
import sheetImage from '../assets/sheet2.png';
import downloadImage from '../assets/download2.png';

export default function SubjectSelection() {
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
            <button className="button-oss">View Attendance</button>
          </motion.div>
          <motion.div
            className="element-oss"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
          >
            <img src={downloadImage} alt="Download Attendance" className="image-oss" />
            <button className="button-oss">Download Attendance</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
