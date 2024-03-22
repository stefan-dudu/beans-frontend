import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loggedIn: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
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
    },
  },
  // TODO: to learn these
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(incrementAsync.pending, () => {
  //         console.log("incrementAsync.pending");
  //       })
  //       .addCase(
  //         incrementAsync.fulfilled,
  //         (state, action: PayloadAction<number>) => {
  //           state.value += action.payload;
  //         }
  //       );
  //   },
});

// export const incrementAsync = createAsyncThunk(
//   "counter/incrementAsync",
//   async (amount: number) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//     return amount;
//   }
// );

export const { login, logout } = counterSlice.actions;
export default counterSlice.reducer;
