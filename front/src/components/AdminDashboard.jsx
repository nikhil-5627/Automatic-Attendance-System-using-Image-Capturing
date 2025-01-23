import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./AdminDashboard.css"; // Separate CSS file for styling
import studentImage from "../assets/student-placeholder.png"; // Replace with actual image path
import facultyImage from "../assets/faculty-placeholder.png"; // Replace with actual image path

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Select an Option</h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="dashboard-cards">
        {/* Student Details Card */}
        <div className="dashboard-card student-card">
          <h2 className="card-title">View Student Details</h2>
          <div className="card-content">
            <img
              src={studentImage}
              alt="Student Details"
              className="card-image"
            />
            {/* Use Link to navigate to RegisterStudent */}
            <Link to="/student-details">
              <button className="view-details-btn">View Student Details</button>
            </Link>
          </div>
        </div>

        {/* Faculty Details Card */}
        <div className="dashboard-card faculty-card">
          <h2 className="card-title">View Faculty Details</h2>
          <div className="card-content">
            <img
              src={facultyImage}
              alt="Faculty Details"
              className="card-image"
            />
            <Link to="/faculty-details">
              <button className="view-details-btn">View Faculty Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;