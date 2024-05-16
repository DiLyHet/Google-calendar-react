import React, { useEffect, useState } from 'react';

import { events, setEvent, setTimeOnModal } from './App';

const mockApiUrl = 'https://651be3e0194f77f2a5af0850.mockapi.io/api/v1/events';

export function serverGetMethod() {
  fetch(mockApiUrl, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(eventList => {
      setEvent(
        eventList.map(event => ({
          ...event,
          dateFrom: new Date(event.dateFrom),
          dateTo: new Date(event.dateTo),
        })),
      );
    })
    .catch(() => {
      alert('Internal Server Error. Can`t display events');
    });
}

export function serverPostMethod(event) {
  fetch(mockApiUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(event),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => {
      setEvent([...events, event]);
      setTimeOnModal('');
    })
    .catch(error => {});
}

export function serverDeleteMethod(eventId) {
  fetch(`${mockApiUrl}/${eventId}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(() => {
      setEvent(prevState => prevState.filter(element => element.id !== eventId));
    })
    .catch(error => {});
}
