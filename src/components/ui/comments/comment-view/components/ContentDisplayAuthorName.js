import { Typography } from "@mui/material";
import React from "react";

export default function ContentDisplayAuthorName({ commentDetail }) {
    return (
      <Typography
        className="header"
        sx={{ mb: -0.5, fontWeight: 400, fontSize: "0.8rem" }}
      >
        <>{commentDetail?.author?.fullName ?? ""}</>
      </Typography>
    );
  }