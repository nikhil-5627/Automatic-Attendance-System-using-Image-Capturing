import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './UploadAttendance.css';

export default function UploadAttendance() {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = location.state?.imageUrl;

  const handleConfirmUpload = () => {
    // Here you can add logic to handle the image upload
    alert('Image uploaded successfully!');
    navigate('/option-faculty');
  };

  return (
    <div className="view-attendance-container">
      <div className="view-attendance-box">
        <h1 className="view-attendance-title">Confirm Upload</h1>
        
        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Uploaded" className="uploaded-image" />
          </div>
        )}

        <div className="button-container">
          <button 
            className="confirm-button"
            onClick={handleConfirmUpload}
          >
            Confirm Upload
          </button>
          <button 
            className="cancel-button"
            onClick={() => navigate('/subject-selection')}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
