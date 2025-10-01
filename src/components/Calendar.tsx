import leftArrow from "../assets/left-arrow.svg";
import rightArrow from "../assets/right-arrow.svg";
import dropDownArrow from "../assets/dropdown-arrow.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEvent,
  openModalForDate,
  selectDate,
} from "../store/calendar-slice";
import type { TaskItem } from "../store/tasks-slice";

const months = [
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
type RootState = {
  calendar: {
    year: number;
    month: number;
    selectedDate?: number;
    eventsByDay: Record<string, { id: string; title: string; start: number }[]>;
  };
  tasks: { items: TaskItem[] };
};

export default function Calendar() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dispatch = useDispatch();
  const cal = useSelector((s: RootState) => s.calendar);
  const firstOfMonth = new Date(cal.year, cal.month, 1);
  const firstDay = firstOfMonth.getDay();
  const daysInMonth = new Date(cal.year, cal.month + 1, 0).getDate();
  const prevMonthDays = new Date(cal.year, cal.month, 0).getDate();
  console.log(prevMonthDays, "prevMonthDays");

  //handling date click
  function handleDateCick(e: React.MouseEvent<HTMLDivElement>) {
    const selectedDay = Number((e.target as HTMLDivElement).innerText);
    if (!selectedDay) return;
    const dateMs = new Date(cal.year, cal.month, selectedDay).getTime();
    dispatch(selectDate(dateMs));
  }

  const COL_START = [
    "", // index 0 unused
    "col-start-1",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  return (
    <div className="calendar-container">
      <div className="calendar-first-row">
        <div className="flex items-center gap-3">
          <p className="text-lg mb-4 text-white">
            {months[cal.month]} {cal.year}
          </p>
          <img
            src={dropDownArrow}
            alt=""
            height="20px"
            width="20px"
            // className="invert inline-block ml-2"
          />
        </div>
        <div className="grid grid-cols-2"></div>
      </div>
      <div className="calendar-second-row">
        <div className="grid-weekdays-heading">
          {days.map((day) => (
            <div key={day} className="text-center font-semibold py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid-weekdays-dates">
          {[
            // leading days from previous month to fill grid start
            ...Array.from({ length: firstDay }, (_, i) => ({
              label: String(prevMonthDays - firstDay + 1 + i),
              outside: true,
              dateMs: new Date(
                cal.year,
                cal.month - 1,
                prevMonthDays - firstDay + 1 + i
              ).getTime(),
            })),
            // current month days
            ...Array.from({ length: daysInMonth }, (_, i) => ({
              label: String(i + 1),
              outside: false,
              dateMs: new Date(cal.year, cal.month, i + 1).getTime(),
            })),
            // trailing days to complete 42 cells
            ...Array.from(
              { length: Math.max(0, 42 - (firstDay + daysInMonth)) },
              (_, i) => ({
                label: String(i + 1),
                outside: true,
                dateMs: new Date(cal.year, cal.month + 1, i + 1).getTime(),
              })
            ),
          ].map((cell) => {
            const isToday = (() => {
              const t = new Date();
              const td = new Date(
                t.getFullYear(),
                t.getMonth(),
                t.getDate()
              ).getTime();
              return (
                td ===
                new Date(
                  new Date(cell.dateMs).getFullYear(),
                  new Date(cell.dateMs).getMonth(),
                  new Date(cell.dateMs).getDate()
                ).getTime()
              );
            })();
            const isSelected = cal.selectedDate === cell.dateMs;
            return (
              <div
                key={cell.dateMs}
                className={`day-cell ${cell.outside ? "outside" : ""}`}
                onClick={() => dispatch(selectDate(cell.dateMs))}
              >
                <span
                  className={`day-number ${isToday ? "today" : ""} ${
                    isSelected ? "selected" : ""
                  }`}
                >
                  {cell.label}
                </span>
                <TasksForDay dateMs={cell.dateMs} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TasksForDay({ dateMs }: { dateMs: number }) {
  const items = useSelector((s: RootState) => s.tasks.items);
  const start = new Date(dateMs);
  const dayStart = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate()
  ).getTime();
  const nextDay = dayStart + 24 * 60 * 60 * 1000;
  const tasks = items
    .filter((t) => t.dueAt >= dayStart && t.dueAt < nextDay)
    .slice(0, 3);
  if (tasks.length === 0) return <div className="events-list" />;
  return (
    <div className="events-list">
      {tasks.map((t) => {
        const d = new Date(t.dueAt);
        const hh = String(d.getHours()).padStart(2, "0");
        const mm = String(d.getMinutes()).padStart(2, "0");
        return (
          <span key={t.id} className="task-pill">
            {hh}:{mm} {t.title}
          </span>
        );
      })}
    </div>
  );
}
