// import { useState } from "react";

// type RootState = { calendar: { selectedDate?: number } };

export default function DateTimePicker() {
  const hourItem = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }));
  console.log(hourItem, "hourItem");
  const minuteItem = Array.from({ length: 60 }, (_, i) => ({
    value: i.toString().padStart(2, "0"),
    label: i.toString().padStart(2, "0"),
  }));
  console.log(minuteItem, "minuteItem");
  return (
    <>
      <div className="time-picker-container">
        <div className="hour-container">
          <div className="hour">10</div>
          <div className="hour">11</div>
          <div className="hour">12</div>
        </div>

        <div className="minute-container">
          <div className="minute">10</div>
          <div className="minute">11</div>
          <div className="minute">12</div>
        </div>
      </div>
    </>
  );
}
