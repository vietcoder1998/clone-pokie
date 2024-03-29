import { Container, CssBaseline, Grid, Box } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "./../../../config/const";

const mainStyle = (theme, open) => {
  if (open) {
    return {
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    };
  }

  return {};
};

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    minHeight: "100vh",
    ...mainStyle(theme, open),
  })
);

export default function DisplayContent(props) {
  if (props.disablePadding) {
    return (
      <Box sx={{ maxWidth: "100%", overflow: "auto" }}>
        <CssBaseline />
        {props?.children}
      </Box>
    );
  }

  return (
    <Main sx={{ padding: "20px 10px" }}>
      <Box
        className="layout-container"
        sx={{
          minHeight: "calc(100vh - 100px)",
          borderRadius: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          width: "100%",
          height: 'auto'
        }}
      >
        <CssBaseline />
        <Grid container className="root-container" sx={{ width: "100%" }}>
          {props.children}
        </Grid>
      </Box>
    </Main>
  );
}
