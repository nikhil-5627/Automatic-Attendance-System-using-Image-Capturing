import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const studentEmail = location.state?.studentEmail || ''; // Get student email from route state
  const [subjects, setSubjects] = useState([]); // State to hold subjects data
  const [errorMessage, setErrorMessage] = useState(""); // State to handle errors

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/student-subjects?email=${studentEmail}`);
        if (!response.ok) {
          throw new Error("Failed to fetch subjects. Please check the email or backend API.");
        }
        const data = await response.json();
        setSubjects(data); // Set the fetched subjects data
      } catch (error) {
        console.error("Error fetching subjects:", error);
        setErrorMessage("Unable to fetch subjects. Please try again later.");
      }
    };
    
    if (studentEmail) {
      fetchSubjects();
    }
  }, [studentEmail]);

  const handleSubjectClick = (subject) => {
    console.log("Subject sent to OptionStudent:", subject); // Debug log
    navigate("/option-student", { state: { subject, studentEmail } });
  };
  

  return (
    <div className="dashboard-container-sd">
      <h1 className="heading-sd">Student Dashboard</h1>
      <h2 className="welcome-sd">Welcome, {studentEmail}</h2>

      <div className="subjects-container-sd">
        {errorMessage ? (
          <p className="error-sd">{errorMessage}</p>
        ) : subjects.length > 0 ? (
          subjects.map((subject) => (
            <div
              key={subject.id}
              className="subject-box-sd"
              onClick={() => handleSubjectClick(subject)} // Call handleSubjectClick on click
            >
              <p><strong>Subject:</strong> {subject.id}</p>
              <p><strong>Year:</strong> {subject.year}</p>
              <p><strong>Section:</strong> {subject.section}</p>
              <p><strong>Course Coordinators:</strong></p>
              <ul>
                {subject.coordinators.map((coordinator, index) => (
                  <li key={index}>
                    {coordinator.name} ({coordinator.section})
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="no-subjects-sd">No subjects available for this student.</p>
        )}
      </div>
    </div>
  );
}
