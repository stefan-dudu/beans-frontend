import { createSlice } from "@reduxjs/toolkit";

interface NavBarState {
  expanded: boolean;
  loadingData: boolean;
}

const initialState: NavBarState = {
  expanded: false,
  loadingData: false,
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
    isLoading: (state) => {
      state.loadingData = true;
    },
    notLoading: (state) => {
      state.loadingData = false;
    },
  },
});

export const { expand, minimize, isLoading, notLoading } = navBarSlice.actions;
export default navBarSlice.reducer;
