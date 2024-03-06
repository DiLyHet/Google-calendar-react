import React, { useState } from "react";

import "./modal.scss";

export default function Modal({ isOpen, onClose, events, onSubmit }) {
  const thisTime = `${new Date()
    .getHours()
    .toString()
    .padStart(2, "0")}:${new Date().getMinutes().toString().padStart(2, "0")}`;
    const thisDay = `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${new Date().getDate().toString().padStart(2, "0")}`;
      const [dataDate, setDataDate] = useState(thisDay);
      const [dataStartTime, setDataStartTime] = useState(thisTime);
      const [dataEndTime, setDataEndTime] = useState("");
      
      let timeInString = dataStartTime.split(":");
      let hour = parseInt(timeInString[0], 10);
      let minutes = Math.round(parseInt(timeInString[1], 10) / 15) * 15;
      if (minutes === 60) {
        minutes = 0;
        hour += 1;
        if (hour === 24) {
          hour = 0;
        }
      }
      hour = (hour < 10 ? "0" : "") + hour;
      minutes = (minutes < 10 ? "0" : "") + minutes;
      const [inputs, setInputs] = useState({
        date: dataDate,
        startTime: `${hour}:${minutes}`,
      });

  function timeDifferenceBetween(time1, time2) {
    let [hours1, minutes1] = time1.split(":").map(Number);
    let [hours2, minutes2] = time2.split(":").map(Number);

    let time1_minutes = hours1 * 60 + minutes1;
    let time2_minutes = hours2 * 60 + minutes2;

    let minutesDifferent = time1_minutes - time2_minutes;

    console.log(minutesDifferent);
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(value);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function createNewEvent() {
    if (!inputs.title || !inputs.endTime || !inputs.startTime || !inputs.date) {
      alert("Please, fill in all fields");
      console.log(inputs);
      return undefined;
    }
    if (timeDifferenceBetween(dataEndTime, `${hour}:${minutes}`) < 15) {
      alert("Event must be longer then 15 minutes");
      return undefined;
    }
    if (timeDifferenceBetween(dataEndTime, `${hour}:${minutes}`) > 360) {
      alert("Event can`t be longer then 6 hours");
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
                    onChange={(event) => {
                      setDataDate(event.target.value);
                      handleChange(event);
                    }}
                    value={dataDate}
                  />
                  <input
                    type="time"
                    name="startTime"
                    step="900"
                    className="event-form__field"
                    value={`${hour}:${minutes}`}
                    onChange={(event) => {
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
                    onChange={(event) => {
                      setDataEndTime(event.target.value);
                      handleChange(event);
                    }}
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
