import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import axios from 'axios';
import logo from '../assets/attendify_final_logo.jpg';
import attendanceImg from '../assets/attendance_in_college.jpg';
import { Link } from 'react-router-dom';
import accuracyImg from '../assets/accuracy.png';
import speedImg from '../assets/speed.png';
import securityImg from '../assets/security.png';
import phonecall from '../assets/phonecall.png';
import email from '../assets/email.png';
import img1 from '../assets/attendance-1.jpg';
import img2 from '../assets/attendance-2.jpg';
import img3 from '../assets/attendance-3.jpg';
import img4 from '../assets/attendance-4.jpg';

function LandingPage() {
  const [fruitData, setFruitData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get-students");
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);
  
  useEffect(() => {
    const fetchFruitData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/attendance/api/apples/');  
        setFruitData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFruitData();
  }, []);

  // Wrapping letters animation
  const wrapLetters = (selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.innerHTML = el.textContent.replace(/(\S)/g, "<span>$&</span>");
    });
  };

  const animateLetters = (selector) => {
    const elements = document.querySelectorAll(`${selector} span`);
    elements.forEach((span, i) => {
      setTimeout(() => {
        span.classList.add('visible-lp');
      }, i * 100);
    });
  };

  useEffect(() => {
    wrapLetters('#title1-lp h1');
    wrapLetters('#title1-lp h5');
    setTimeout(() => {
      animateLetters('#title1-lp h1');
      animateLetters('#title1-lp h5');
    }, 500);
  }, []);

  return (
    <div className="pageContainer-lp">
      <br /><br /><br /><br />
      <div id="title1-lp">
        <img src={logo} alt="Attendify Logo" id="home_page_logo-lp-1" />
        <div>
          <h1 className="A1">ATTENDIFY</h1>
          <h5 className="W1">Where every Presence is counted</h5>
        </div>
      </div>

      <nav className="navbar-lp">
        <div className="navbar-brand-lp">
          <img src={logo} alt="Attendify Logo" id="home_page_logo-lp" />
        </div>
        <div className="navbar-nav-lp">
          <Link to="/" className="nav-link-lp">Home</Link>
          <a href="#about-lp" className="nav-link-lp">About</a>
          <Link to="/faculty-login" className="nav-link-lp">Faculty Login</Link>
          <Link to="/student-login" className="nav-link-lp">Student Login</Link>
          <Link to="/admin-login" className="nav-link-lp">Admin Login</Link>
        </div>
        <a href="#contact-section" className="contact-btn-lp">Contact</a>
      </nav>
      {/* <nav>
        <ul>
          <li><Link to="/courses">View Courses</Link></li>
          <li><Link to="/add-course">Add Course</Link></li>
        </ul>
      </nav> */}

      {/* Image Gallery Section */}
      <div className="image-gallery-lp">
        <img src={img1} alt="Gallery Image 1" className="gallery-image-lp" />
        <img src={img2} alt="Gallery Image 2" className="gallery-image-lp" />
        <img src={img3} alt="Gallery Image 3" className="gallery-image-lp" />
        <img src={img4} alt="Gallery Image 4" className="gallery-image-lp" />
      </div>

      <div id="about-lp">
        <h2 className="about-lp-h2">ABOUT</h2>
      </div>

      {/* Fruit Details Section
      <div>
        <h2>Fruit Details</h2>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className="fruit-list">
            {fruitData.map((fruit) => (
              <div key={fruit.id} className="fruit-item">
                <h3>{fruit.name}</h3>
                <p>Color: {fruit.color}</p>
                <img src={fruit.photo_url} alt={fruit.name} className="fruit-image" />
                <a href={fruit.photo_url} target="_blank" rel="noopener noreferrer">
                  View Image
                </a>
              </div>
            ))}
          </div>
        )}
      </div> */}

      {/* Benefit Section */}
      <div className="benefits-section-lp">
        <div className="benefit-lp" data-animation="animate-left">
          <img src={accuracyImg} alt="Increased Accuracy" className="benefit-image-lp" />
          <div>
            <h3>Increased Accuracy</h3>
            <h5>Attendify utilizes advanced image recognition technology to ensure high accuracy in attendance tracking...</h5>
          </div>
        </div>

        <div className="benefit-lp benefit-lp-reverse" data-animation="animate-right">
          <div>
            <h3>Time Savings</h3>
            <h5>Attendify significantly reduces the time spent on attendance by automating the process...</h5>
          </div>
          <img src={speedImg} alt="Time Savings" className="benefit-image-lp" />
        </div>

        <div className="benefit-lp" data-animation="animate-left">
          <img src={securityImg} alt="Enhanced Security" className="benefit-image-lp" />
          <div>
            <h3>Enhanced Security & Scalable</h3>
            <h5>Attendify is built with strong security features to protect sensitive student data...</h5>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section" id='contact-section'>
        <h2>Contact Us</h2>
        <p>Let's Get in touch.</p>
        <div className="contact-details">
          <div className="contact-item">
            <img src={email} alt="Contact by Email" />
            <h3>Email: contact@attendify.com</h3>
            <p>For any inquiries or support, feel free to reach out to us via email.</p>
          </div>
          <div className="contact-item">
            <img src={phonecall} alt="Contact by Phone" />
            <h3>Phone: +91-123-456-7890</h3>
            <p>You can also contact us by phone during our business hours.</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>© 2024 Attendify. All Rights Reserved.</p>
        <nav>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
          <a href="#">FAQ</a>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </nav>
      </footer>
    </div>
  );
}

export default LandingPage;
