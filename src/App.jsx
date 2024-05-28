import React, { useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getWeekStartDate } from './utils/index.js';
import './common.scss';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeOnModalInfo, setTimeOnModal] = useState('');
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        setIsModalOpen={setIsModalOpen}
        setTimeOnModal={setTimeOnModal}
        setWeekStartDate={setWeekStartDate}
      />
      <Calendar
        timeOnModalInfo={timeOnModalInfo}
        weekStartDate={weekStartDate}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setTimeOnModal={setTimeOnModal}
      />
    </>
  );
};

export default App;
