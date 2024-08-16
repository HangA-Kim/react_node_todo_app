import { Box, Paper, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { darkTheme, lightTheme } from "./redux/theme/theme";
import { globalSize } from "./redux/theme/globalSize";
import LeftSidebar from "./components/LeftSide/LeftSidebar";
import Pannel from "./components/Pannel";
import {
  POST_STATE_TASKS_API_URL,
  GET_TASKS_API_URL,
} from "./constants/apiUrl";

function App() {
  const theme = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    if (theme.darkTheme) {
      document.body.style.backgroundColor =
        darkTheme.palette.background.default;
      document.body.style.color = darkTheme.palette.text.primary || "#ffffff";
    } else {
      document.body.style.backgroundColor =
        lightTheme.palette.background.default;
      document.body.style.color = lightTheme.palette.text.primary || "#000000";
    }
  }, [theme.darkTheme]);

  return (
    <ThemeProvider theme={theme.darkTheme ? darkTheme : lightTheme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Paper className="App" sx={{ display: "flex", minHeight: "100vh" }}>
          <Box sx={{ width: globalSize.drawerWidth, flexShrink: 0 }}>
            <LeftSidebar />
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Pannel title="All Items" />} />
              <Route path="/get_all" element={<Pannel title="All Items" />} />
              <Route
                path="/get_completed"
                element={<Pannel title="Completed" />}
              />
              <Route
                path="/get_incompleted"
                element={<Pannel title="InCompleted" />}
              />
              <Route
                path="/get_important"
                element={<Pannel title="Important" />}
              />
              <Route path="*" element={<div>ERR! 404</div>} />
            </Routes>
          </Box>
        </Paper>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
