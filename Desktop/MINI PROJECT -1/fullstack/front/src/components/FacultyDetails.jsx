import React, { useState, useEffect } from 'react';
import './FacultyDetails.css';
import { fetchData } from "../utils/api"; 


const FacultyDetails = () => {
  
  const handleRegisterClick = () => {
    // Navigate to RegisterFaculty page
    window.location.href = '/register-faculty'; // Adjust path as per your routing setup
  };
  const [data, setData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData("coordinator-veiw/"); // Adjust the API endpoint as needed
        setData(result);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }

    getData();
  }, []);

  return (
    <div className="faculty-details-container">
      <button className="register-faculty-button" onClick={handleRegisterClick}>
        Register a New Faculty
      </button>
      <h1 className="faculty-details-title">Faculty Details</h1>
      {/* Add your faculty details content here */}

      {data ? (
        <table className="Faculty-details-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Coordinator ID</th>
              <th>Email</th>
              <th>Class Section</th>
              <th>Courses</th>
            </tr>
          </thead>
          <tbody>
            {data.map((coordinator, index) => (
              <tr key={index}>
                <td>{coordinator.full_name}</td>
                <td>{coordinator.coordinator_id}</td>
                <td>{coordinator.email}</td>
                <td>{coordinator.class_section}</td>
                <td>
                  {coordinator.courses.length > 0
                    ? coordinator.courses.join(', ')
                    : 'No Courses'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FacultyDetails;
