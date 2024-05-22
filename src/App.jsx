import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';
import { fetchEvents } from './gateway/index.js';

import './common.scss';

function App() {
  const [modalInfoIsOpen, setModalInfo] = useState(false);
  const [timeOnModalInfo, setTimeOnModal] = useState('');
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const [events, setEvent] = useState([]);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  useEffect(() => {
    fetchEvents()
      .then(eventsList => {
        setEvent(
          eventsList.map(event => ({
            ...event,
            dateFrom: new Date(event.dateFrom),
            dateTo: new Date(event.dateTo),
          })),
        );
      })
      .catch(() => {
        alert('Internal Server Error. Can`t display events');
      });
  }, []);

  return (
    <>
      <Header
        weekStartDate={weekStartDate}
        events={events}
        modalInfoIsOpen={modalInfoIsOpen}
        setModalInfo={setModalInfo}
        timeOnModalInfo={timeOnModalInfo}
        setTimeOnModal={setTimeOnModal}
        setEvent={setEvent}
        setWeekStartDate={setWeekStartDate}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        weekStartDate={weekStartDate}
        modalInfoIsOpen={modalInfoIsOpen}
        setModalInfo={setModalInfo}
        setTimeOnModal={setTimeOnModal}
        setEvent={setEvent}
      />
    </>
  );
}

export default App;
