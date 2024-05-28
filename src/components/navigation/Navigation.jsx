import React from 'react';

import { days } from '../../utils/index.js';

const Navigation = ({ weekDates }) => {
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate, id) => (
        <div className="calendar__day-label day-label" key={id + 1}>
          <span className={`day-label__day-name${dayDate.getDate() === new Date().getDate() && dayDate.getMonth() === new Date().getMonth() && dayDate.getFullYear() === new Date().getFullYear() ? ' today-day' : ''}`}>{days[dayDate.getDay()]}</span>
          <span className={`day-label__day-number${dayDate.getDate() === new Date().getDate() && dayDate.getMonth() === new Date().getMonth() && dayDate.getFullYear() === new Date().getFullYear() ? ' today-day' : ''}`}>{dayDate.getDate()}</span>
        </div>
      ))}
    </header>
  );
};

export default Navigation;
