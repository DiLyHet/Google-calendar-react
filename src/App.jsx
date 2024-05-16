import React, { useEffect, useState } from 'react';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';

import { getWeekStartDate, generateWeekRange } from './utils/dateUtils.js';

import './common.scss';

function App() {
  const [modalInfoIsOpen, setModalInfo] = useState(false);
  const [timeOnModalInfo, setTimeOnModal] = useState('');

  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const [events, setEvent] = useState([]);
  const mockApiUrl = 'https://651be3e0194f77f2a5af0850.mockapi.io/api/v1/events';

  useEffect(() => {
    fetch(mockApiUrl, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
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
    fetch(mockApiUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(event),
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        setEvent([...events, event]);
        setTimeOnModal('');
      })
      .catch(error => {});
  }

  function removeEvent(eventId) {
    const thisEvent = events.find(event => event.id === eventId);
    const eventDate = thisEvent.dateFrom;
    const currentDate = new Date();
    if (eventDate - currentDate < 900000) {
      alert('You can`t delete an event less than 15 minutes before it starts and after it ends');
      return;
    }
    fetch(`${mockApiUrl}/${eventId}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        setEvent(prevState => prevState.filter(element => element.id !== eventId));
      })
      .catch(error => {});
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
