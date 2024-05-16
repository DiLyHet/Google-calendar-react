import React, { useEffect, useState } from 'react';

import Event from '../event/Event';
import { formatMins } from '../../utils/dateUtils.js';

const Hour = ({
  dataHour,
  hourEvents,
  removeEvent,
  dataDay,
  setModalInfo,
  setTimeOnModal,
  date,
}) => {
  const [marginTopData, setMarginTopData] = useState(new Date().getMinutes() - 2);
  const [eventClicked, setEventClicked] = useState(false);
  setInterval(() => {
    setMarginTopData(marginTopData + 1);
  }, 60000);

  useEffect(() => {});

  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={e => {
        if (e.target === e.currentTarget) {
          setModalInfo(true);
          const newDate = date;
          newDate.setHours(dataHour);
          setTimeOnModal(date);
        }
      }}
    >
      {hourEvents.map((id, dateFrom, dateTo, title) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;
        console.log(date);
        return (
          <Event
            key={id}
            id={id}
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            removeEvent={removeEvent}
            clickOnEvent={() => setEventClicked(!eventClicked)}
            clickStatus={eventClicked}
          />
        );
      })}

      {dataDay === new Date().getDate() && dataHour === new Date().getHours() && (
        <div style={{ marginTop: marginTopData }} className="red-line"></div>
      )}
    </div>
  );
};

export default Hour;
