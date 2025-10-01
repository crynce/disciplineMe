import { useState } from "react";
import { useSelector } from "react-redux";
import { addTask } from "../store/tasks-slice";
type RootState = { calendar: { selectedDate?: number } };

export default function DateTimePicker() {
  const selectedDate = useSelector((s: RootState) => s.calendar.selectedDate);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [remind, setRemind] = useState(10);
  return (
    <div className="space-y-2">
      <input
        placeholder="Task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        className="search-input "
      />
      <div className="flex gap-2 items-center">
        <input
          type="time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
          className="search-input"
          style={{ width: 150 }}
        />
        <input
          type="number"
          min={0}
          step={5}
          value={remind}
          onChange={(e) => setRemind(Number(e.target.value))}
          className="search-input"
          placeholder="Remind min"
          style={{ width: 110 }}
        />
      </div>
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
  );
}
