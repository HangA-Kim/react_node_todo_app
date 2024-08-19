import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TodoState } from "../redux/api/types";

export interface InputTodoProps {
  open: boolean;
  handleClickDlg(isOpen: boolean): void;
  todo: TodoState | null;
  modifyTask(todo: TodoState, data: string): Promise<void>;
  addTask(data: string): Promise<void>;
}
const InputTodo = ({
  open,
  handleClickDlg,
  todo,
  modifyTask,
  addTask,
}: InputTodoProps) => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    todo ? dayjs(todo.date) : dayjs(new Date())
  );

  const [state, setState] = React.useState({
    isCompleted: todo ? todo.iscompleted : false,
    isImportant: todo ? todo.isimportant : false,
  });

  const authState = useSelector((state: RootState) => state.auth);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleAddTask = async (formData: FormData) => {
    const formJson = createParam(formData);
    formJson.userId = authState.authData?.sub;
    addTask(JSON.stringify(formJson));
  };

  const handleModifyTask = async (formData: FormData) => {
    const formJson = createParam(formData);
    if (todo === null) return;
    modifyTask(todo, JSON.stringify(formJson));
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
