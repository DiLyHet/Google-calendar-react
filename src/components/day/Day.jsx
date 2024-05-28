import React from 'react';
import Hour from '../hour/Hour';
import { getHoursArr } from '../../utils';

import '../../index.scss';

const Day = ({
  dataDay,
  dayEvents,
  weekStartDate,
  setIsModalOpen,
  isModalOpen,
  setTimeOnModal,
  date,
  events,
  setEvent,
}) => {
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
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
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
