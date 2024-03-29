import { Edit, Home, Search } from "@mui/icons-material";
import { Input } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import { drawerWidth } from "../../const/index";
import useCopy from "../../hooks/useCopy";

const useStyles = makeStyles((theme) => ({
  list: {
    maxWidth: drawerWidth,
    overflowX: "hidden",
  },
}));

export default function WebBar(props) {
  const classes = useStyles();
  const { data, openDrawer } = props;
  const [sideBar, setSidebar] = React.useState([
    { id: "sidebar", name: "Trang chủ", icon: <Home />, link: "/" },
    { id: "sidebar", name: "Create", icon: <Edit />, link: "/" },
  ]);
  const { onCopy } = useCopy();
  const [keyword, setKeyword] = React.useState("");

  const filterData = React.useMemo(() => {
    if (!keyword) {
      return sideBar;
    }

    return sideBar.filter((item) =>
      String(item?.name?.toLowerCase())?.includes(
        String(keyword?.toLowerCase())
      )
    );
  }, [sideBar, keyword]);

  const onSearch = React.useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  const navigate = useRouter();
  const list = React.useMemo(
    () => (
      <Box className={classes.list} role="presentation">
        <List>
          <ListItem>
            <ListItemIcon>
              <Search />
            </ListItemIcon>
            <Input placeholder="Search content..." onChange={onSearch} />
          </ListItem>
          {/* Add your sidebar items here */}
          {filterData &&
            filterData?.map((item, key) => (
              <ListItem
                key={["side_bar", item.key].join("_")}
                button
                id={item.key}
                onClick={() => navigate.push(item?.link)}
              >
                <ListItemIcon>{item?.icon}</ListItemIcon>
                <ListItemText primary={item?.name} />
              </ListItem>
            ))}
        </List>
      </Box>
    ),
    [classes.list, onSearch, filterData, onCopy]
  );
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
        borderRight: "none",
        px: 1,
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        overflowX: "hidden",
      }}
      variant="persistent"
      anchor="left"
      open={openDrawer}
    >
      {list}
    </Drawer>
  );
}
