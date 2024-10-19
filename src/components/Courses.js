import React, { useEffect, useState } from 'react';

export default function Courses() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const storedEnrolledCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setEnrolledCourses(storedEnrolledCourses);
  }, []);

  const handleResumeLesson = (videoLink) => {
    if (videoLink) {
      window.open(videoLink, '_blank'); 
    } else {
      alert('Video link is not available.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Enrolled Courses</h2>
      {enrolledCourses.length === 0 ? (
        <p>No enrolled courses available.</p>
      ) : (
        <ul className="space-y-2">
          {enrolledCourses.map((course, index) => (
            <li key={index} className="border border-gray-300 rounded-md p-4">
              <h3 className="font-bold">{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Difficulty:</strong> {course.difficulty}</p>
              <p><strong>Progress:</strong> {course.progress}%</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => handleResumeLesson(course.videoLink)} 
              >
                Resume Lesson
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
