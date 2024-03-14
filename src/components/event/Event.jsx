import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./event.scss";

const Event = ({
  height,
  marginTop,
  title,
  time,
  removeEvent,
  id,
  clickOnEvent,
  clickStatus,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <>
      <div style={eventStyle} className="event" onClick={clickOnEvent}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
        {clickStatus && (
          <button className="delete-event-btn" onClick={() => removeEvent(id)}>
            <FontAwesomeIcon icon={faTrashCan} /> {"Remove event"}
          </button>
        )}
      </div>
    </>
  );
};

export default Event;
