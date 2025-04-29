import React from 'react';
import './1234year.css';
import coursebook from '../assets/course-book.png';

export default function ThirdYearCourseSelection() {
  return (
    <div className="container-ycf">
      <div className="box-ycf">

          <h1 className='title-ycf'>Select Course and Section</h1>
        

        {/* Image between title and buttons */}
        <div className="imageContainer-ycf">
          <img src={coursebook} alt="Course Book" className="image-ycf" />
        </div>

        {/* Button container with courses */}
        <div className="buttonContainer-ycf">
          <a href="subject-selection" className="link-ycf">
            <button className="button-ycf">MACHINE LEARNING</button>
          </a>
          <a href="subject-selection" className="link-ycf">
            <button className="button-ycf">ARTIFICIAL INTELLIGENCE</button>
          </a>
          <a href="subject-selection" className="link-ycf">
            <button className="button-ycf">DATA PRIVACY AND SECURITY</button>
          </a>
          <a href="subject-selection" className="link-ycf">
            <button className="button-ycf">TOOLS AND PRACTICES<br />FOR DATA SCIENCE</button>
          </a>
        </div>
      </div>
    </div>
  );
}
