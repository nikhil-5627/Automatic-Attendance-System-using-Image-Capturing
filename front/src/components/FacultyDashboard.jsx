import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FacultyDashboard.css";

export default function FacultyDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const coordinatorEmail = location.state?.facultyEmail || ""; // Get email from state

  const [courses, setCourses] = useState([]); // State to store course data
  const [facultyID, setFacultyID] = useState(null); // Define facultyID state
  const [errorMessage, setErrorMessage] = useState(""); // State for error handling
  const [subjectID, setsubjectID] = useState(null);

  // Function to handle redirection to OptionFaculty
  const handleCourseClick = (subjectID, facultyID) => {
    console.log("Navigating to OptionFaculty with subjectID:", subjectID, "and facultyID:", facultyID);
    navigate("/option-faculty", {
      state: { subjectID, facultyID },
    });
  };

  useEffect(() => {
    if (coordinatorEmail) {
      if (coordinatorEmail === "ayishwaryaukeyfaculty@iiitn.ac.in") {
        // Static dashboard for ayishwaryaukeyfaculty@iiitn.ac.in
        setFacultyID(2); // Set facultyID
        setsubjectID("CSL312");
        setCourses([
          { subjectID: "CSL101" },
          { subjectID: "CSL104" },
          { subjectID: "CSL312", isClickable: true },
        ]);
      } else if (coordinatorEmail === "jitendratemburnefaculty@iiitn.ac.in") {
        // Static dashboard for jitendratemburnefaculty@iiitn.ac.in
        setFacultyID(3); // Set facultyID
        setsubjectID("CSL422");
        setCourses([
          { subjectID: "CSL101" },
          { subjectID: "CSL209" },
          { subjectID: "CSL422", isClickable: true },
        ]);
      } else {
        setErrorMessage("Invalid email. No courses available.");
      }
    }
  }, [coordinatorEmail]);

  return (
    <div className="dashboard-container-fd">
      <h1 className="dashboard-heading-fd">Faculty Dashboard</h1>
      <h2 className="dashboard-subheading-fd">Welcome, {coordinatorEmail || "Unknown"}</h2>

      <div className="courses-container-fd">
        {errorMessage ? (
          <p className="error-fd">{errorMessage}</p>
        ) : (
          courses.map((course, index) => (
            <div
              key={index}
              className={`course-box-fd ${course.isClickable ? "clickable-fd" : ""}`}
              onClick={() => course.isClickable && handleCourseClick(course.subjectID, facultyID)} // Pass subjectID and facultyID
            >
              <p className="course-text-fd">
                <strong>Subject:</strong> {course.subjectID || "Unknown"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}