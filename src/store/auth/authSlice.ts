// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
  role: string;
  id: string;
}

const token = localStorage.getItem("token"); // Retrieve JWT from local storage
const storedRole = localStorage.getItem("role");
const storedId = localStorage.getItem("id");
const initialState: AuthState = {
  loggedIn: !!token, // Set loggedIn to true if token exists
  role: storedRole || "none",
  id: storedId || "0",
};

const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.loggedIn = true;
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
    logout: (state, action: PayloadAction<string>) => {
      state.loggedIn = false;
      localStorage.removeItem("token"); // Clear token from local storage on logout
      localStorage.removeItem("role");
      state.role = action.payload;
    },
    // updateRole: (state, action: PayloadAction<string>) => {
    //   state.role = action.payload;
    //   localStorage.setItem("role", action.payload);
    // },
  },
});

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
