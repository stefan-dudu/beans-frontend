// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
  role: string;
}

const token = localStorage.getItem("token"); // Retrieve JWT from local storage
const storedRole = localStorage.getItem("role");
const initialState: AuthState = {
  loggedIn: !!token, // Set loggedIn to true if token exists
  role: storedRole || "none",
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
      localStorage.removeItem("role");
    },
    updateRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
  },
});

export const { login, logout, updateRole } = counterSlice.actions;
export default counterSlice.reducer;
