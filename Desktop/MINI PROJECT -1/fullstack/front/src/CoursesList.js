import React, { useEffect, useState } from 'react';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from Django API
  useEffect(() => {
    fetch('http://127.0.0.1:8000/attendance/get-courses/')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data!</p>;
  }

  return (
    <div>
      <h2>Courses List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.course_id}>
            {course.course_name} (ID: {course.course_id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesList;
