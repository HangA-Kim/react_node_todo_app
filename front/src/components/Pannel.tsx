import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Box, Grid, Typography } from "@mui/material";
import {
  fetchFilterTask,
  fetchGetTasks,
  FetchParams,
  FetchThunkParams,
} from "../redux/api/thunks";
import ItemCard from "./ItemCard";
import { globalColors } from "../redux/theme/globalColors";
import { getTasks, postTask } from "../redux/api/axiosApis";
import {
  GET_TASKS_API_URL,
  POST_STATE_TASKS_API_URL,
} from "../constants/apiUrl";
import { TodoState } from "../redux/api/types";
import ItemLoadingSkeleton from "./ItemLoadingSkeleton";

interface PannelProps {
  title: string;
}
const Pannel = ({ title }: PannelProps) => {
  const authState = useSelector((state: RootState) => state.auth);
  const getTaskTodos = useSelector((state: RootState) => state.getTasks);
  const addEvent = useSelector((state: RootState) => state.addTask);
  const modifyEvent = useSelector((state: RootState) => state.modifyTask);
  const deleteEvent = useSelector((state: RootState) => state.deleteTask);
  const filterTodos = useSelector((state: RootState) => state.filterTask);
  const menu = localStorage.getItem("menu");
  const dispatch = useDispatch<AppDispatch>();

  const [todos, setTodos] = useState<TodoState[]>([]);
  const [isLoading, setLoading] = useState(true);

  // refreshData();
  useEffect(() => {
    // dispatch(fetchGetTasks(`${GET_TASKS_API_URL}/${authState?.authData?.sub}`));
    refreshData();
  }, [addEvent, modifyEvent, deleteEvent]);

  useEffect(() => {
    setLoading(getTaskTodos.loading);
    setTodos(filterTodos.data);
  }, [filterTodos]);

  useEffect(() => {
    setLoading(getTaskTodos.loading);
    setTodos(getTaskTodos.data);
  }, [getTaskTodos]);

  useEffect(() => {
    setLoading(true);
    setTodos([]);
    refreshData();
  }, [title]);

  function refreshData() {
    const taskData = createData();
    if (!taskData) return;
    const fetchParam: FetchThunkParams = {
      fetchParams: {
        url: taskData.url,
        data: taskData.data ? JSON.stringify(taskData.data) : "",
      },
      axiosFunc: taskData.func,
    };
    dispatch(taskData.fetchFunc(fetchParam));
  }
  interface taskAxiosData {
    url: string;
    data: {} | null;
    func<T>(FetchParams: FetchParams): Promise<T>;
    fetchFunc: Function;
  }

  function createPostData(userId: string): taskAxiosData {
    return {
      url: `${POST_STATE_TASKS_API_URL}/${userId}`,
      data: null,
      func: postTask,
      fetchFunc: fetchFilterTask,
    };
  }

  function createData(): taskAxiosData | null {
    const userId = authState?.authData?.sub;
    if (!userId) return null;
    switch (menu) {
      case "ALL":
        return {
          url: `${GET_TASKS_API_URL}/${userId}`,
          data: null,
          func: getTasks,
          fetchFunc: fetchGetTasks,
        };
      case "Completed":
        const completedData = createPostData(userId);
        completedData.data = { isCompleted: true };
        return completedData;
      case "Important":
        const importantData = createPostData(userId);
        importantData.data = { isImportant: true };
        return importantData;
      case "InCompleted":
        const inCompletedData = createPostData(userId);
        inCompletedData.data = { isCompleted: false };
        return inCompletedData;
      default:
        return null;
    }
  }

  const expectedItemCount = todos.length > 0 ? todos.length : 5;
  return (
    <Box>
      {authState.token ? (
        <Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            bgcolor={globalColors.Black}
          >
            <Typography variant="h5" fontWeight={"bold"} margin={"20px"}>
              {title}
            </Typography>
          </Box>
          <Grid container padding={"3px"}>
            {isLoading ? (
              // todos의 길이만큼 스켈레톤을 렌더링하거나 기본값으로 5개를 렌더링
              <>
                {[...Array(expectedItemCount)].map((_, idx) => (
                  <Grid key={idx}>
                    <ItemLoadingSkeleton />
                  </Grid>
                ))}
              </>
            ) : (
              todos.map((todo, idx) => (
                <Grid key={idx}>
                  <ItemCard todo={todo} />
                </Grid>
              ))
            )}
            {/* {todos.map((todo, idx) => (
              <Grid key={idx}>
                <ItemCard todo={todo} />
              </Grid>
            ))} */}
            <Grid key="btn">
              <ItemCard todo={null} />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography variant="h5" fontWeight={"bold"} margin={"20px"}>
          로그인이 필요합니다.
        </Typography>
      )}
    </Box>
  );
};

export default Pannel;
