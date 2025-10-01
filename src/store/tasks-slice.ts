import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

export type TaskItem = {
  id: string;
  title: string;
  note?: string;
  dueAt: number; // epoch ms
  remindBeforeMinutes?: number; // e.g., 10 = remind 10 minutes before
  createdAt: number;
  done: boolean;
};

export type TasksState = {
  items: TaskItem[];
};

const STORAGE_KEY = "dm_tasks_v1";

function loadFromStorage(): TasksState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as TasksState;
    if (!Array.isArray(parsed.items)) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

const initialState: TasksState = loadFromStorage() ?? { items: [] };

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      prepare(input: Omit<TaskItem, "id" | "createdAt" | "done">) {
        return {
          payload: {
            id: nanoid(),
            title: input.title,
            note: input.note,
            dueAt: input.dueAt,
            remindBeforeMinutes: input.remindBeforeMinutes,
            createdAt: Date.now(),
            done: false,
          } as TaskItem,
        } as const;
      },
      reducer(state, action: PayloadAction<TaskItem>) {
        state.items.push(action.payload);
      },
    },
    toggleDone(state, action: PayloadAction<string>) {
      const t = state.items.find((i) => i.id === action.payload);
      if (t) t.done = !t.done;
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateTask(
      state,
      action: PayloadAction<Partial<TaskItem> & { id: string }>
    ) {
      const t = state.items.find((i) => i.id === action.payload.id);
      if (t) Object.assign(t, action.payload);
    },
    replaceAll(state, action: PayloadAction<TasksState>) {
      state.items = action.payload.items;
    },
  },
});

export const { addTask, toggleDone, deleteTask, updateTask, replaceAll } =
  tasksSlice.actions;
export default tasksSlice.reducer;
