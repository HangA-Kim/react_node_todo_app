import * as React from "react";
import {
  Card,
  CardProps,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import { TodoState } from "../redux/api/types";
import { globalColors } from "../redux/theme/globalColors";
import styled from "@emotion/styled";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import InputTodo from "./InputTodo";
import AddIcon from "@mui/icons-material/Add";
import ViewTodo from "./ViewTodo";
import {
  fetchDeleteTasks,
  fetchModifyTask,
  FetchThunkParams,
} from "../redux/api/thunks";
import { DEL_TASK_API_URL, PUT_MODIFY_TASK_API_URL } from "../constants/apiUrl";
import { deleteTask, putTask } from "../redux/api/axiosApis";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export const CustomCard = styled(Card)<CardProps>(() => ({
  width: "380px",
  height: "200px",
  border: "1px solid",
  borderRadius: "5px",
  borderColor: globalColors.grey[200],
  margin: "10px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column" as const,
  background: globalColors.Black,
}));

interface ItemCardProps {
  todo: TodoState | null;
}
const ItemCard = ({ todo }: ItemCardProps) => {
  // console.log(todo);
  const [dlgOpen, setDlgOpen] = React.useState(false);
  const handleClickDlg = (isOpen: boolean) => {
    setDlgOpen(isOpen);
  };

  const [viewDlgOpen, setViewDlgOpen] = React.useState(false);
  const handleViewClickDlg = (isOpen: boolean) => {
    setViewDlgOpen(isOpen);
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleAddTask = () => {
    const fetchParam: FetchThunkParams = {
      fetchParams: {
        url: `${DEL_TASK_API_URL}/${todo?._id}`,
        data: "",
      },
      axiosFunc: deleteTask,
    };
    dispatch(fetchDeleteTasks(fetchParam));
  };

  const handleCompletedChange = () => {
    console.log("handleCompletedChange");
    modifyTodo(JSON.stringify({ isCompleted: !todo?.iscompleted }));
  };

  const handleImpotantChange = () => {
    console.log("handleImpotantChange");
    modifyTodo(JSON.stringify({ isImportant: !todo?.isimportant }));
  };

  function modifyTodo(data: string) {
    const fetchParam: FetchThunkParams = {
      fetchParams: {
        url: `${PUT_MODIFY_TASK_API_URL}?taskID=${todo?._id}`,
        data,
      },
      axiosFunc: putTask,
    };
    dispatch(fetchModifyTask(fetchParam));
  }

  return (
    <div>
      <InputTodo open={dlgOpen} handleClickDlg={handleClickDlg} todo={todo} />
      <ViewTodo
        open={viewDlgOpen}
        handleClickDlg={handleViewClickDlg}
        todo={todo}
      />
      {todo ? (
        <CustomCard>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              onClick={(e) => {
                setViewDlgOpen(true);
              }}
            >
              {todo.title}
            </Typography>
            <Divider />
            <Box
              sx={{
                display: "flex",
                alignItems: "center", // 세로 가운데 정렬
                justifyContent: "center",
                height: "100%", // 부모 컨테이너의 전체 높이 사용
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                style={{
                  whiteSpace: "pre-line",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  WebkitLineClamp: 3,
                }}
              >
                {todo.description}
              </Typography>
            </Box>
          </CardContent>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "5px",
              marginRight: "5px",
              marginBottom: "5px",
            }}
          >
            <Box>
              <IconButton onClick={handleCompletedChange}>
                <Chip
                  icon={<CheckCircleOutlineRoundedIcon />}
                  label="isCompleted"
                  color={todo.iscompleted ? "error" : undefined}
                  variant={todo.iscompleted ? "filled" : "outlined"}
                  size="small"
                />
              </IconButton>
              <IconButton onClick={handleImpotantChange}>
                <Chip
                  icon={<ErrorOutlineRoundedIcon />}
                  label="isImportant"
                  color={todo.isimportant ? "warning" : undefined}
                  variant={todo.isimportant ? "filled" : "outlined"}
                  size="small"
                  sx={{ marginLeft: "5px" }}
                />
              </IconButton>
            </Box>
            {/* {todo.iscompleted ? (
              <Box display={"flex"} color={globalColors.blue}>
                <CheckCircleOutlineRoundedIcon />
                completed
              </Box>
            ) : (
              ""
            )}
            {todo.isimportant ? (
              <Box display={"flex"} color={"yellow"}>
                <ErrorOutlineRoundedIcon />
                important
              </Box>
            ) : (
              ""
            )} */}
            <Box>
              <IconButton
                color="primary"
                size="small"
                sx={{ border: 1, marginRight: "10px" }}
                onClick={(e) => handleClickDlg(true)}
              >
                <EditNoteRoundedIcon />
              </IconButton>
              <IconButton
                color="error"
                size="small"
                sx={{ border: 1 }}
                onClick={(e) => handleAddTask()}
              >
                <ClearRoundedIcon />
              </IconButton>
            </Box>
          </CardActions>
        </CustomCard>
      ) : (
        <CustomCard>
          <Button
            variant="text"
            endIcon={<AddIcon />}
            sx={{ width: "100%", height: "100%" }}
            onClick={(e) => handleClickDlg(true)}
          >
            Add Item
          </Button>
        </CustomCard>
      )}
    </div>
  );
};

export default ItemCard;
