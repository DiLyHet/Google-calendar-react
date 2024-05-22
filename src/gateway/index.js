const mockApiUrl = 'https://651be3e0194f77f2a5af0850.mockapi.io/api/v1/events';

export const fetchEvents = () => {
  return fetch(mockApiUrl, {
    method: 'GET',
    headers: { 'content-type': 'application/json' },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(() => {
      throw new Error('Internal Server Error. Can`t display events');
    });
};

export const createNewEvent = event => {
  console.log(event);
  return fetch(mockApiUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(event),
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(() => {
      throw new Error('Internal Server Error. Can`t create event');
    });
};

export const deleteEvent = eventId => {
  return fetch(`${mockApiUrl}/${eventId}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .catch(() => {
      throw new Error('Internal Server Error. Can`t delete event');
    });
};
