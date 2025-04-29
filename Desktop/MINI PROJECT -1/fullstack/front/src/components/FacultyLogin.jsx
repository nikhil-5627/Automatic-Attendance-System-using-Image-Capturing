import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'; // Import Firebase auth instance
import userprofile from '../assets/user2.png';
import './FacultyLogin.css';

export default function FacultyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Default form submission prevent
    setErrorMessage('');

    // Email validation
    if (!email.includes("faculty")) {
      setErrorMessage("Invalid email. Only faculty members can log in.");
      return;
    }

    try {
      // Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Pass email as state to FacultyDashboard
      navigate('/faculty-dashboard', { state: { facultyEmail: email } });
    } catch (error) {
      setErrorMessage(
        error.code === 'auth/user-not-found'
          ? 'User not found. Please check your credentials.'
          : 'Invalid credentials. Please check your credentials.'
      );
      console.error('Login error:', error);
    }
  };

  return (
    <div className="container">
      <div className="loginBox">
        <h1 className="title">Faculty Login</h1>
        <img src={userprofile} alt="User Profile" className="userProfileImage" />
        <br />
        <br />
        <form className="loginForm" onSubmit={handleLogin}>
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
          <button type="submit" className="btn">Login</button>
        </form>
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      </div>
    </div>
  );
}