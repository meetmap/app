import { createSlice } from "@reduxjs/toolkit";
import { AppColorTheme } from "../../types/other";

interface InitialState {
  theme: AppColorTheme;
}

const initialState: InitialState = {
  theme: "auto",
};

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setTheme: (state, action: { payload: AppColorTheme }) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = appSlice.actions;

export default appSlice.reducer;
