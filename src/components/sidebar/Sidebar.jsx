import React from 'react';

import './sidebar.scss';

const Sidebar = () => {
  const hours = Array(24)
    .fill()
    .map((_, index) => index);

  return (
    <div className="calendar__time-scale">
      {hours.map((hour, id) => (
        <div className="time-slot" key={id + 1}>
          <span className="time-slot__time">{`${hour}:00`}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
