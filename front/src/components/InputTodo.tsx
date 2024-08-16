import * as React from "react";
import Button from "@mui/material/Button";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchAddTask,
  fetchModifyTask,
  FetchThunkParams,
} from "../redux/api/thunks";
import { TodoState } from "../redux/api/types";
import {
  POST_ADD_TASK_API_URL,
  PUT_MODIFY_TASK_API_URL,
} from "../constants/apiUrl";
import { postTask, putTask } from "../redux/api/axiosApis";

export interface InputTodoProps {
  open: boolean;
  handleClickDlg(isOpen: boolean): void;
  todo: TodoState | null;
}
const InputTodo = ({ open, handleClickDlg, todo }: InputTodoProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    todo ? dayjs(todo.date) : dayjs(new Date())
  );

  const [state, setState] = React.useState({
    isCompleted: todo ? todo.iscompleted : false,
    isImportant: todo ? todo.isimportant : false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleAddTask = (formData: FormData) => {
    const formJson = createParam(formData);
    formJson.userId = authState.authData?.sub;
    const fetchParam: FetchThunkParams = {
      fetchParams: {
        url: `${POST_ADD_TASK_API_URL}`,
        data: JSON.stringify(formJson),
      },
      axiosFunc: postTask,
    };
    dispatch(fetchAddTask(fetchParam));
    // dispatch(fetchAddTask(JSON.stringify(formJson)));
    console.log(formJson);
  };

  const handleModifyTask = (formData: FormData) => {
    const formJson = createParam(formData);
    const fetchParam: FetchThunkParams = {
      fetchParams: {
        url: `${PUT_MODIFY_TASK_API_URL}?taskID=${todo?._id}`,
        data: JSON.stringify(formJson),
      },
      axiosFunc: putTask,
    };
    dispatch(fetchModifyTask(fetchParam));
    // dispatch(fetchAddTask(JSON.stringify(formJson)));
    console.log(formJson);
  };

  function createParam(formData: FormData) {
    const formJson = Object.fromEntries((formData as any).entries());
    formJson.isCompleted = state.isCompleted;
    formJson.isImportant = state.isImportant;
    return formJson;
  }

  return (
    <Dialog
      open={open}
      onClose={(e) => handleClickDlg(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          todo
            ? handleModifyTask(new FormData(event.currentTarget))
            : handleAddTask(new FormData(event.currentTarget));
          handleClickDlg(false);
        },
      }}
    >
      <DialogTitle>{todo ? "Modify Todo" : "Create Todo"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name="title"
          label="input title"
          type="text"
          fullWidth
          defaultValue={todo ? todo.title : ""}
          sx={{ marginBottom: "20px" }}
        />
        <TextField
          name="description"
          label="description"
          required
          multiline
          rows={4}
          fullWidth
          defaultValue={todo ? todo.description : ""}
          sx={{ marginBottom: "20px" }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              name="date"
              label="date"
              defaultValue={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              format="YYYY-MM-DD"
              sx={{ width: "100%" }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ padding: "20px" }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={state.isCompleted}
                onChange={handleChange}
                name="isCompleted"
              />
            }
            label="isCompleted"
          />
          <FormControlLabel
            control={
              <Switch
                checked={state.isImportant}
                onChange={handleChange}
                name="isImportant"
              />
            }
            label="isImportant"
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ marginBottom: "20px", marginRight: "20px" }}>
        <Button sx={{ bgcolor: "grey" }} onClick={(e) => handleClickDlg(false)}>
          Cancel
        </Button>
        <Button type="submit">OK</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InputTodo;
