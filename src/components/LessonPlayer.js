import React from 'react';

export default function LessonPlayer({ lesson, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md w-11/12 max-w-2xl">
        <button onClick={onClose} className="text-red-500 font-bold mb-4">Close</button>
        
        <h3 className="text-lg font-bold mb-2">{lesson.title}</h3>
        
        {lesson.type === 'video' ? (
          <video controls className="w-full h-auto">
            <source src={lesson.content} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="whitespace-pre-wrap">{lesson.content}</div>
        )}
      </div>
    </div>
  );
}
