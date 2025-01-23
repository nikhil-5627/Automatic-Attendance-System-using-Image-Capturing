import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import CoursesList from './components/CoursesList';
// import AddCourseForm from './components/AddCourseForm';


import FacultyLogin from './components/FacultyLogin';
import StudentLogin from './components/StudentLogin';
import FirstYearCourseSelection from './components/FirstYearCourseSelection';
import SecondYearCourseSelection from './components/SecondYearCourseSelection';
import ThirdYearCourseSelection from './components/ThirdYearCourseSelection';
import FourthYearCourseSelection from './components/FourthYearCourseSelection';
import OptionSelectionStudent from './components/OptionStudent';
import YearSelectionFaculty from './components/YearSelectionFaculty';
import SelectTheCourseStudent from './components/SelectTheCourseStudent';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import RegisterStudent from './components/RegisterStudent';
import RegisterFaculty from './components/RegisterFaculty';
import StudentDetails from './components/StudentDetails';
import FacultyDetails from './components/FacultyDetails';
import UploadAttendance from './components/UploadAttendance';
import RegisterConfirmStudent from './components/RegisterConfirmStudent';
import RegisterConfirmFaculty from './components/RegisterConfirmFaculty';
import FacultyDashboard from './components/FacultyDashboard';
import StudentDashboard from './components/StudentDashboard';
import OptionFaculty from './components/OptionFaculty';
import OptionStudent from './components/OptionStudent';


class App extends React.Component {
  state = {
    details: [], // State to store data fetched from API
  };

  componentDidMount() {
    axios
      .get('YOUR_API_URL') // Replace with your API URL
      .then((response) => {
        this.setState({ details: response.data });
      })
      .catch((error) => {
        console.error('There was an error fetching the data:', error);
      });
  }

  render() {
    const { details } = this.state;

    return (
      <Router>
        <div>
          {/* Home Page (LandingPage) */}
          <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/faculty-login" element={<FacultyLogin />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/1st-year-course-selection" element={<FirstYearCourseSelection />} />
          <Route path="/2nd-year-course-selection" element={<SecondYearCourseSelection />} />
          <Route path="/3rd-year-course-selection" element={<ThirdYearCourseSelection />} />
          <Route path="/4th-year-course-selection" element={<FourthYearCourseSelection />} />
          <Route path="/option-selection-student" element={<OptionSelectionStudent />} />
          <Route path="/option-faculty" element={<OptionFaculty />} />
          <Route path="/option-student" element={<OptionStudent />} />
          <Route path="/year-selection-faculty" element={<YearSelectionFaculty />} />
          <Route path="/selec-the-course-student" element={<SelectTheCourseStudent />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/register-student" element={<RegisterStudent />} />
          <Route path="/register-faculty" element={<RegisterFaculty />} />
          <Route path="/student-details" element={<StudentDetails />} />
          <Route path="/faculty-details" element={<FacultyDetails />} />
          <Route path="/upload-attendance" element={<UploadAttendance />} />
          <Route path="/register-confirm-student" element={<RegisterConfirmStudent />} />
          <Route path="/register-confirm-faculty" element={<RegisterConfirmFaculty />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard/>} />
          <Route path="/student-dashboard" element={<StudentDashboard/>} />
        </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
