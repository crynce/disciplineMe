import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./form-slice";
import calendarReducer from "./calendar-slice";
import tasksReducer from "./tasks-slice";
const store = configureStore({
  reducer: {
    form: formReducer,
    calendar: calendarReducer,
    tasks: tasksReducer,
  },
});

export default store;
