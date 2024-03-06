import React, { useState } from "react";

import "./modal.scss";

export default function Modal({ isOpen, onClose, events, onSubmit }) {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function createNewEvent() {
    if (!inputs.title || !inputs.date || !inputs.startTime || !inputs.endTime) {
      alert("Please, fill in all fields");
      return undefined;
    }

    const parseDateTime = (dateStr, timeStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      const [hours, minutes] = timeStr.split(":").map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    };

    const dateFrom = parseDateTime(inputs.date, inputs.startTime);
    const dateTo = parseDateTime(inputs.date, inputs.endTime);
    const newId = events.length > 0 ? events.at(-1).id + 1 : 1;

    const newEvent = {
      id: newId,
      title: inputs.title,
      description: inputs.description,
      dateFrom: dateFrom,
      dateTo: dateTo,
    };

    return newEvent;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const toDoNewEvent = createNewEvent();

    if (toDoNewEvent === undefined) {
      return undefined;
    } else {
      onSubmit(toDoNewEvent);
    }

    console.log(events);
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
                  />
                  <input
                    type="time"
                    name="startTime"
                    className="event-form__field"
                    onChange={handleChange}
                  />
                  <span>-</span>
                  <input
                    type="time"
                    name="endTime"
                    className="event-form__field"
                    onChange={handleChange}
                  />
                </div>
                <textarea
                  name="description"
                  placeholder="Description"
                  className="event-form__field"
                  onChange={handleChange}></textarea>
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
