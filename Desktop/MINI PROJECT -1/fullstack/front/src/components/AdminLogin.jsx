import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Adjust the path if needed
import userprofile from "../assets/user2.png";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if the email contains the substring "admin"
    if (!email.includes("admin")) {
      setError("Invalid email. Only admin emails are allowed.");
      return;
    }

    try {
      // Firebase authentication for login
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin-dashboard"); // Redirect on successful login (change to your admin dashboard route)
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setError("Incorrect email or password.");
      } else {
        setError("Incorrect email or password.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container-al">
      <div className="loginBox">
        <h1 className="title">Admin Login</h1>
        <img src={userprofile} alt="Admin Profile" className="userProfileImage" />
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