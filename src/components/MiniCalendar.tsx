import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { goNextMonth, goPrevMonth, selectDate } from "../store/calendar-slice";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdaysShort = [
  { label: "S", weekday: "Sunday" },
  { label: "M", weekday: "Monday" },
  { label: "T", weekday: "Tuesday" },
  { label: "W", weekday: "Wednesday" },
  { label: "T", weekday: "Thursday" },
  { label: "F", weekday: "Friday" },
  { label: "S", weekday: "Saturday" },
];

type RootState = {
  calendar: {
    year: number;
    month: number;
    selectedDate?: number;
  };
};

export default function MiniCalendar() {
  const today = new Date();
  const dispatch = useDispatch();
  const current = useSelector((s: RootState) => ({
    year: s.calendar.year,
    month: s.calendar.month,
    selectedDate: s.calendar.selectedDate,
  }));

  const firstOfMonth = new Date(current.year, current.month, 1);
  const firstDay = firstOfMonth.getDay();
  const lastDayOfPreviousMonth = new Date(
    current.year,
    current.month,
    0
  ).getDate();
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();

  const prevMonth = () => dispatch(goPrevMonth());
  const nextMonth = () => dispatch(goNextMonth());

  const cells: Array<{
    key: string;
    label: string;
    isToday: boolean;
    isOutside: boolean;
  }> = [];
  const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

  // Fill leading blanks from previous month for proper grid alignment
  for (let i = 0; i < startDay; i++) {
    cells.push({
      key: `b-${i}`,
      label: "",
      // label: String(lastDayOfPreviousMonth - firstDay + i + 1),
      isToday: false,
      isOutside: true,
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = `${current.year}-${current.month}-${d}` === todayKey;
    cells.push({ key: `d-${d}`, label: String(d), isToday, isOutside: false });
  }

  // Ensure 6 rows x 7 cols (like Google Calendar mini view)
  while (cells.length < 42) {
    cells.push({
      key: `t-${cells.length}`,
      label: "",
      isToday: false,
      isOutside: true,
    });
  }

  console.log(todayKey, console.log(cells));
  return (
    <div className="mini-cal">
      <div className="mini-cal-header">
        <button
          className="nav-btn"
          onClick={prevMonth}
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="title">
          {monthNames[current.month]} {current.year}
        </span>
        <button className="nav-btn" onClick={nextMonth} aria-label="Next month">
          ›
        </button>
      </div>
      <div className="mini-cal-grid">
        {weekdaysShort.map((d) => (
          <div key={d.weekday} className="dow">
            {d.label}
          </div>
        ))}
        {cells.map((c) => {
          const isSelected =
            !!current.selectedDate &&
            c.label &&
            new Date(current.year, current.month, Number(c.label)).getTime() ===
              current.selectedDate;
          return (
            <div
              key={`${c.key}-mini`}
              onClick={() => {
                if (!c.label) return;
                const d = new Date(
                  current.year,
                  current.month,
                  Number(c.label)
                ).getTime();
                dispatch(selectDate(d));
              }}
              className={`relative cell ${c.isOutside ? "outside" : ""} ${
                c.isToday ? "today" : ""
              } ${isSelected ? "selected" : ""}`}
            >
              {c.isToday && (
                <span className="w-1 h-1 bg-emerald-600 rounded-full z-10 absolute top-1 left-1" />
              )}
              {c.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
