import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/api";  // Adjust the path based on your project structure
import './StudentDetails.css';

const StudentDetails = () => {
  const [data, setData] = useState(null);
  const handleRegisterClick = () => {
    // Navigate to RegisterStudent page
    window.location.href = '/register-student'; // Adjust path as per your routing setup
  };

  useEffect(() => {
    async function getData() {
      try {
        const result = await fetchData("student-veiw/"); // Adjust the API endpoint as needed
        setData(result);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    }

    getData();
  }, []);

  return (
    <div className="student-details-container">
      <h1 className="student-details-title">Student Details</h1>
      
      {data ? (
        <table className="student-details-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Student ID</th>
              <th>Year</th>
              <th>Class Section</th>
              <th>Email</th>
              <th>Photos</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={index}>
                <td>{student.full_name}</td>
                <td>{student.student_id}</td>
                <td>{student.year}</td>
                <td>{student.class_section}</td>
                <td>{student.email}</td>
                <td>{student.photos.length > 0 ? student.photos.join(', ') : 'No Photos'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
      <button className="register-student-button" onClick={handleRegisterClick}>
        Register a New Student
      </button>
      
      {/* Add your student details content here */}
    </div>
  );
};

export default StudentDetails;
