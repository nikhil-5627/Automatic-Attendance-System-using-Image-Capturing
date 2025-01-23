import React, { useState } from "react";
import "./RegisterStudent.css";
import { useNavigate } from "react-router-dom";

const RegisterStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    studentID: "",
    year: "1st Year",
    classSection: "CSE-CORE A",
    subjects: [],
    email: "",
    password: "",
  });

  // Define subjects for each year and section
  const subjectsByYearAndSection = {
    "1st Year": {
      "CSE-DSA": [
        "MAL105 Calculus for Data Science",
        "CSL109 Introduction to Data and Analytics",
        "HUL304 Professional Ethics",
        "CSL101 Computer Programming",
        "HUL101 Communication Skills",
        "SAP101 Health, Sports & Safety",
        "HUL102 Environmental Studies",
        "MAL107 Introduction to Linear Algebra",
        "MAL106 Probability and Statistics",
        "CSL102 Data Structures",
        "CSP101 Web Programming",
        "ECL103 Applied Electronics",
        "HUL103 Introduction to Entrepreneurship",
      ],
      "CSE-CORE A": ["Mathematics-I", "Physics", "Basic Electronics", "Programming in C"],
      "CSE-CORE B": ["Mathematics-I", "Chemistry", "Engineering Drawing", "Workshop Practice"],
    },
    "2nd Year": {
      "CSE-DSA": [
        "MAL202 Advanced Probability and Statistics",
        "CSL202 Introduction to Object Oriented Programming",
        "CSL204 Discrete Maths & Graph Theory",
        "CSL210 Data Structures With Applications",
        "CSP203 Tools and Practices for Data Science - I",
        "CSL214 Data Handling and Visualization",
        "CSL205 Design and Analysis of Algorithms",
        "CSL207 Operating Systems",
        "CSL215 Sensor Data Analytics",
        "CSL216 Foundation of Computing",
        "CSL217 Topics in Data Science",
        "CSP204 Tools and Practices for Data Science - II",
      ],
      "CSE-CORE A": ["Data Structures", "OOP with Java", "Digital Logic", "Discrete Mathematics"],
      "CSE-CORE B": ["Computer Architecture", "Operating Systems", "DBMS", "Computer Networks"],
    },
    "3rd Year": {
      "CSE-DSA": [
        "CSL422 Machine Learning",
        "CSL311 Data Privacy and Security",
        "CSL301 Database Management Systems",
        "CSL421 Artificial Intelligence",
        "CSL312 Fundamentals of Computer Networks",
        "CSP301 Tools and Practices for Data Science III",
        "CSD301 Mini Project - I",
        "CSL313 Computer Vision and Deep Learning",
        "CSL444 Big Data Analytics",
        "CSL436 Data Mining and Warehousing",
        "CSL314 Design Thinking",
        "Open Course – I",
        "Mini Project - II",
      ],
      "CSE-CORE A": ["Software Engineering", "Web Technologies", "AI & ML", "Cloud Computing"],
      "CSE-AIML": ["Deep Learning", "Natural Language Processing", "Computer Vision", "Statistical Learning"],
      "CSE-HCIGT": ["Human Computer Interaction", "Game Design", "Virtual Reality", "UI/UX Design"],
    },
    "4th Year": {
      "CSE-DSA": [
        "CSD403 Project Phase - I",
        "Elective – I",
        "Elective – II",
        "Elective – III",
        "Elective - IV",
        "MooC Course / Open Course – II",
      ],
      "CSE-CORE A": ["Project Management", "Information Security", "Big Data Analytics", "IoT"],
      "CSE-CORE B": ["Distributed Systems", "Blockchain", "Quantum Computing", "Ethics in Computing"],
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newState = { ...prevState, [name]: value };
      // Reset subjects when year or section changes
      if (name === "year" || name === "classSection") {
        newState.subjects = [];
      }
      return newState;
    });
  };

  const handleSubjectSelection = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedSubjects = checked
        ? [...prevState.subjects, value]
        : prevState.subjects.filter((subject) => subject !== value);
      return { ...prevState, subjects: updatedSubjects };
    });
  };

  const handleRegister = () => {
    // Redirect to confirmation page with formData
    navigate("/register-confirm-student", { state: { formData } });
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.studentID.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.year !== "" &&
      formData.classSection !== "" &&
      formData.subjects.length > 0
    );
  };

  return (
    <div className="register-student">
      <h1 className="register-title">Register New Student</h1>
      <br />
      <br />
      <form className="register-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Student ID</label>
          <input
            type="text"
            name="studentID"
            value={formData.studentID}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        {formData.year && (
          <div className="form-group">
            <label>Class Section</label>
            <select
              name="classSection"
              value={formData.classSection}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Section</option>
              {subjectsByYearAndSection[formData.year] &&
                Object.keys(subjectsByYearAndSection[formData.year]).map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
            </select>
          </div>
        )}

        {formData.classSection && (
          <div className="form-group">
            <label>Subjects</label>
            <div className="subject-selection">
              {subjectsByYearAndSection[formData.year][formData.classSection].map((subject) => (
                <div key={subject} className="subject-checkbox">
                  <input
                    type="checkbox"
                    value={subject}
                    checked={formData.subjects.includes(subject)}
                    onChange={(e) => handleSubjectSelection(e)}
                  />
                  <label>{subject}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="button"
          className={`register-button ${isFormValid() ? "" : "disabled"}`}
          onClick={() => {
            if (isFormValid()) handleRegister();
          }}
          disabled={!isFormValid()}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterStudent;
