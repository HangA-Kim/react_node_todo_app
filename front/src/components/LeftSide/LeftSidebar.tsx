import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import Login from "../Auth/Login";
import { globalSize } from "../../redux/theme/globalSize";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import NotInterestedRoundedIcon from "@mui/icons-material/NotInterestedRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import LogoImg from "../../assets/logo.png";
import { globalColors } from "../../redux/theme/globalColors";
import { Link } from "react-router-dom";
import { useState } from "react";

const LeftSidebar = () => {
  const [currentTab, setCurrentTab] = useState(
    localStorage.getItem("menu") || "ALL"
  );
  const handleSetCurrentTab = (menuName: string) => {
    setCurrentTab(menuName);
    localStorage.setItem("menu", menuName);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: globalSize.drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: globalSize.drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
            padding: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={LogoImg} width={"40px"} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", textAlign: "left", marginLeft: "10px" }}
            >
              TODO
            </Typography>
          </Box>

          {/* flexGrow: 1을 사용해 List가 중간에 균등하게 배치되도록 설정 */}
          <List
            sx={{
              padding: "10px",
              width: "100%",
              flexGrow: 1,
              alignContent: "center",
            }}
          >
            <Menu
              name="ALL"
              currentTab={currentTab}
              path="/get_all"
              setCurrentTab={() => handleSetCurrentTab("ALL")}
              Icon={null}
            />
            <Menu
              name="Completed"
              currentTab={currentTab}
              path="/get_completed"
              setCurrentTab={() => handleSetCurrentTab("Completed")}
              Icon={CheckCircleOutlineRoundedIcon}
            />
            <Menu
              name="InCompleted"
              currentTab={currentTab}
              path="/get_incompleted"
              setCurrentTab={() => handleSetCurrentTab("InCompleted")}
              Icon={NotInterestedRoundedIcon}
            />
            <Menu
              name="Important"
              currentTab={currentTab}
              path="/get_important"
              setCurrentTab={() => handleSetCurrentTab("Important")}
              Icon={ErrorOutlineRoundedIcon}
            />
          </List>
          <Login />
        </Toolbar>
      </Drawer>
    </Box>
  );
};

interface MenuProps {
  name: string;
  currentTab: string;
  path: string;
  setCurrentTab: () => void;
  Icon: React.ElementType | null;
}
const Menu: React.FC<MenuProps> = ({
  name,
  currentTab,
  setCurrentTab,
  Icon,
  path,
}) => {
  return (
    <ListItem
      sx={{
        backgroundColor:
          currentTab === name ? globalColors.blue : "transparent",
        color: currentTab === name ? "white" : globalColors.blue,
        "&:hover": {
          backgroundColor: currentTab === name ? "primary.dark" : "grey.900",
        },
        borderRadius: "8px",
        marginBottom: "8px",
      }}
    >
      <ListItemButton
        component={Link}
        to={path}
        onClick={setCurrentTab}
        sx={{
          color: currentTab === name ? "white" : globalColors.blue,
          "&:hover": {
            backgroundColor: currentTab === name ? "primary.dark" : "grey.900",
          },
        }}
      >
        {Icon ? (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        ) : (
          ""
        )}

        <ListItemText primary={name} sx={{ textAlign: "center" }} />
      </ListItemButton>
      {/* {Icon ? (
        <ListItemIcon>
          <Icon sx={{ color: currentTab === name ? "white" : "inherit" }} />
        </ListItemIcon>
      ) : (
        ""
      )}
      <ListItemText primary={name} /> */}
    </ListItem>
  );
};

export default LeftSidebar;
