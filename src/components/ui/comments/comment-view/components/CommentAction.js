import { Box, IconButton } from "@mui/material";
import React from "react";

export default function CommentAction({ actions }) {
  return (
    <Box key={0} component={"field"} sx={{ display: "flex", gap: 2 }}>
      {actions.map((item) => (
        <Box
          key={item?.name}
          sx={{ display: "flex", fontSize: "1rem", alignItems: "center" }}
        >
          <IconButton
            size="small"
            onClick={item.onClick}
            sx={{ fontSize: "0.8rem" }}
          >
            {item?.icon}
          </IconButton>
          <Box
            className={"mt-2"}
            size="small"
            sx={{ alignItems: "center", color: item?.color, fontWeight: 500 }}
          >
            {item?.quantity}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
