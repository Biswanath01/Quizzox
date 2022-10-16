import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './Components/Details';
import Quiz from './Components/Quiz';
import Score from './Components/Score';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Details />} />
          <Route path = "/quiz-details" element={<Details />} />
          <Route path = "/:username/:difficulty" element={<Quiz />} />
          <Route path = "/:username/score-page" element={<Score />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};