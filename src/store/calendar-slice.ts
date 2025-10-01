import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type CalendarEvent = {
  id: string;
  title: string;
  start: number; // epoch ms
  end?: number; // optional end time
  color?: string;
};

export type CalendarState = {
  year: number;
  month: number; // 0-11
  selectedDate?: number; // epoch ms (midnight)
  eventsByDay: Record<string, CalendarEvent[]>; // key: yyyy-mm-dd
  isModalOpen: boolean;
  modalDate?: number; // epoch ms for which date modal is opened
};

const today = new Date();
const initialState: CalendarState = {
  year: today.getFullYear(),
  month: today.getMonth(),
  selectedDate: new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime(),
  eventsByDay: {},
  isModalOpen: false,
  modalDate: undefined,
};

function keyFor(dateMs: number): string {
  const d = new Date(dateMs);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    goPrevMonth(state) {
      if (state.month === 0) {
        state.month = 11;
        state.year -= 1;
      } else {
        state.month -= 1;
      }
    },
    goNextMonth(state) {
      if (state.month === 11) {
        state.month = 0;
        state.year += 1;
      } else {
        state.month += 1;
      }
    },
    goToday(state) {
      const t = new Date();
      state.year = t.getFullYear();
      state.month = t.getMonth();
      state.selectedDate = new Date(
        t.getFullYear(),
        t.getMonth(),
        t.getDate()
      ).getTime();
    },
    selectDate(state, action: PayloadAction<number>) {
      state.selectedDate = action.payload;
    },
    openModalForDate(state, action: PayloadAction<number>) {
      state.isModalOpen = true;
      state.modalDate = action.payload;
    },
    closeModal(state) {
      state.isModalOpen = false;
      state.modalDate = undefined;
    },
    addEvent(state, action: PayloadAction<Omit<CalendarEvent, "id">>) {
      const id = Math.random().toString(36).slice(2);
      const event: CalendarEvent = { id, ...action.payload };
      const dKey = keyFor(action.payload.start);
      if (!state.eventsByDay[dKey]) state.eventsByDay[dKey] = [];
      state.eventsByDay[dKey].push(event);
    },
  },
});

export const {
  goPrevMonth,
  goNextMonth,
  goToday,
  selectDate,
  openModalForDate,
  closeModal,
  addEvent,
} = calendarSlice.actions;

export default calendarSlice.reducer;
