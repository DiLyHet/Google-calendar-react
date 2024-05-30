import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getWeekStartDate } from './utils/index.js';
import './common.scss';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setIsModalOpen={setIsModalOpen}
        setWeekStartDate={setWeekStartDate}
      />
      <Calendar
        weekStartDate={weekStartDate}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default App;
