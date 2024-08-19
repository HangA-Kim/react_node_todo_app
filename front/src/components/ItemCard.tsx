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
  Stack,
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

export const CustomCard = styled(Card)<CardProps>(() => ({
  width: "380px",
  height: "230px",
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
  deleteTodo(todo: TodoState): Promise<void>;
  modifyTask(todo: TodoState, data: string): Promise<void>;
  addTask(data: string): Promise<void>;
}
const ItemCard = ({ todo, deleteTodo, modifyTask, addTask }: ItemCardProps) => {
  // console.log(todo);
  const [dlgOpen, setDlgOpen] = React.useState(false);
  const handleClickDlg = (isOpen: boolean) => {
    setDlgOpen(isOpen);
  };

  const [viewDlgOpen, setViewDlgOpen] = React.useState(false);
  const handleViewClickDlg = (isOpen: boolean) => {
    setViewDlgOpen(isOpen);
  };

  const handleCompletedChange = () => {
    console.log("handleCompletedChange");
    if (todo === null) return;
    modifyTask(todo, JSON.stringify({ isCompleted: !todo?.iscompleted }));
  };

  const handleImpotantChange = () => {
    console.log("handleImpotantChange");
    if (todo === null) return;
    modifyTask(todo, JSON.stringify({ isImportant: !todo?.isimportant }));
  };

  return (
    <div>
      <InputTodo
        open={dlgOpen}
        handleClickDlg={handleClickDlg}
        todo={todo}
        addTask={addTask}
        modifyTask={modifyTask}
      />
      <ViewTodo
        open={viewDlgOpen}
        handleClickDlg={handleViewClickDlg}
        todo={todo}
      />
      {todo ? (
        <CustomCard>
          <CardContent sx={{ height: "100%", padding: 0 }}>
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}
              height={"100%"}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                onClick={(e) => {
                  setViewDlgOpen(true);
                }}
                sx={{
                  borderBottom: `1px solid ${globalColors.grey[300]}`,
                  width: "100%",
                  paddingBottom: "10px",
                  paddingTop: "10px",
                }}
              >
                {todo.title}
              </Typography>
              <Box
                sx={{
                  margin: 0, // 필요시 margin 제거
                  padding: 0, // 필요시 padding 제거
                  alignContent: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{
                    whiteSpace: "pre-line",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                    maxHeight: "3.6em",
                    lineHeight: 1.2,
                    margin: 0, // 필요시 margin 제거
                    padding: 0, // 필요시 padding 제거
                  }}
                >
                  {todo.description}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ width: "100%", textAlign: "left", paddingLeft: "50px" }}
              >
                {todo.date}
              </Typography>
            </Stack>
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
                onClick={(e) => deleteTodo(todo)}
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
