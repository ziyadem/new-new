import { createSlice, configureStore } from "@reduxjs/toolkit";

const Main = createSlice({
  name: "Main",
  initialState: {
    username: "",
    password: "",
    showPassword: false,
  },
  reducers: {
    main: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export const store = configureStore({
  reducer: {
    main: Main.reducer,
  },
});

export const { main } = Main.actions;
