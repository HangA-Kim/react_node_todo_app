// src/features/api/slices.ts
import {
  createAsyncThunk,
  createSlice,
  Draft,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  fetchAddTask,
  fetchDeleteTasks,
  fetchFilterTask,
  fetchGetTasks,
  fetchModifyTask,
  FetchThunkParams,
} from "../api/thunks";
import { TodoState } from "../api/types";

interface ApiState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

function createInitState<T>(): ApiState<T> {
  return {
    data: [],
    loading: false,
    error: null,
  };
}

function createGenericSlice<T>(
  name: string,
  asyncThunk: ReturnType<typeof createAsyncThunk<T[], FetchThunkParams>>
) {
  return createSlice({
    name,
    initialState: createInitState<T>(),
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(asyncThunk.pending, (state) => {
          state.loading = true;
        })
        .addCase(asyncThunk.fulfilled, (state, action: PayloadAction<T[]>) => {
          state.loading = false;
          // 상태를 직접 변경하지 않고 데이터를 푸시
          state.data = action.payload as Draft<T[]>;
        })
        .addCase(asyncThunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || `Failed to fetch ${name}`;
        });
    },
  });
}

export const getTasksReducer = createGenericSlice<TodoState>(
  "getTasks",
  fetchGetTasks
).reducer;

export const addTaskReducer = createGenericSlice<TodoState>(
  "addTask",
  fetchAddTask
).reducer;

export const modifyTaskReducer = createGenericSlice<TodoState>(
  "modifyTask",
  fetchModifyTask
).reducer;

export const deleteTaskReducer = createGenericSlice<TodoState>(
  "deleteTask",
  fetchDeleteTasks
).reducer;

export const filterTaskReducer = createGenericSlice<TodoState>(
  "filterTask",
  fetchFilterTask
).reducer;
