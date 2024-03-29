import { Avatar, Box } from "@mui/material";
import React from "react";

export default function BlogAuthorUI({ commentDetail }) {
  return (
    <Box className={"relative"}>
      <Avatar src={commentDetail?.author?.avatarUrl}></Avatar>
    </Box>
  );
}
