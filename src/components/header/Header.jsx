import React from 'react';
import { months, getWeekStartDate } from '../../utils/dateUtils';

import './header.scss';
import Modal from '../modal/Modal';

const Header = ({
  weekStartDate,
  events,
  setModalInfo,
  modalInfoIsOpen,
  timeOnModalInfo,
  setTimeOnModal,
  setEvent,
  setWeekStartDate,
}) => {
  const nextWeek = () => {
    const nextWeekStartDay = new Date(weekStartDate);
    nextWeekStartDay.setDate(weekStartDate.getDate() + ((7 - weekStartDate.getDay() + 1) % 7 || 7));
    setWeekStartDate(nextWeekStartDay);
  };

  const lastWeek = () => {
    const lastWeekStartDay = new Date(weekStartDate);
    lastWeekStartDay.setDate(weekStartDate.getDate() - ((7 - weekStartDate.getDay() + 1) % 7 || 7));
    setWeekStartDate(lastWeekStartDay);
  };

  const thisWeek = () => {
    setWeekStartDate(getWeekStartDate(new Date()));
  };

  const weekEndDate = new Date(weekStartDate.setDate(weekStartDate.getDate() + 6));

  return (
    <header className="header">
      <button
        className="button create-event-btn"
        onClick={() => {
          setModalInfo(true);
          setTimeOnModal('');
        }}
      >
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <Modal
        isOpen={modalInfoIsOpen}
        onClose={() => setModalInfo(false)}
        events={events}
        date={timeOnModalInfo}
        setTimeOnModal={setTimeOnModal}
        setEvent={setEvent}
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
              ' - ' +
              months[weekEndDate.getMonth()].slice(0, 3)}
        </span>
      </div>
    </header>
  );
};

export default Header;
