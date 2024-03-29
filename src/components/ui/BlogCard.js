import { Box, Divider, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LazyLoad from "react-lazyload";
import NoneDataImage from "../../assets/no-item.jpg";
import BlogLink from "../BLogLink";
import StatisticView from "./StatisticView";
import styled from "@emotion/styled";

const BlogCardContainer = styled("div")(() => ({
  // "&:hover": {
  //   boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
  // },
  padding: "10px 10px",
  height: "100%",
}));

export default function BlogCard(props) {
  React.useLayoutEffect(() => {
    document.addEventListener("DOMContentLoaded", () => {
      const innerDOM = document.getElementById(`div#${props?.id}`);

      innerDOM.innerHTML = props?.shortContent;
    });
  }, [props]);

  const [avatarUrl, setAvatarUrl] = React.useState("");

  React.useEffect(() => {
    setAvatarUrl(["http://localhost:8080", NoneDataImage?.src].join(""));
  }, []);

  const DisplayImage = React.useMemo(() => {
    const isAvatar = Boolean(props?.coverUrl);
    return (
      <Box
        sx={{
          width: "100%",
          height: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: "gray",
        }}
      >
        <Link
          href={`/blog/${props?.slug}`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isAvatar ? (
            <Image
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
              }}
              width={400}
              height={400}
              src={props?.coverUrl}
              alt={props?.title}
            />
          ) : (
            <Image
              style={{
                width: "100%",
                height: "auto",
              }}
              width={400}
              height={400}
              src={NoneDataImage}
              alt={props?.title}
            />
          )}
        </Link>
      </Box>
    );
  }, [avatarUrl, props?.coverUrl, props?.slug, props?.title]);

  const BlogHeader = () => {
    return (
      <Box
        className={"blog-link"}
        component={"div"}
        sx={{
          pb: 1,
          pt: 1,
          width: "100%",
        }}
      >
        <BlogLink
          sx={{
            width: "100%",
          }}
          size="large"
          linkStyle={{
            clear: "both",
            width: "100%",
            display: "inline-block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          typoSx={{
            display: "grid",
          }}
          title={props?.title}
          href={`/blog/${props?.slug}`}
        >
          {props?.title?.toLowerCase()}
        </BlogLink>
      </Box>
    );
  };

  const BlogShortContent = () => {
    return (
      <Box
        className={"blog-link"}
        component={"div"}
        sx={{
          width: "100%",
        }}
      >
        {props?.shortContent}
      </Box>
    );
  };

  const BlogFooter = () => {
    return (
      <Box
        className="time-and-view"
        sx={{
          position: "absolute",
          bottom: 2,
          marginLeft: -1,
        }}
      >
        <Box
          {...props?.inputProps}
          name={props?.key}
          id={props?.id}
          sx={{
            ...props.sx,
            font: "auto",
            minHeight: 20,
            fontWeight: 300,
            fontSize: 14,
          }}
          disabled={props.status === -1}
        ></Box>
        <Box>
          <StatisticView {...props} />
        </Box>
      </Box>
    );
  };

  const BlogAvatar = () => {
    return (
      <Grid md={12} item>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            border: "solid gray 1px",
            width: "100%",
          }}
          overflow={"hidden"}
        >
          {DisplayImage}
        </Box>
      </Grid>
    );
  };

  const BlogComponent = () => {
    return (
      <Grid md={12} item xs={12}>
        <Box
          className="blog-card"
          component={"div"}
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            pb: 5,
            mb: 2,
          }}
        >
          <BlogHeader />
          <BlogShortContent></BlogShortContent>
          <BlogFooter />
        </Box>
      </Grid>
    );
  };
  return (
    <LazyLoad>
      <BlogCardContainer>
        <BlogAvatar />
        <BlogComponent />
      </BlogCardContainer>
    </LazyLoad>
  );
}
