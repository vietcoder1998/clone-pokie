import { Visibility, VisibilityOff } from "@mui/icons-material";
import FolderIcon from "@mui/icons-material/Folder";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import BaseList from "../BaseList";

export default function FriendList() {
  const [dense] = React.useState(false);
  const [secondary] = React.useState(false);
  const [dataList] = React.useState([
    {
      avatarUrl: "https://lorempixel.com",
    },
  ]);

  const onShow = () => {
    console.log("show");
  };

  const onHide = () => {
    console.log("show");
  };

  return (
    <BaseList title="Danh sách Comment">
      <List dense={dense}>
        {(dataList ?? []).map((item) => (
          <ListItem
            key={item?.id}
            secondaryAction={
              <Box>
                <IconButton
                  id={item?.id}
                  edge="end"
                  aria-label="show"
                  onClick={onShow}
                >
                  <Visibility color="primary" />
                </IconButton>
                <IconButton
                  id={item?.id}
                  edge="end"
                  aria-label="off"
                  onClick={onHide}
                >
                  <VisibilityOff color="warning" />
                </IconButton>
              </Box>
            }
          >
            <ListItemAvatar>
              <Avatar src={item?.avatarUrl}>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Friend List"
              secondary={secondary ? "Secondary text" : null}
            />
          </ListItem>
        ))}
      </List>
    </BaseList>
  );
}
