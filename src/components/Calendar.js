import React, { useState } from "react";
import moment from "moment";

function Calendar({currentMonth, data}) {
  const [selectedDay, setSelectedDay] = useState(null);
  const handleDayClick = (dayDate) => {
    if (selectedDay === dayDate) {
      setSelectedDay(null);
    } else {
      setSelectedDay(dayDate);
    }
  };


  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Sunday</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {renderCalendarDays(currentMonth, data, handleDayClick)}
        </tbody>
      </table>
      {selectedDay && (
        <div className="selected-day-message">
          <h3>Selected Day: {moment(selectedDay).format("YYYY-MM-DD")}</h3>
          <p>
            Commit:{" "}
            {data.find((commit) => commit.date.includes(selectedDay))?.message || "No commit"}
          </p>
          <p>
            Author Name:{" "}
            {data.find((commit) => commit.date.includes(selectedDay))?.authorName || "-"}
          </p>
          <p>
            Commit Url:{" "}
            {data.find((commit) => commit.date.includes(selectedDay))?.commitUrl || "-"}
          </p>
        </div>
      )}
    </div>
  );
}

  function renderCalendarDays(currentMonth,data, handleDayClick) {
    const firstDay = currentMonth.clone().startOf("month").startOf("week");
    const lastDay = currentMonth.clone().endOf("month").endOf("week");
    const days = [];
    for (let day = firstDay.clone(); day.isBefore(lastDay); day.add(1, "day")) {
      days.push(day.format("YYYY-MM-DD"));
    }

    const dayRows = [];
    let i = 0;
    
    while (i < days.length) {
      dayRows.push(
        <tr key={i}>
          {days.slice(i, i + 7).map((dayDate, dayIndex) => {
          const messagesPerDay = {};
            if (messagesPerDay[dayDate] === undefined) {
              // Get the first message for this day
              const eventsForDay = data.filter((commit) => commit.date.includes(dayDate));
              if (eventsForDay.length > 0) {
                messagesPerDay[dayDate] = eventsForDay[0].message;
              } else {
                messagesPerDay[dayDate] = "";
              }
            }
            return (
              <td key={dayDate} onClick={() => handleDayClick(dayDate)}>
                  {moment(dayDate).month() === currentMonth.month() ? (
                <div className="calendar-day">
                    <div className="calendar-day-number">{moment(dayDate).format("D")}</div>
                    <br />
                  <div className="event-container">
                    {messagesPerDay[dayDate] && (
                      <div className="event">{messagesPerDay[dayDate]}</div>
                    )}
                  </div>
                </div>
                  ) : (
                    <span>&nbsp;</span>
                  )}
              </td>
            );
          })}
        </tr>
      );
      i += 7;
    }

    return dayRows;
  }

export default Calendar;
