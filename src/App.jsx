import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

function App() {
  const [weekStartDate, setWeekStartDate] = useState(
    getWeekStartDate(new Date())
  );

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

  const [events, setEvent] = useState([]);

  useEffect(() => {
    fetch("https://651be3e0194f77f2a5af0850.mockapi.io/api/v1/events", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((events) => {
        setEvent(
          events.map((event) => ({
            ...event,
            dateFrom: new Date(event.dateFrom),
            dateTo: new Date(event.dateTo),
          }))
        );
      })
      .catch(() => {
        alert("Internal Server Error. Can`t display events");
      });
  }, []);

  function addEvent(event) {
    fetch("https://651be3e0194f77f2a5af0850.mockapi.io/api/v1/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(event),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((task) => {})
      .catch((error) => {});
  }

  function removeEvent(eventId) {
    fetch(
      `https://651be3e0194f77f2a5af0850.mockapi.io/api/v1/events/${eventId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(() => {
        setEvent((prevState) =>
          prevState.filter((element) => element.id !== eventId)
        );
      })
      .catch((error) => {});
  }

  function nextWeek() {
    const nextWeekStartDay = new Date(weekStartDate);
    nextWeekStartDay.setDate(
      weekStartDate.getDate() + ((7 - weekStartDate.getDay() + 1) % 7 || 7)
    );
    setWeekStartDate(nextWeekStartDay);
  }

  function lastWeek() {
    const lastWeekStartDay = new Date(weekStartDate);
    lastWeekStartDay.setDate(
      weekStartDate.getDate() - ((7 - weekStartDate.getDay() + 1) % 7 || 7)
    );
    setWeekStartDate(lastWeekStartDay);
  }

  function thisWeek() {
    setWeekStartDate(getWeekStartDate(new Date()));
  }

  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 6);

  console.log(events);
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
      />
      <Calendar
        weekDates={weekDates}
        events={events}
        removeEvent={removeEvent}
        weekStartDate={weekStartDate}
      />
    </>
  );
}

export default App;
