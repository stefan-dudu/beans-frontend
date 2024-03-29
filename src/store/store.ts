import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import authReducer from "./auth/authSlice";
import navBarReducer from "./navBar/NavBarSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    navBar: navBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
