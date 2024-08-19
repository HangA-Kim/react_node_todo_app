import { Alert, Snackbar } from "@mui/material";

interface CustomAlertProps {
  message: string;
  open: boolean;
  handleClose(): void;
}
const CustomAlert = ({ message, open, handleClose }: CustomAlertProps) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
