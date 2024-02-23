import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { allPages, pageList } from "../../constants/pages";
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const navigate = useNavigate();
  const [state, setState] = useState(false);

  const handleDrawerOpen = () => {
    setState(true);
  };
  const toggleDrawer = () => {
    setState((state) => !state);
  };

  const onListItemClickHandler = (url) => {
    navigate(url);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Welcome to Diversphare
        </Typography>
        <Button
          color="inherit"
          sx={{ marginLeft: "auto", marginTop: "3px", fontSize: "18px" }}
          onClick={() => onListItemClickHandler(allPages.LOGIN)}
        >
          Login
        </Button>
      </Toolbar>
      <Drawer anchor={"left"} open={state} onClose={toggleDrawer}>
        {list("left", toggleDrawer, onListItemClickHandler)}
      </Drawer>
    </AppBar>
  );
}

const list = (anchor, toggleDrawer, onListItemClickHandler) => (
  <Box
    sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
    role="presentation"
    onClick={toggleDrawer}
    onKeyDown={toggleDrawer}
  >
    <List>
      {pageList.map(({ label, url, icon }) => (
        <ListItem
          key={label}
          disablePadding
          onClick={() => onListItemClickHandler(url)}
        >
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
  </Box>
);
