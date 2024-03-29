import { Close, Menu } from "@mui/icons-material";
import { Box, Grid, IconButton, Link } from "@mui/material";
import Image from "next/image";
import React from "react";
import Logo from "../../../../../assets/svg/logo-no-background.svg";

export default function MobileHeader({ visibleBar, onHideBar, onShowBar }) {
  const OpenBarButton = () => (
    <IconButton onClick={onShowBar} size="large">
      <Menu fontSize="2rem" />
    </IconButton>
  );

  const CloseBarButton = () => (
    <IconButton onClick={onHideBar} size="large">
      <Close fontSize="2rem" />
    </IconButton>
  );

  return (
    <Grid className={""} container columnSpacing={10}>
      <Grid item md={2} xs={4}>
        <Box
          sx={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo height={100} width={200} alt="blog-logo" />
          </Link>
        </Box>
      </Grid>
      <Grid item md={10} sm={10} xs={8}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          {visibleBar ? <CloseBarButton /> : <OpenBarButton />}
        </Box>
      </Grid>
    </Grid>
  );
}
