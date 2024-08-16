import { createSlice } from "@reduxjs/toolkit";

interface MenuState {
  menuName: string;
  appbarName: string;
}

const initialState: MenuState = { menuName: "ALL", appbarName: "All Items" };

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, actions) => {
      state.menuName = actions.payload;
    },
    setAppbar: (state, actions) => {
      console.log("setAppbar call.", actions.payload);
      state.appbarName = actions.payload;
    },
  },
});

export const { setMenu, setAppbar } = menuSlice.actions;
export const menuReducer = menuSlice.reducer;
