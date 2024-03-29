import { Search } from "@mui/icons-material";
import { Box, Input } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import React from "react";
import { drawerWidth } from "./../../const/index";
import MenuBarList from "./components/MenuBarList";

const useStyles = makeStyles((theme) => ({
  list: {
    width: drawerWidth,
  },
}));

export default function Sidebar(props) {
  const classes = useStyles();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        position: "relative",
        borderColor: "#ffffff00",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
        "*::-webkit-scrollbar": {
          width: "0.4em",
          color: "whitesmoke",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0,.1)",
        },
        height: `100vh`,
        overflow: "visible",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <MenuBarList {...{classes, navigateWithSearchBar: () => {}}}/>
    </Drawer>
  );
}
