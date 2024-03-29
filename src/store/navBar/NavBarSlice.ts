import { createSlice } from "@reduxjs/toolkit";

interface NavBarState {
  expanded: boolean;
}

const initialState: NavBarState = {
  expanded: false,
};

const navBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    expand: (state) => {
      state.expanded = true;
    },
    minimize: (state) => {
      state.expanded = false;
    },
  },
});

export const { expand, minimize } = navBarSlice.actions;
export default navBarSlice.reducer;
