import { configureStore } from "@reduxjs/toolkit";
import { themeReducer } from "./slice/themeSlice";
import { authReducer } from "./slice/authSlice";
import {
  addTaskReducer,
  deleteTaskReducer,
  filterTaskReducer,
  getTasksReducer,
  modifyTaskReducer,
} from "./slice/apiSlice";
import { menuReducer } from "./slice/menuSlice";

const store = configureStore({
  reducer: {
    filterTask: filterTaskReducer,
    deleteTask: deleteTaskReducer,
    modifyTask: modifyTaskReducer,
    addTask: addTaskReducer,
    getTasks: getTasksReducer,
    theme: themeReducer,
    auth: authReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
