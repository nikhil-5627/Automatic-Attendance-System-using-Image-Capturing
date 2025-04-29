import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterFaculty.css";

const RegisterFaculty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    coordinatorId: "",
    fullName: "",
    email: "",
    password: "",
  });
  const [subjectGroups, setSubjectGroups] = useState([]);
  

  
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
        "HUL103 Introduction to Entrepreneurship"
      ],
      "CSE-CORE A": ["Mathematics-I", "Physics", "Basic Electronics", "Programming in C"],
      "CSE-CORE B": ["Mathematics-I", "Chemistry", "Engineering Drawing", "Workshop Practice"]
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
        "CSP204 Tools and Practices for Data Science - II"
      ],
      "CSE-CORE A": ["Data Structures", "OOP with Java", "Digital Logic", "Discrete Mathematics"],
      "CSE-CORE B": ["Computer Architecture", "Operating Systems", "DBMS", "Computer Networks"]
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
        "Mini Project - II"
      ],
      "CSE-CORE A": ["Software Engineering", "Web Technologies", "AI & ML", "Cloud Computing"],
      "CSE-AIML": ["Deep Learning", "Natural Language Processing", "Computer Vision", "Statistical Learning"],
      "CSE-HCIGT": ["Human Computer Interaction", "Game Design", "Virtual Reality", "UI/UX Design"]
    },
    "4th Year": {
      "CSE-DSA": [
        "CSD403 Project Phase - I",
        "Elective – I",
        "Elective – II",
        "Elective – III",
        "Elective - IV",
        "MooC Course / Open Course – II"
      ],
      "CSE-CORE A": ["Project Management", "Information Security", "Big Data Analytics", "IoT"],
      "CSE-CORE B": ["Distributed Systems", "Blockchain", "Quantum Computing", "Ethics in Computing"]
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddSubjectGroup = () => {
    setSubjectGroups([
      ...subjectGroups,
      { year: "", classSection: "", subjects: [] },
    ]);
  };

  const handleSubjectGroupChange = (index, field, value) => {
    const updatedGroups = [...subjectGroups];
    updatedGroups[index][field] = value;

    if (field === "year") {
      updatedGroups[index].classSection = "";
      updatedGroups[index].subjects = [];
    }

    setSubjectGroups(updatedGroups);
  };

  const handleSubjectSelection = (index, subject, checked) => {
    const updatedGroups = [...subjectGroups];
    const selectedSubjects = updatedGroups[index].subjects;

    if (checked) {
      selectedSubjects.push(subject);
    } else {
      updatedGroups[index].subjects = selectedSubjects.filter(
        (sub) => sub !== subject
      );
    }

    setSubjectGroups(updatedGroups);
  };

  // Validation to check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.coordinatorId.trim() !== "" &&
      formData.fullName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      subjectGroups.every(
        (group) => group.year && group.classSection && group.subjects.length > 0
      )
    );
  };

 
  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      alert("All fields are required.");
      return;
    }
  
    const payload = {
      coordinator_id: formData.coordinatorId,
      full_name: formData.fullName,
      email: formData.email,
      password: formData.password,
      subject_groups: subjectGroups, // Include the subject group data
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/register-faculty/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert(data.message || "Faculty registered successfully.");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Unable to register faculty.");
      }
    } catch (error) {
      alert("An error occurred while registering the faculty.");
      console.error(error);
    }
  };
  

  return (
    <div className="register-faculty">
      <h1 className="register-title">Register New Faculty</h1>
      <form className="register-form">
        <div className="form-group">
          <label>Coordinator ID</label>
          <input
            type="text"
            name="coordinatorId"
            value={formData.coordinatorId}
            onChange={handleInputChange}
            required
          />
        </div>
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

        {subjectGroups.map((group, index) => (
          <div key={index} className="subject-group">
            <h3>Select Subject Group {index + 1}</h3>
            <div className="form-group">
              <label>Year</label>
              <select
                value={group.year}
                onChange={(e) =>
                  handleSubjectGroupChange(index, "year", e.target.value)
                }
              >
                <option value="">Select Year</option>
                {Object.keys(subjectsByYearAndSection).map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Class Section</label>
              <select
                value={group.classSection}
                onChange={(e) =>
                  handleSubjectGroupChange(index, "classSection", e.target.value)
                }
                disabled={!group.year}
              >
                <option value="">Select Section</option>
                {group.year &&
                  Object.keys(subjectsByYearAndSection[group.year] || {}).map(
                    (section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    )
                  )}
              </select>
            </div>
            {group.year && group.classSection && (
              <div className="form-group">
                <label>Subjects</label>
                <div className="subject-selection">
                  {subjectsByYearAndSection[group.year][group.classSection].map(
                    (subject) => (
                      <div key={subject} className="subject-checkbox">
                        <input
                          type="checkbox"
                          checked={group.subjects.includes(subject)}
                          onChange={(e) =>
                            handleSubjectSelection(
                              index,
                              subject,
                              e.target.checked
                            )
                          }
                        />
                        <label>{subject}</label>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddSubjectGroup}
          className="add-subject-button"
        >
          + Add New Subject
        </button>
        <button
          type="button"
          className="register-button"
          onClick={handleSubmit}
          disabled={!isFormValid()} // Button is disabled if form is invalid
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterFaculty;