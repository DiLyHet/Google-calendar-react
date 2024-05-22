import React from 'react';
import Hour from '../hour/Hour';

import '../../index.scss';

const Day = ({
  dataDay,
  dayEvents,
  weekStartDate,
  setModalInfo,
  modalInfoIsOpen,
  setTimeOnModal,
  date,
  events,
  setEvent,
}) => {
  const getHoursArr = Array(24)
    .fill()
    .map((_, index) => index);

  return (
    <div className={'calendar__day'} data-day={dataDay}>
      {getHoursArr.map(hour => {
        const hourEvents = dayEvents.filter(event => event.dateFrom.getHours() === hour);

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            dataDay={dataDay}
            weekStartDate={weekStartDate}
            modalInfoIsOpen={modalInfoIsOpen}
            setModalInfo={setModalInfo}
            setTimeOnModal={setTimeOnModal}
            date={date}
            events={events}
            setEvent={setEvent}
          />
        );
      })}
    </div>
  );
};

export default Day;
