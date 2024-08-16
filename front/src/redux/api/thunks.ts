// src/features/thunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TodoState } from "./types";

function createFetchThunk<T>(typePrefix: string) {
  return createAsyncThunk<T[], FetchThunkParams>(
    typePrefix,
    async (fetchParam: FetchThunkParams) => {
      return fetchParam.axiosFunc(fetchParam.fetchParams);
    }
  );
}

export interface FetchParams {
  url: string;
  data: string;
}

export interface FetchThunkParams {
  fetchParams: FetchParams;
  axiosFunc<T>(FetchParams: FetchParams): Promise<T>;
}

// 변수 : FetchThunkParams
export const fetchGetTasks = createFetchThunk<TodoState>("api/fetchGetTasks");
export const fetchAddTask = createFetchThunk<TodoState>("api/fetchAddTask");
export const fetchModifyTask = createFetchThunk<TodoState>(
  "api/fetchModifyTask"
);
export const fetchDeleteTasks = createFetchThunk<TodoState>(
  "api/fetchDeleteTask"
);
export const fetchFilterTask = createFetchThunk<TodoState>(
  "api/fetchFilterTask"
);
