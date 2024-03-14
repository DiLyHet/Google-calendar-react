import React from "react";
import { months } from "../../utils/dateUtils";

import "./header.scss";
import Modal from "../modal/Modal";

const Header = ({
  nextWeek,
  lastWeek,
  thisWeek,
  weekStartDate,
  weekEndDate,
  events,
  addEvent,
  setModalInfo,
  modalInfoIsOpen,
  timeOnModalInfo,
  setTimeOnModal,
}) => {
  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={() => {
          setModalInfo(true);
          setTimeOnModal("");
        }}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <Modal
        isOpen={modalInfoIsOpen}
        onClose={() => setModalInfo(false)}
        events={events}
        onSubmit={addEvent}
        date={timeOnModalInfo}
      />
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={thisWeek}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={lastWeek}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={nextWeek}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">
          {months[weekStartDate.getMonth()].slice(0, 3) ===
          months[weekEndDate.getMonth()].slice(0, 3)
            ? months[weekStartDate.getMonth()].slice(0, 3)
            : months[weekStartDate.getMonth()].slice(0, 3) +
              " - " +
              months[weekEndDate.getMonth()].slice(0, 3)}
        </span>
      </div>
    </header>
  );
};

export default Header;
