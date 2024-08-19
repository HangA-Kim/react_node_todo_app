import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Box, Grid, Typography, SnackbarCloseReason } from "@mui/material";
import {
  fetchAddTask,
  fetchDeleteTasks,
  fetchFilterTask,
  fetchGetTasks,
  fetchModifyTask,
  FetchParams,
  FetchThunkParams,
} from "../redux/api/thunks";
import ItemCard from "./ItemCard";
import { globalColors } from "../redux/theme/globalColors";
import {
  deleteTask,
  getTasks,
  postTask,
  putTask,
} from "../redux/api/axiosApis";
import {
  DEL_TASK_API_URL,
  GET_TASKS_API_URL,
  POST_ADD_TASK_API_URL,
  POST_STATE_TASKS_API_URL,
  PUT_MODIFY_TASK_API_URL,
} from "../constants/apiUrl";
import { TodoState } from "../redux/api/types";
import ItemLoadingSkeleton from "./ItemLoadingSkeleton";
import CustomAlert from "./CustomAlert";

interface PannelProps {
  title: string;
}
const Pannel = ({ title }: PannelProps) => {
  const authState = useSelector((state: RootState) => state.auth);
  const menu = localStorage.getItem("menu") || "ALL";
  console.log("menu", menu);
  const todos = useSelector((state: RootState) =>
    menu === "ALL" ? state.getTasks : state.filterTask
  );

  const addEvent = useSelector((state: RootState) => state.addTask);
  const modifyEvent = useSelector((state: RootState) => state.modifyTask);
  const deleteEvent = useSelector((state: RootState) => state.deleteTask);
  const dispatch = useDispatch<AppDispatch>();

  /**************** useEffect *******************************/
  useEffect(() => {
    getTask();
  }, [menu]);

  useEffect(() => {
    if (addEvent.error) {
      setToastMsg(addEvent.error);
      return;
    }
    setToastMsg("할일 등록이 완료되었습니다");
    getTask();
  }, [addEvent]);

  useEffect(() => {
    if (modifyEvent.error) {
      setToastMsg(modifyEvent.error);
      return;
    }
    setToastMsg("할일 수정이 완료되었습니다");
    getTask();
  }, [modifyEvent]);

  useEffect(() => {
    if (deleteEvent.error) {
      setToastMsg(deleteEvent.error);
      return;
    }
    setToastMsg("삭제가 완료되었습니다");
    getTask();
  }, [deleteEvent]);

  /**************** API *******************************/
  async function getTask() {
    const taskData = createData();
    if (!taskData) return;
    const fetchParam: FetchThunkParams = {
      fetchParams: {
        url: taskData.url,
        data: taskData.data ? JSON.stringify(taskData.data) : "",
      },
      axiosFunc: taskData.func,
    };
    await dispatch(taskData.fetchFunc(fetchParam));
  }

  async function deleteTodo(todo: TodoState) {
    const fetchParam: FetchThunkParams = {
      fetchParams: {
        url: `${DEL_TASK_API_URL}/${todo?._id}`,
        data: "",
      },
      axiosFunc: deleteTask,
    };
    await dispatch(fetchDeleteTasks(fetchParam));
    setMsg("삭제가 완료되었습니다.");
    setOpen(true);
  }

  async function modifyTask(todo: TodoState, data: string) {
    const fetchParam: FetchThunkParams = {
      fetchParams: {
        url: `${PUT_MODIFY_TASK_API_URL}?taskID=${todo?._id}`,
        data,
      },
      axiosFunc: putTask,
    };
    await dispatch(fetchModifyTask(fetchParam));
    setMsg("할일 수정이 완료되었습니다.");
    setOpen(true);
  }

  async function addTask(data: string) {
    const fetchParam: FetchThunkParams = {
      fetchParams: {
        url: `${POST_ADD_TASK_API_URL}`,
        data,
      },
      axiosFunc: postTask,
    };
    await dispatch(fetchAddTask(fetchParam));
    setMsg("할일 등록이 완료되었습니다.");
    setOpen(true);
  }

  /***********************************************/

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

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function setToastMsg(msg: string) {
    setMsg(msg);
    setOpen(true);
  }
  const expectedItemCount = todos.data.length > 0 ? todos.data.length : 5;
  return (
    <Box>
      <CustomAlert open={open} handleClose={handleClose} message={msg} />
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
            {todos.loading ? (
              // todos의 길이만큼 스켈레톤을 렌더링하거나 기본값으로 5개를 렌더링
              <>
                {[...Array(expectedItemCount)].map((_, idx) => (
                  <Grid key={idx}>
                    <ItemLoadingSkeleton />
                  </Grid>
                ))}
              </>
            ) : (
              todos.data.map((todo, idx) => (
                <Grid key={idx}>
                  <ItemCard
                    todo={todo}
                    deleteTodo={deleteTodo}
                    modifyTask={modifyTask}
                    addTask={addTask}
                  />
                </Grid>
              ))
            )}
            <Grid key="btn">
              <ItemCard
                todo={null}
                deleteTodo={deleteTodo}
                modifyTask={modifyTask}
                addTask={addTask}
              />
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
