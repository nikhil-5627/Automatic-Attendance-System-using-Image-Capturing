import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import "./OptionFaculty.css";
import uploadImage from "../assets/upload2.png";
import sheetImage from "../assets/sheet2.png";
import downloadImage from "../assets/download2.png";

export default function OptionFaculty() {
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectID, facultyID } = location.state || {}; // Correct key names

  const [selectedFile, setSelectedFile] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  const handleFileInput = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("facultyID", facultyID);
      formData.append("subjectID", subjectID);

      const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
      
        return `${day}/${month}/${year}_${hours}:${minutes}:${seconds}`;
      };
      
      const currentDate = new Date();
      const formattedDate = formatDate(currentDate);
      formData.append("timestamp", formattedDate);
      

      try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          alert(data.message);
        } else {
          const errorData = await response.json();
          alert(`Upload failed: ${errorData.error || "Unknown error"}`);
        }
      } catch (error) {
        alert("An error occurred while uploading the file.");
        console.error(error);
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleUploadClick = () => {
    document.getElementById("fileInput").click();
  };

const handleViewAttendance = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/view-attendance?course_id=${subjectID}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json(); // Parse JSON response
      setAttendanceData(data); // Set attendanceData to the structured array
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error || "Unknown error"}`);
    }
  } catch (error) {
    alert("An error occurred while fetching attendance data.");
    console.error(error);
  }
};



  
  
  
  const handleDownloadAttendance = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/download-attendance?course_id=${subjectID}`, {
        method: "GET",
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `predicted_${subjectID}.csv`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        const errorData = await response.json();
        console.error("Download failed:", errorData);
        alert(`Download failed: ${errorData.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("An error occurred while downloading the file:", error);
      alert("An error occurred while downloading the file.");
    }
  };
  
  
  return (
    <div className="container-ssf">
      <div className="box-ssf">
        <h1 className="title-ssf">Faculty ID: {facultyID || "Unknown"}</h1>
        <h2>Subject ID: {subjectID || "UNKNOWN"}</h2>

        <div className="buttonContainer-ssf">
          {/* Upload Image */}
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
              style={{ display: "none" }}
              onChange={handleFileInput}
            />
            <img src={uploadImage} alt="Upload Image" className="image-ssf" />
            <button className="button-ssf" onClick={handleUploadClick}>
              Upload Image
            </button>
          </motion.div>

          {/* View Attendance */}
          <motion.div
            className="element-ssf"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeInOut" }}
          >
            <img src={sheetImage} alt="View Attendance Sheet" className="image-ssf" />
            <button className="button-ssf" onClick={handleViewAttendance}>
              View Attendance Sheet
            </button>
          </motion.div>

          {/* Render Attendance Data */}
          {attendanceData.length > 0 && (
            <div>
              <h2>Attendance Data</h2>
              <table border="1">
                <thead>
                  <tr>
                    {Object.keys(attendanceData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Download Attendance */}
          <motion.div
            className="element-ssf"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
          >
            <img src={downloadImage} alt="Download Attendance" className="image-ssf" />
            <button className="button-ssf" onClick={handleDownloadAttendance}>
              Download Attendance
            </button>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}