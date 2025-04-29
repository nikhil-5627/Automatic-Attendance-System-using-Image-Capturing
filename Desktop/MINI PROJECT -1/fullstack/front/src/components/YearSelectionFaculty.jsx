import React from 'react';
import { Link } from 'react-router-dom';
import gdimage from '../assets/graduate3.png';
import './YearSelectionFaculty.css';

export default function YearSelectFaculty() {
  return (
    <div className="container-ysf">
      <div className="box-ysf">
        
          <h1 className='title-ysf'>Select Year</h1>
        
        <div className="imageContainer-ysf">
          <img src={gdimage} alt="Graduation Logo" className="image-ysf" />
        </div><br /><br /><br /><br />
        <div className="buttonContainer-ysf">
          <Link to="/1st-year-course-selection">
            <button className="btn-ysf">1ST YEAR</button>
          </Link>
          <Link to="/2nd-year-course-selection">
            <button className="btn-ysf">2ND YEAR</button>
          </Link>
          <Link to="/3rd-year-course-selection">
            <button className="btn-ysf">3RD YEAR</button>
          </Link>
          <Link to="/4th-year-course-selection">
            <button className="btn-ysf">4TH YEAR</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
