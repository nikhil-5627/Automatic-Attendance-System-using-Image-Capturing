import React from 'react';
import './1234year.css';
import coursebook from '../assets/course-book.png'; // Update with the correct path to your image

export default function FirstYearCourseSelection() {
  return (
    <div className="container-ycf">
      <div className="box-ycf">
        
          <h1 className='title-ycf'>Select Course and Section</h1>
        
        {/* Image between the title and buttons */}
        <div className="imageContainer-ycf">
          <img src={coursebook} alt="Course Selection" className="image-ycf" />
        </div>
        <div className="buttonContainer-ycf">
          <a href="subject-selection" className="link-ycf">
            <button className="button-ycf">
              COMPETITIVE PROGRAMMING <br /> CSE - A
            </button>
          </a>
          <a href="subject-selection" className="link-ycf">
            <button className="button-ycf">
              COMMUNICATION SKILLS <br /> CSD
            </button>
          </a>
          <a href="subject-selection" className="link-ycf">
            <button className="button-ycf">
              PROFESSIONAL ETHICS <br /> CSD
            </button>
          </a>
          <a href="subject-selection" className="link-ycf">
            <button className="button-ycf">
              CALCULUS FOR <br /> DATA SCIENCE <br /> AIML
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
