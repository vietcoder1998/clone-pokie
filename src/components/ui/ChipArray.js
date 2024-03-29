import { Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import * as React from "react";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
  display: "flex",
}));

export default function ChipsArray({ chipData }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        return (
          <ListItem key={data.key}>
            <Chip icon={icon} label={data.name} size="small" />
          </ListItem>
        );
      })}
    </Box>
  );
}
