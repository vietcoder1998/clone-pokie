import { Box, Grid, Link } from "@mui/material";
import Image from "next/image";
import Logo from "../../../../../assets/svg/logo-no-background.svg";
import BlogHeaderContainer from "./BlogItemContainer";
import BlogItemHeader from "./BlogItemHeader";
import React from "react";
import styled from "@emotion/styled";
import Logo from "../../../../../assets/svg/logo-no-background.svg";

const WebHeaderContainer = styled("div")(() => ({
  display: "flex",
  gap: 10,
}));

const WebHeaderItem = styled("div")(() => ({
  display: "flex",
}));

const WebHeaderLogo = styled("div")(() => ({
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
}));

export default function WebHeader(props) {
  const { headerView } = props;
  const DisplayContent = React.useMemo(
    () =>
      headerView?.map((item, index) => (
        <WebHeaderItem
          item
          md={item?.md ?? 1.4}
          key={`header-item-${index}`}
          sx={{
            display: "flex",
            justifyContent: "center",
            ...item?.style,
          }}
        >
          {item?.options?.length ? (
            <BlogHeaderContainer item={item} index={index} />
          ) : (
            <BlogItemHeader item={item} index={index} />
          )}
        </WebHeaderItem>
      )),
    [headerView]
  );

  return (
    <Grid container columnSpacing={10} {...props}>
      <Grid item md={2}>
        <WebHeaderLogo>
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image src={Logo} height={50} alt="blog-logo" />
          </Link>
        </WebHeaderLogo>
      </Grid>
      <Grid item md={10} sm={10}>
        <Box display={"flex"} width={"100%"} justifyContent={"right"}>
          <WebHeaderContainer container columnSpacing={1}>
            {DisplayContent}
          </WebHeaderContainer>
        </Box>
      </Grid>
    </Grid>
  );
}
