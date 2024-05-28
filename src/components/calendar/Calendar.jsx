import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import Modal from '../modal/Modal';
import { fetchEvents } from '../../gateway/index.js';
import { getWeekStartDate, generateWeekRange } from '../../utils/index.js';
import './calendar.scss';

const Calendar = ({
  weekStartDate,
  isModalOpen,
  setIsModalOpen,
  setTimeOnModal,
  timeOnModalInfo,
}) => {
  const [events, setEvent] = useState([]);

  const weekDates = generateWeekRange(getWeekStartDate(weekStartDate));
  useEffect(() => {
    fetchEvents()
      .then(eventsList => {
        setEvent(
          eventsList.map(event => ({
            ...event,
            dateFrom: new Date(event.dateFrom),
            dateTo: new Date(event.dateTo),
          })),
        );
      })
      .catch(() => {
        alert('Internal Server Error. Can`t display events');
      });
  }, []);
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          events={events}
          date={timeOnModalInfo}
          setTimeOnModal={setTimeOnModal}
          setEvent={setEvent}
        />
      )}
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            events={events}
            weekStartDate={weekStartDate}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setTimeOnModal={setTimeOnModal}
            setEvent={setEvent}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
