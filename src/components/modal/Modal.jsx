import React, { useEffect, useState } from 'react';
import { createNewEvent } from '../../gateway/index.js';
import {
  calculateTimeDifference,
  getParseDateTime,
  roundToNearestQuarterHour,
} from '../../utils/index.js';
import './modal.scss';

const Modal = ({ onClose, events, setEvent, date, setModalTime }) => {
  const [inputs, setInputs] = useState({
    date: '',
    startTime: '',
    endTime: '',
    title: '',
    description: '',
  });

  useEffect(() => {
    const selectedDate = date ? new Date(date) : new Date();
    const formatTime = time => time.toString().padStart(2, '0');
    const formattedDate = `${selectedDate.getFullYear()}-${formatTime(selectedDate.getMonth() + 1)}-${formatTime(selectedDate.getDate())}`;
    const formattedStartTime = `${formatTime(selectedDate.getHours())}:${formatTime(selectedDate.getMinutes())}`;
    const formattedEndTime = `${formatTime(selectedDate.getHours() + 1)}:${formatTime(selectedDate.getMinutes())}`;

    setInputs(prevInputs => ({
      ...prevInputs,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    }));
  }, [date]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  };

  const createEvent = () => {
    const { title, date, startTime, endTime, description } = inputs;
    if (!title || !date || !startTime || !endTime) {
      alert('Please, fill in all fields');
      return null;
    }

    const timeDifference = calculateTimeDifference(startTime, endTime);
    if (timeDifference < 15) {
      alert('Event must be longer than 15 minutes');
      return null;
    }
    if (timeDifference > 360) {
      alert("Event can't be longer than 6 hours");
      return null;
    }

    const eventStart = getParseDateTime(date, roundToNearestQuarterHour(startTime));
    const eventEnd = getParseDateTime(date, roundToNearestQuarterHour(endTime));
    const newId = events.length > 0 ? Number(events[events.length - 1].id) + 1 : 1;

    return {
      id: newId,
      title,
      description,
      dateFrom: eventStart,
      dateTo: eventEnd,
    };
  };

  const addEvent = async event => {
    const isOverlap = events.some(
      currentEvent =>
        event.dateFrom <= currentEvent.dateTo && event.dateTo >= currentEvent.dateFrom,
    );

    if (isOverlap) {
      alert('Events cannot overlap in time. Please select a different time for the event');
      return;
    }

    try {
      await createNewEvent(event);
      setEvent([...events, event]);
      setModalTime('');
      onClose();
    } catch (error) {
      alert('Internal Server Error. Can`t create event ' + error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newEvent = createEvent();
    if (newEvent) {
      addEvent(newEvent);
    }
  };

  return (
    <div className="modal overlay">
      <div className="modal__content">
        <div className="create-event-window">
          <button
            className="create-event-window__close-btn"
            onClick={() => {
              setModalTime('');
              onClose();
            }}
          >
            +
          </button>
          <form className="event-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="event-form__field"
              onChange={handleInputChange}
            />
            <div className="event-form__time">
              <input
                type="date"
                name="date"
                className="event-form__field"
                onChange={handleInputChange}
                value={inputs.date}
              />
              <input
                type="time"
                name="startTime"
                step="900"
                className="event-form__field"
                value={inputs.startTime}
                onChange={handleInputChange}
              />
              <span>-</span>
              <input
                type="time"
                step="900"
                name="endTime"
                className="event-form__field"
                value={inputs.endTime}
                onChange={handleInputChange}
              />
            </div>
            <textarea
              name="description"
              placeholder="Description"
              className="event-form__field"
              onChange={handleInputChange}
            />
            <button type="submit" className="event-form__submit-btn">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
