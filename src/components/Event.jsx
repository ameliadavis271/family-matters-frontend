import React from "react";
import moment from "moment";
import { CardLink } from "../styles/Events";

export function Event(props) {
  const eventDate = moment(props.date).format("LL");
  console.log(eventDate);
  console.log(props.date);
  console.log(props);

  const todaysEvents = props.events.filter((event) => event.date === eventDate);
  console.log(todaysEvents);

  async function onDeleteClick(e, event) {
    e.preventDefault();
    // POST request with fetch, refer to SheetsDB docs
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/events/${event.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: {
          name: event.name,
          description: event.description,
          time: event.time,
          date: event.date,
        },
      }),
    });

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/events`);
    const events = await response.json();

    props.setEvents(events);
  }

  return (
    <div className="event">
      <h1>Event on {eventDate} </h1>
      {todaysEvents.map((event, index) => {
        return (
          <div key={event.id}>
            <h2>{event.name}</h2>
            <p>{event.time}</p>
            <p>{event.description}</p>
            <CardLink
              onClick={(e) => onDeleteClick(e, event)}
              to={`/events/${event.id}`}
            >
              Delete Event
            </CardLink>
          </div>
        );
      })}
    </div>
  );
}
