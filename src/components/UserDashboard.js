import React, { useEffect, useState } from 'react';

export default function UserDashboard() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    const storedEnrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    setCourses(storedCourses);
    setEnrolledCourses(storedEnrolledCourses);
  }, []);

  const handleDelete = (index) => {
    const courseToDelete = courses[index];
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
    localStorage.setItem('courses', JSON.stringify(updatedCourses));

    const updatedEnrolledCourses = enrolledCourses.filter(
      (enrolledCourse) => enrolledCourse.title !== courseToDelete.title
    );
    setEnrolledCourses(updatedEnrolledCourses);
    localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolledCourses)); 

    alert('Course deleted successfully');
  };

  const handleEnroll = (course) => {
    const alreadyEnrolled = enrolledCourses.some(
      (enrolledCourse) => enrolledCourse.title === course.title
    );

    if (!alreadyEnrolled) {
      const updatedEnrolledCourses = [...enrolledCourses, course];
      setEnrolledCourses(updatedEnrolledCourses);
      localStorage.setItem('enrolledCourses', JSON.stringify(updatedEnrolledCourses)); 
      alert(`${course.title} has been successfully enrolled.`);
    } else {
      alert(`You are already enrolled in ${course.title}.`);
    }
  };

  const filteredCourses = courses.filter(course => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.difficulty.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Dashboard</h2>

      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-900 p-2 mb-4 rounded placeholder-black"
      />

      {filteredCourses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <ul className="space-y-2">
          {filteredCourses.map((course, index) => (
            <li key={index} className="border border-gray-300 rounded-md p-4">
              <h3 className="font-bold">{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Difficulty:</strong> {course.difficulty}</p>

              <div className="mt-4">
                <label className="block text-sm font-medium">Progress:</label>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <p className="text-sm mt-1">{course.progress}% completed</p>
              </div>

              <button
                className="mt-2 bg-green-500 text-white p-2 rounded"
                onClick={() => handleEnroll(course)}
              >
                Enroll
              </button>

              <button
                className="mt-2 ml-2 bg-red-500 text-white p-2 rounded"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
