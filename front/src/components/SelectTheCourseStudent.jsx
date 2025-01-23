import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import the Link component
import gsap from 'gsap';
import './SelectTheCourseStudent.css';
import book from '../assets/course-book.png';

export default function SelectTheCourseStudent() {
  useEffect(() => {
    gsap.fromTo('.course-item-css', 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="container-css">
      <div className="box-css">
        <h1 className="title-css">Select Course</h1>
        
        <img
          src={book} 
          alt="Courses" 
          className="course-image" 
        />

        <div className="course-grid-css">
          <Link to="/option-selection-student" className="course-item-css">
            <strong>MACHINE LEARNING<br />CSL 422</strong>
          </Link>
          <Link to="/option-selection-student" className="course-item-css">
            <strong>DATA PRIVACY AND SECURITY<br />CSL 311</strong>
          </Link>
          <Link to="/option-selection-student" className="course-item-css">
            <strong>DATABASE MANAGEMENT SYSTEM<br />CSL 301</strong>
          </Link>
          <Link to="/option-selection-student" className="course-item-css">
            <strong>ARTIFICIAL INTELLIGENCE<br />CSL 421</strong>
          </Link>
          <Link to="/option-selection-student" className="course-item-css">
            <strong>COMPUTER NETWORKS<br />CSL 302</strong>
          </Link>
          <Link to="/option-selection-student" className="course-item-css">
            <strong>TOOLS AND PRACTICES FOR DATA SCIENCE - III<br />CSL 301</strong>
          </Link>
        </div>
      </div>
    </div>
  );
}
