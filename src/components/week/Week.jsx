import React from 'react';
import Day from '../day/Day';

import './week.scss';

const Week = ({
  weekDates,
  events,
  weekStartDate,
  setModalInfo,
  modalInfoIsOpen,
  setTimeOnModal,
  setEvent,
}) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);
        const dayEvents = events.filter(
          event => event.dateFrom >= dayStart && event.dateTo < dayEnd,
        );

        return (
          <Day
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            date={dayStart}
            dayEvents={dayEvents}
            events={events}
            weekStartDate={weekStartDate}
            modalInfoIsOpen={modalInfoIsOpen}
            setModalInfo={setModalInfo}
            setTimeOnModal={setTimeOnModal}
            setEvent={setEvent}
          />
        );
      })}
    </div>
  );
};

export default Week;
