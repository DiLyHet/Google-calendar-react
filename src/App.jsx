import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { serverDeleteMethod, serverGetMethod, serverPostMethod } from './ServerCommunication.jsx';

import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';

import './common.scss';

function App() {
  const [modalInfoIsOpen, setModalInfo] = useState(false);
  const [timeOnModalInfo, setTimeOnModal] = useState('');

  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const [events, setEvent] = useState([]);

  useEffect(() => {
    serverGetMethod();
  }, []);

  function addEvent(event) {
    let isOverlap = false;
    events.forEach(currentEvent => {
      if (event.dateFrom <= currentEvent.dateTo && event.dateTo >= currentEvent.dateFrom) {
        isOverlap = true;
      }
    });
    if (isOverlap) {
      alert('Events cannot overlap in time. Please select a different time for the event');
      return;
    }
    serverPostMethod();
  }

  function removeEvent(eventId) {
    const thisEvent = events.find(event => event.id === eventId);
    const eventDate = thisEvent.dateFrom;
    const currentDate = new Date();
    if (eventDate - currentDate < 900000) {
      alert('You can`t delete an event less than 15 minutes before it starts and after it ends');
      return;
    }
    serverDeleteMethod();
  }

  function nextWeek() {
    const nextWeekStartDay = new Date(weekStartDate);
    nextWeekStartDay.setDate(weekStartDate.getDate() + ((7 - weekStartDate.getDay() + 1) % 7 || 7));
    setWeekStartDate(nextWeekStartDay);
  }

  function lastWeek() {
    const lastWeekStartDay = new Date(weekStartDate);
    lastWeekStartDay.setDate(weekStartDate.getDate() - ((7 - weekStartDate.getDay() + 1) % 7 || 7));
    setWeekStartDate(lastWeekStartDay);
  }

  function thisWeek() {
    setWeekStartDate(getWeekStartDate(new Date()));
  }

  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 6);

  return (
    <>
      <Header
        nextWeek={nextWeek}
        lastWeek={lastWeek}
        thisWeek={thisWeek}
        weekStartDate={weekStartDate}
        weekEndDate={weekEndDate}
        events={events}
        addEvent={addEvent}
        modalInfoIsOpen={modalInfoIsOpen}
        setModalInfo={setModalInfo}
        timeOnModalInfo={timeOnModalInfo}
        setTimeOnModal={setTimeOnModal}
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        removeEvent={removeEvent}
        weekStartDate={weekStartDate}
        modalInfoIsOpen={modalInfoIsOpen}
        setModalInfo={setModalInfo}
        setTimeOnModal={setTimeOnModal}
      />
    </>
  );
}

export default App;
