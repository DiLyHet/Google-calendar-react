import React, { useEffect, useState } from 'react';

import Event from '../event/Event';
import { formatMins } from '../../utils/index.js';

const Hour = ({
  dataHour,
  hourEvents,
  dataDay,
  setIsModalOpen,
  setModalTime,
  date,
  events,
  setEvent,
}) => {
  const [marginTopData, setMarginTopData] = useState(new Date().getMinutes() - 2);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMarginTopData(prevMarginTopData => prevMarginTopData + 1);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={e => {
        if (e.target === e.currentTarget) {
          setIsModalOpen(true);
          date.setHours(dataHour);
          setModalTime(date);
        }
      }}
    >
      {hourEvents.map(({ id, dateFrom, dateTo, title, description }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            description={description}
            events={events}
            setEvent={setEvent}
          />
        );
      })}

      {dataDay === new Date().getDate() &&
        dataHour === new Date().getHours() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear() && (
          <div style={{ marginTop: marginTopData }} className="red-line" />
      )}
    </div>
  );
};

export default Hour;
