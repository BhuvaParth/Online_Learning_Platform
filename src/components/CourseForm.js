import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CourseForm() {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    progress: 0, 
    videoLink: '' 
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!courseData.title || !courseData.description || !courseData.category || !courseData.difficulty || !courseData.videoLink) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');

    const existingCourses = JSON.parse(localStorage.getItem('courses')) || [];
    existingCourses.push(courseData);
    localStorage.setItem('courses', JSON.stringify(existingCourses));

    setCourseData({
      title: '',
      description: '',
      category: '',
      difficulty: '',
      progress: 0, 
      videoLink: '' 
    });

    navigate('/dashboard');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add a New Course</h2>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Course Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block">Description:</label>
          <textarea
            id="description"
            name="description"
            value={courseData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="difficulty" className="block">Difficulty:</label>
          <select
            id="difficulty"
            name="difficulty"
            value={courseData.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          >
            <option value="">Select difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div>
          <label htmlFor="progress" className="block">Progress (0-100):</label>
          <input
            type="number"
            id="progress"
            name="progress"
            value={courseData.progress}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            min="0"
            max="100"
            required
          />
        </div>
        <div>
          <label htmlFor="videoLink" className="block">Video Link:</label>
          <input
            type="url" 
            id="videoLink"
            name="videoLink"
            value={courseData.videoLink}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Submit Course</button>
      </form>
    </div>
  );
}
