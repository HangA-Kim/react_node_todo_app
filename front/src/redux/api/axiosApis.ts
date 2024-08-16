import axios from "axios";
import { FetchParams } from "./thunks";

export const getTasks = async <T>(params: FetchParams): Promise<T> => {
  console.log("getTasks [", params.url, "]");
  const response = await axios.get(params.url);
  console.log(response);
  return response.data;
};

export const postTask = async (params: FetchParams) => {
  console.log("postTask", params.data);
  const response = await axios.post(params.url, params.data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
  console.log(response);
  return response.data;
};

export const putTask = async (params: FetchParams) => {
  console.log("putTask", params.data);
  const response = await axios.put(params.url, params.data, {
    headers: {
      "Content-Type": `application/json`,
    },
  });
  console.log(response);
  return response.data;
};

export const deleteTask = async <T>(params: FetchParams): Promise<T> => {
  console.log("deleteTask [", params.url, "]");
  const response = await axios.delete(params.url);
  console.log(response);
  return response.data;
};
