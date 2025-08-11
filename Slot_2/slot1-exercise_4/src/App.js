import React from 'react';
import Navbar from './components/Navigation/Navbar.js';
import SimpleHeader from './components/Header/SimpleHeader.js';
import TextDisplay from './components/Text/TextDisplay.js';
import CourseList from './components/Course/CourseList.js';
import CardLayout from './components/layout/CardLayout.js';
import './App.css';

// Import and run all exercises
import './exercises/arrayExercises';
import './exercises/companyExercises';
import './exercises/promiseExercises';
import './exercises/es6Features';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <SimpleHeader />
      <TextDisplay />
      <CourseList />
      <CardLayout />
    </div>
  );
};

export default App;