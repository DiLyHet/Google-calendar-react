import React, { useEffect, useState } from 'react';
import { createNewEvent } from '../../gateway/index.js';
import './modal.scss';

export default function Modal({ isOpen, onClose, events, setEvent, date, setTimeOnModal }) {
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

  const calculateTimeDifference = (start, end) => {
    const [startHours, startMinutes] = start.split(':').map(Number);
    const [endHours, endMinutes] = end.split(':').map(Number);
    return endHours * 60 + endMinutes - (startHours * 60 + startMinutes);
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

    const parseDateTime = (dateStr, timeStr) => {
      const [year, month, day] = dateStr.split('-').map(Number);
      const [hours, minutes] = timeStr.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    };

    const roundToNearestQuarterHour = time => {
      let [hours, minutes] = time.split(':').map(Number);
      minutes = Math.round(minutes / 15) * 15;
      if (minutes === 60) {
        minutes = 0;
        hours += 1;
      }
      if (hours === 24) hours = 0;
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const eventStart = parseDateTime(date, roundToNearestQuarterHour(startTime));
    const eventEnd = parseDateTime(date, roundToNearestQuarterHour(endTime));
    const newId = events.length > 0 ? Number(events[events.length - 1].id) + 1 : 1;

    return {
      id: newId,
      title,
      description,
      dateFrom: eventStart,
      dateTo: eventEnd,
    };
  };

  async function addEvent(event) {
    let isOverlap = false;
    events.forEach(currentEvent => {
      if (event.dateFrom <= currentEvent.dateTo && event.dateTo >= currentEvent.dateFrom) {
        isOverlap = true;
      }
    });
    if (isOverlap) {
      alert('Events cannot overlap in time. Please select a different time for the event');
      return;
    }
    try {
      await createNewEvent(event);
      setEvent([...events, event]);
      setTimeOnModal('');
      onClose();
    } catch (error) {
      alert('Internal Server Error. Can`t create event ' + error);
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    const newEvent = createEvent();
    if (newEvent) {
      addEvent(newEvent);
    }
  };

  return (
    isOpen && (
      <div className="modal overlay">
        <div className="modal__content">
          <div className="create-event-window">
            <button className="create-event-window__close-btn" onClick={onClose}>
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
              ></textarea>
              <button type="submit" className="event-form__submit-btn">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
}
