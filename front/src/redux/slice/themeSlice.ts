import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  darkTheme: boolean;
}

const initialState: ThemeState = { darkTheme: true };

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      console.log("toggleTheme call");
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
