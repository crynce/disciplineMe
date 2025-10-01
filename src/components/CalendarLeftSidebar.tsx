import { useEffect, useState } from "react";

import MiniCalendar from "./MiniCalendar";
import { useDispatch } from "react-redux";
import { openModalForDate } from "../store/calendar-slice";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import DateTimePicker from "./DateTimePicker";
import { addTask } from "../store/tasks-slice";

type RootState = { calendar: { selectedDate?: number } };

export default function CalendarLeftSidebar() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [remind, setRemind] = useState(10);
  useEffect(() => {
    setRemind(10);
  }, []);
  const dispatch = useDispatch();
  const selectedDate = useSelector((s: RootState) => s.calendar.selectedDate);

  const selectedDateText = useMemo(() => {
    if (!selectedDate) return "No date selected";
    const d = new Date(selectedDate);
    return d.toDateString();
  }, [selectedDate]);
  return (
    <div className="left-sidebar-container">
      <button
        className="general-click  h-[50px] w-3/5 p-2 rounded-3xl border-2 text-center"
        onClick={() =>
          dispatch(openModalForDate(new Date().setHours(0, 0, 0, 0)))
        }
      >
        Create
      </button>
      <div className="mt-4">
        <MiniCalendar />
      </div>
      <div className="mt-6">
        <h4 className="text-sm uppercase tracking-wide text-gray-300 mb-1">
          Quick task
        </h4>
        <p className="text-xs mb-2 text-gray-400">
          Date is picked from the mini calendar: {selectedDateText}
        </p>
      </div>
      <div className="space-y-2">
        <input
          placeholder="Task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="search-input "
        />
        <div className="flex gap-2 items-center">
          <button
            className="today-btn w-full"
            onClick={() => {
              if (!taskTitle) return;
              const base = selectedDate ?? new Date().setHours(0, 0, 0, 0);
              let dueAt = base;
              if (taskTime) {
                const [hh, mm] = taskTime.split(":");
                const d = new Date(base);
                d.setHours(Number(hh || 0), Number(mm || 0), 0, 0);
                dueAt = d.getTime();
              }
              dispatch(
                addTask({
                  title: taskTitle,
                  dueAt,
                  remindBeforeMinutes: remind,
                })
              );
              setTaskTitle("");
              setTaskTime("");
            }}
          >
            Add task
          </button>
        </div>
      </div>
      <DateTimePicker />
      <div className="mt-6">
        <h4 className="text-sm uppercase tracking-wide text-gray-300 mb-2">
          My calendars
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-primary"></span>
            <span>DisciplineMe</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-success"></span>
            <span>Reminders</span>
          </li>
        </ul>
      </div>
      <div className="mt-6">
        <h4 className="text-sm uppercase tracking-wide text-gray-300 mb-2">
          Other calendars
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm bg-warning"></span>
            <span>Holidays</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
