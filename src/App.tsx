import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './components/MainPage/MainPage';
import { CalendarPage } from './components/CalendarPage/CalendarPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  );
}
export default App;
