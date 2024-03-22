import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
