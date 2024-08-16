import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { globalColors } from "../../redux/theme/globalColors";
import { Link } from "react-router-dom";
import { SvgIconComponent } from "@mui/icons-material";

interface MenusProps {
  name: string;
  currentTab: string;
  path: string;
  setCurrentTab(name: string): void;
  Icon: SvgIconComponent | null;
}
const Menu = ({ name, currentTab, path, setCurrentTab, Icon }: MenusProps) => {
  return (
    <ListItem
      key={name}
      disablePadding
      sx={{
        background: currentTab === name ? globalColors.blue : "",
        borderRadius: "3px",
      }}
    >
      <ListItemButton
        component={Link}
        to={path}
        onClick={() => setCurrentTab(name)}
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
    </ListItem>
  );
};

export default Menu;
