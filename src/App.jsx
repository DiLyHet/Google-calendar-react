import React, { useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";

import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";

import "./common.scss";

function App() {
  const [weekStartDate, setWeekStartDate] = useState(getWeekStartDate(new Date()));
  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));

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

  return (
    <>
      <Header
        nextWeek={nextWeek}
        lastWeek={lastWeek}
        thisWeek={thisWeek}
        weekStartDate={weekStartDate}
        weekEndDate={weekEndDate}
      />
      <Calendar weekDates={weekDates} />
    </>
  );
}

export default App;
