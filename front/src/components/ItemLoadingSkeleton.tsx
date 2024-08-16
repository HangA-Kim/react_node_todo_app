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
  Skeleton,
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
  loading: boolean;
}
const ItemLoadingSkeleton = () => {
  return (
    <div>
      <CustomCard>
        <CardContent>
          <Skeleton animation="wave" />

          <Divider />
          <Box
            sx={{
              display: "flex",
              alignItems: "center", // 세로 가운데 정렬
              justifyContent: "center",
              height: "100%", // 부모 컨테이너의 전체 높이 사용
            }}
          >
            <Skeleton width={"100%"} height={"80px"} animation="wave" />
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
          <Skeleton width={"50%"} height={"50px"} animation="wave" />
          <Skeleton width={"20%"} height={"50px"} animation="wave" />
        </CardActions>
      </CustomCard>
    </div>
  );
};

export default ItemLoadingSkeleton;
