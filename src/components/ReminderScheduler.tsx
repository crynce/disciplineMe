import { useEffect } from "react";
import { useSelector } from "react-redux";

type RootState = {
  tasks: {
    items: Array<{
      id: string;
      title: string;
      dueAt: number;
      remindBeforeMinutes?: number;
      done: boolean;
    }>;
  };
};

function requestNotifyPermission() {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission();
  }
}

export default function ReminderScheduler() {
  const items = useSelector((s: RootState) => s.tasks.items);

  useEffect(() => {
    requestNotifyPermission();
  }, []);

  // naive scheduler: check every 30s
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      for (const t of items) {
        if (t.done) continue;
        const remindMs = (t.remindBeforeMinutes ?? 10) * 60 * 1000;
        const fireAt = t.dueAt - remindMs;
        if (now >= fireAt && now < fireAt + 30000) {
          if (
            "Notification" in window &&
            Notification.permission === "granted"
          ) {
            new Notification("Upcoming task", { body: t.title });
          } else {
            // fallback
            console.log("Reminder:", t.title);
          }
        }
      }
    };
    const id = setInterval(tick, 30000);
    tick();
    return () => clearInterval(id);
  }, [items]);

  return null;
}
