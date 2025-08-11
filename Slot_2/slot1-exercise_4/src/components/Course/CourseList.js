import React from 'react';
import { courses } from '../../data/Courses.js';
import './CourseList.css';

const CourseList = () => {
  return (
    <div className="course-list-container">
      <h2 className="course-list-title">Available Courses</h2>
      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-card">
            <h3 className="course-name">{course.name}</h3>
            <p className="course-detail">Duration: {course.duration}</p>
            <p className="course-detail">Level: {course.level}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;