import React, { useContext, useEffect, useState } from "react";
import { EventService } from "../services/Service";
import Event from "./Event";
import { SessionContext } from "./Contexts";
import { AlertManager } from "./AlertManager";
const Home = () => {
  const {user} = useContext(SessionContext)
  const [events, setEvents] = useState([])
  const [alert, setAlert] = useState()
  useEffect(() => {
    getAllEvents();
  },[]);

  const getAllEvents = async() => {
   const response = await EventService().getAllEvents();
   console.log('all events: ', response)
   if(response.status==='SUCCESS' && response.data) {
      setEvents(response.data);
   } else {
    setAlert({message: response.message});
   }
  }

  const events1 = [
    {
      event_id: "event123",
      event_title: "Music Event",
      event_date: "2024-04-01",
      event_price: "700",
      event_description: "testing events des",
      event_location: "hyderabad",
      event_host: "prabhas",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event1234",
      event_title: "Dance Event",
      event_date: "2024-04-02",
      event_price: "700",
      event_description: "testing events des",
      event_location: "vizag",
      event_host: "mahesh babu",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event123",
      event_title: "Music Event",
      event_date: "2024-04-01",
      event_price: "700",
      event_description: "testing events des",
      event_location: "hyderabad",
      event_host: "prabhas",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event1234",
      event_title: "Dance Event",
      event_date: "2024-04-02",
      event_price: "700",
      event_description: "testing events des",
      event_location: "vizag",
      event_host: "mahesh babu",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event123",
      event_title: "Music Event",
      event_date: "2024-04-01",
      event_price: "700",
      event_description: "testing events des",
      event_location: "hyderabad",
      event_host: "prabhas",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event1234",
      event_title: "Dance Event",
      event_date: "2024-04-02",
      event_price: "700",
      event_description: "testing events des",
      event_location: "vizag",
      event_host: "mahesh babu",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event123",
      event_title: "Music Event",
      event_date: "2024-04-01",
      event_price: "700",
      event_description: "testing events des",
      event_location: "hyderabad",
      event_host: "prabhas",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event1234",
      event_title: "Dance Event",
      event_date: "2024-04-02",
      event_price: "700",
      event_description: "testing events des",
      event_location: "vizag",
      event_host: "mahesh babu",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event123",
      event_title: "Music Event",
      event_date: "2024-04-01",
      event_price: "700",
      event_description: "testing events des",
      event_location: "hyderabad",
      event_host: "prabhas",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event1234",
      event_title: "Dance Event",
      event_date: "2024-04-02",
      event_price: "700",
      event_description: "testing events des",
      event_location: "vizag",
      event_host: "mahesh babu",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event123",
      event_title: "Music Event",
      event_date: "2024-04-01",
      event_price: "700",
      event_description: "testing events des",
      event_location: "hyderabad",
      event_host: "prabhas",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
    {
      event_id: "event1234",
      event_title: "Dance Event",
      event_date: "2024-04-02",
      event_price: "700",
      event_description: "testing events des",
      event_location: "vizag",
      event_host: "mahesh babu",
      event_img:
        "https://x22249184-image-store.s3.eu-west-1.amazonaws.com/event-api/dance-event.jpeg",
    },
  ];

  return (
    <React.Fragment>
      <div className="p-4 sm:ml-64">
        <div className="p-4 h-full rounded-lg dark:border-gray-700">
          {alert && alert.message && <AlertManager {...alert}/> }
          <div className=" grid grid-cols-1 mt-5  w-full md:grid-cols-3 sm:grid-cols-1 items-start">
            {events &&
              events.map((event) => (
                <Event event = {event} key={event.event_id} user={user} setAlert={setAlert} />
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
