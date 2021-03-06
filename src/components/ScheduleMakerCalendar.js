import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function ScheduleMakerCalendar(props) {
  const [eventData, setEventData] = useState([]);

  const sendingDateDataToForm = (evt) => {
    props.dateClicked(evt);
  };

  // // Hosting URL
  const url = "https://bennettdesigns.dev/teamwork/api/api.php";

  useEffect(() => {
    setInterval(function () {
      if (localStorage.getItem("Admin") === "ok") {
        viewFullSchedule();
        localStorage.setItem("Admin", "no");
      }
    }, 1800);
  });
  function viewFullSchedule() {
    fetch(url + "?action=viewFullSchedule", { credentials: "include" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        let formattedDate = res.map((entry) => ({
          title: entry.Department,
          start: entry.startDate_Time,
          end: entry.finishDate_Time,
        }));
        setEventData(formattedDate);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        // dateClick={this.handleDateClick}
        // ref={calendarRef}
        events={eventData}
        dateClick={sendingDateDataToForm}
        initialView="dayGridMonth"
      />
    </div>
  );
}
