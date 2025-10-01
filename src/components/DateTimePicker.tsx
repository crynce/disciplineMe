import { useState } from "react";

// type RootState = { calendar: { selectedDate?: number } };

export default function DateTimePicker() {
  const [taskTime, setTaskTime] = useState("");
  const [remind, setRemind] = useState(10);
  return (
    <>
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
    </>
  );
}
