import { Search } from "@mui/icons-material";
import {
  Box,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { grey } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/router";
import React from "react";
import MenuBarList from "./components/MenuBarList";

const drawerBleeding = 50;
const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));
const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const useStyles = makeStyles((theme) => ({
  list: {
    overflowX: "hidden",
    textTransform: "uppercase",
    fontWeight: "bold",
    maxHeight: "80vh",
    overflowY: "auto",
  },
}));

export default function MobileBar({
  visibleBar,
  onShowBar,
  onHideBar,
  headerView = [],
}) {
  const classes = useStyles();
  const [keyword, setKeyword] = React.useState("");

  const filterData = React.useMemo(() => {
    if (!keyword) {
      return headerView;
    }

    return headerView.filter((item) =>
      String(item?.content?.toLowerCase())?.includes(
        String(keyword?.toLowerCase())
      )
    );
  }, [headerView, keyword]);

  const onSearch = React.useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  const navigate = useRouter();
  const navigateWithSearchBar = (link) => {
    if (link) {
      navigate.push(link);
    }

    onHideBar();
  };

  // This is used only for the example
  const container =
    typeof window !== undefined ? () => window.document.body : undefined;
  return (
    <SwipeableDrawer
      container={container}
      open={visibleBar}
      anchor="bottom"
      onClose={onHideBar}
      onOpen={onShowBar}
      swipeAreaWidth={drawerBleeding}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <StyledBox
        sx={{
          position: "absolute",
          top: 10,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          visibility: "visible",
          right: 0,
          left: 0,
        }}
      >
        <Puller onClick={onHideBar}></Puller>
      </StyledBox>
      <StyledBox
        sx={{
          px: 2,
          pb: 2,
          pt: 3,
          overflow: "auto",
        }}
      >
        <MenuBarList
          {...{
            onSearch,
            visibleBar,
            onShowBar,
            onHideBar,
            classes,
            navigateWithSearchBar,
            filterData,
          }}
        />
      </StyledBox>
    </SwipeableDrawer>
  );
}
