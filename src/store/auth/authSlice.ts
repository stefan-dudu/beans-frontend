// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
}

const token = localStorage.getItem("token"); // Retrieve JWT from local storage
const initialState: AuthState = {
  loggedIn: !!token, // Set loggedIn to true if token exists
};

const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      localStorage.removeItem("token"); // Clear token from local storage on logout
    },
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
