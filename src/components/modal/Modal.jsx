import React, { useEffect, useState } from 'react';
import './modal.scss';

export default function Modal({ isOpen, onClose, events, onSubmit, date }) {
  const [dataDate, setDataDate] = useState('');
  const [dataStartTime, setDataStartTime] = useState('');
  const [dataEndTime, setDataEndTime] = useState('');
  const [inputs, setInputs] = useState({
    date: dataDate,
    startTime: dataStartTime,
    endTime: dataEndTime,
  });

  useEffect(() => {
    const dateIsEmpty = date === '';
    const selectedDate = dateIsEmpty ? new Date() : new Date(date);
    const thisDay = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
    const thisTime = `${selectedDate.getHours().toString().padStart(2, '0')}:${selectedDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    const endTime = `${(selectedDate.getHours() + 1).toString().padStart(2, '0')}:${selectedDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
    setDataDate(thisDay);
    setDataStartTime(thisTime);
    setDataEndTime(endTime);
    setInputs({ date: thisDay, startTime: thisTime, endTime: endTime });
  }, [date]);

  function timeDifferenceBetween(time1, time2) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    const time1Minutes = hours1 * 60 + minutes1;
    const time2Minutes = hours2 * 60 + minutes2;

    const minutesDifferent = time1Minutes - time2Minutes;
    return minutesDifferent;
  }

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs(values => ({ ...values, [name]: value }));
  };
  function createNewEvent() {
    if (!inputs.title || !inputs.endTime || !inputs.startTime || !inputs.date) {
      alert('Please, fill in all fields');
      return undefined;
    }

    const timeDifference = timeDifferenceBetween(inputs.endTime, `${inputs.startTime}`);
    if (timeDifference < 15) {
      alert('Event must be longer than 15 minutes');
      return undefined;
    }
    if (timeDifference > 360) {
      alert("Event can't be longer than 6 hours");
      return undefined;
    }

    const parseDateTime = (dateStr, timeStr) => {
      const [year, month, day] = dateStr.split('-').map(Number);
      const [hours, minutes] = timeStr.split(':').map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    };
    const floorTime = time => {
      const timeInString = time.split(':');
      let hour = parseInt(timeInString[0], 10);
      let minutes = Math.round(parseInt(timeInString[1], 10) / 15) * 15;
      if (minutes === 60) {
        minutes = 0;
        hour += 1;
        if (hour === 24) {
          hour = 0;
        }
      }
      return hour + ':' + minutes;
    };
    const dateFrom = parseDateTime(inputs.date, floorTime(inputs.startTime));
    const dateTo = parseDateTime(inputs.date, floorTime(inputs.endTime));
    const newId = events.length > 0 ? events[events.length - 1].id + 1 : 1;

    const newEvent = {
      id: newId,
      title: inputs.title,
      description: inputs.description,
      dateFrom,
      dateTo,
    };

    return newEvent;
  }

  const handleSubmit = event => {
    event.preventDefault();

    const toDoNewEvent = createNewEvent();

    if (toDoNewEvent === undefined) {
      return undefined;
    } else {
      onSubmit(toDoNewEvent);
    }

    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal overlay">
          <div className="modal__content">
            <div className="create-event">
              <button className="create-event__close-btn" onClick={onClose}>
                +
              </button>
              <form className="event-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="event-form__field"
                  onChange={handleChange}
                />
                <div className="event-form__time">
                  <input
                    type="date"
                    name="date"
                    className="event-form__field"
                    onChange={handleChange}
                    value={inputs.date}
                  />
                  <input
                    type="time"
                    name="startTime"
                    step="900"
                    className="event-form__field"
                    value={dataStartTime}
                    onChange={event => {
                      setDataStartTime(event.target.value);
                      handleChange(event);
                    }}
                  />
                  <span>-</span>
                  <input
                    type="time"
                    step="900"
                    name="endTime"
                    className="event-form__field"
                    onChange={event => {
                      setDataEndTime(event.target.value);
                      handleChange(event);
                    }}
                    value={dataEndTime}
                  />
                </div>
                <textarea
                  name="description"
                  placeholder="Description"
                  className="event-form__field"
                  onChange={handleChange}
                ></textarea>
                <button type="submit" className="event-form__submit-btn">
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
