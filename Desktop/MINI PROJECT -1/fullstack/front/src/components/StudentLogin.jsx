import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Adjust the path if needed
import userprofile from "../assets/user2.png";
import "./StudentLogin.css";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Regular expression to match the email format: bt*xxx**
  const emailPattern = /^bt\d{2}[a-zA-Z]{3}\d{3}@.*$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Check if the email matches the required pattern
    if (!emailPattern.test(email)) {
      setError("Invalid email id. Only Students can Login");
      return;
    }

    try {
      // Firebase authentication for login
      await signInWithEmailAndPassword(auth, email, password);

      // Pass email as state to StudentDashboard
      navigate("/student-dashboard", { state: { studentEmail: email } });
    } catch (error) {
      // Handle Firebase authentication errors
      setError("Invalid credentials. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container-sl">
      <div className="loginBox">
        <h1 className="title">Student Login</h1>
        <img src={userprofile} alt="User Profile" className="userProfileImage" />
        <br />
        <br />
        <form onSubmit={handleLogin} className="loginForm">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}