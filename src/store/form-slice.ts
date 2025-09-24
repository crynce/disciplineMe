import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "formSlice",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    getFormData(state, action) {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});

export const { getFormData } = formSlice.actions;
export default formSlice.reducer;
