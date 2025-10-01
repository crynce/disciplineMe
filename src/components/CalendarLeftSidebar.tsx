import MiniCalendar from "./MiniCalendar";
import { useDispatch } from "react-redux";
import { openModalForDate } from "../store/calendar-slice";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import DateTimePicker from "./DateTimePicker";

type RootState = { calendar: { selectedDate?: number } };

export default function CalendarLeftSidebar() {
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
