import React from "react";
import Hour from "../hour/Hour";

import "./day.scss";

const Day = ({
  dataDay,
  dayEvents,
  removeEvent,
  weekStartDate,
  setModalInfo,
  modalInfoIsOpen,
  setTimeOnModal,
  date,
}) => {
  const hours = Array(24)
    .fill()
    .map((val, index) => index);

  return (
    <div className="calendar__day" data-day={dataDay}>
      {hours.map((hour) => {
        const hourEvents = dayEvents.filter(
          (event) => event.dateFrom.getHours() === hour
        );

        return (
          <Hour
            key={dataDay + hour}
            dataHour={hour}
            hourEvents={hourEvents}
            removeEvent={removeEvent}
            dataDay={dataDay}
            weekStartDate={weekStartDate}
            modalInfoIsOpen={modalInfoIsOpen}
            setModalInfo={setModalInfo}
            setTimeOnModal={setTimeOnModal}
            date={date}
          />
        );
      })}
    </div>
  );
};

export default Day;
