import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { deleteEvent } from '../../gateway/index.js';

import './event.scss';

const Event = ({ height, marginTop, title, time, id, description, events, setEvent }) => {
  const eventStyle = {
    height,
    marginTop,
  };

  const [eventClicked, setEventClicked] = useState(false);

  const removeEvent = eventId => {
    const thisEvent = events.find(event => event.id === eventId);
    const eventDate = thisEvent.dateFrom;
    const currentDate = new Date();
    if (eventDate - currentDate < 900000) {
      alert('You can`t delete an event less than 15 minutes before it starts and after it ends');
      return;
    }
    deleteEvent(eventId)
      .then(() => {
        setEvent(prevState => prevState.filter(element => element.id !== eventId));
      })
      .catch(() => {
        alert('Internal Server Error. Can`t delete event');
      });
  };

  return (
    <div style={eventStyle} className="event" onClick={() => setEventClicked(!eventClicked)}>
  <div className="event-information">
    <div className="event__title">{title}</div>
    <div className="event__time">{time}</div>
    <div className="event__description">{description}</div>
  </div>
  {eventClicked && (
    <button className="delete-event-btn" onClick={() => removeEvent(id)}>
      <FontAwesomeIcon icon={faTrashCan} /> {'Remove event'}
    </button>
  )}
</div>

  );
};

export default Event;
