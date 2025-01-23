import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Ensure this points to your Firebase config
import "./RegisterConfirmStudent.css";

const RegisterConfirmStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData; // Access formData passed via state

  const handleRegister = async () => {
    try {
      // Create a user in Firebase Authentication with email and password
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      // Mock success and alert
      alert("Registration Successful!");

      // Redirect to the registration page after successful registration
      navigate("/register-student");
    } catch (error) {
      console.error("Error during registration: ", error);
      alert("Error: " + error.message);
    }
  };

  // Cancel function to go back to the form
  const handleCancel = () => {
    navigate("/register-student"); // Redirect back to form without registering
  };

  return (
    <div className="box-rcs">
      <h2>Confirm Registration for this Student?</h2>
      <button onClick={handleRegister}>Yes</button>
      <button onClick={handleCancel}>No</button>
    </div>
  );
};

export default RegisterConfirmStudent;
