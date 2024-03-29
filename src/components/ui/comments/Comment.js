import { Box } from "@mui/material";
import React from "react";
import LazyLoad from "react-lazyload";
import CommentView from "./comment-view/CommentView";

export default function Comment(props) {
  return (
    <Box
      key={props?.id}
      sx={{ mb: 2, position: "relative", width: "100%" }}
      className={"border p-2 rounded-5"}
    >
      <LazyLoad>
        <CommentView {...props} />
      </LazyLoad>
    </Box>
  );
}
