import { Box, Grid, TextField, Typography } from "@mui/material";
import * as React from "react";

export default function BaseList({
  title,
  children,
  onSearch,
  searchFieldName,
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={2}>
        <Grid
          item
          md={8}
          sx={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.1rem",
            }}
          >
            <b>{title}</b>
          </Typography>
        </Grid>
        <Grid item md={4}>
          <input
            onChange={onSearch}
            name={searchFieldName}
            type="text"
            id="standard-textarea"
            label="Tìm kiếm"
            onSearch={onSearch}
            placeholder="Enter search ..."
            variant="standard"
            focused
          />
        </Grid>
      </Grid>
      <Box>{children}</Box>
    </Box>
  );
}
