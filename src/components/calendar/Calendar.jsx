import React from "react";

import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";

import "./calendar.scss";

export default function Calendar({
  events,
  weekDates,
  removeEvent,
  weekStartDate,
  modalInfoIsOpen,
  setModalInfo,
  setTimeOnModal,
}) {
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            removeEvent={removeEvent}
            weekStartDate={weekStartDate}
            modalInfoIsOpen={modalInfoIsOpen}
            setModalInfo={setModalInfo}
            setTimeOnModal={setTimeOnModal}
          />
        </div>
      </div>
    </section>
  );
}
