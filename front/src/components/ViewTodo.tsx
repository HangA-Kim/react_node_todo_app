import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Divider, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import NotInterestedRoundedIcon from "@mui/icons-material/NotInterestedRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { globalColors } from "../redux/theme/globalColors";
import { InputTodoProps } from "./InputTodo";

const ViewTodo = ({ open, handleClickDlg, todo }: InputTodoProps) => {
  return (
    <Dialog open={open} onClose={(e) => handleClickDlg(false)} fullWidth>
      <DialogTitle>{todo?.title}</DialogTitle>
      <Divider />
      <DialogContent>
        <Typography
          variant="subtitle1"
          marginTop={"20px"}
          border={1}
          padding={"20px"}
          borderColor={globalColors.grey[200]}
          borderRadius={"10px"}
          style={{ whiteSpace: "pre-line" }}
        >
          {todo?.description}
        </Typography>
        <Typography variant="subtitle1" textAlign={"end"} marginTop={"20px"}>
          {todo?.date}
        </Typography>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          sx={{ padding: "10px" }}
        >
          {todo?.iscompleted ? (
            <Box display={"flex"} color={globalColors.blue}>
              <CheckCircleOutlineRoundedIcon />
              <Typography marginLeft={"5px"}>completed!!</Typography>
            </Box>
          ) : (
            <Box display={"flex"} color={"red"}>
              <NotInterestedRoundedIcon />
              <Typography marginLeft={"5px"}>in completed~</Typography>
            </Box>
          )}
          {todo?.isimportant ? (
            <Box display={"flex"} color={"yellow"}>
              <ErrorOutlineRoundedIcon />
              <Typography marginLeft={"5px"}>important!!</Typography>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ marginBottom: "20px", marginRight: "20px" }}>
        <Button onClick={(e) => handleClickDlg(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewTodo;
