import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "./RegisterConfirmFaculty.css";

const RegisterConfirmFaculty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state;

  const handleRegister = async () => {
    try {
        // Create a user in Firebase Authentication with email and password
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
  
        // Mock success and alert
        alert("Registration Successful!");
  
        // Redirect to the registration page after successful registration
        navigate("/register-faculty");
      } catch (error) {
        console.error("Error during registration: ", error);
        alert("Error: " + error.message);
      }
  };

  const handleCancel = () => {
    // Redirect to registration page without any action
    navigate("/register-faculty");
  };

  return (
    <div className="confirm-register">
      <h2>Confirm Faculty Registration</h2>
      <p>Are you sure you want to register this faculty member?</p>
      <div className="confirmation-buttons">
        <button className="confirm-button" onClick={handleRegister}>
          Yes
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          No
        </button>
      </div>
    </div>
  );
};

export default RegisterConfirmFaculty;
