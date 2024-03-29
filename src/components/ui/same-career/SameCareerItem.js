import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CareerLink from "../../BLogLink";
import StatisticView from "../StatisticView";

export default function SameCareerItem(props) {
  return (
    <Box
      key={props?.key}
      sx={{ maxWidth: 345, mb: 1, display: "flex", gap: 2 }}
    >
      <Box
        sx={{
          pt: 1,
        }}
      >
        <CareerLink href={`/blog/${props?.slug}`}>{props?.title}</CareerLink>
        <Typography
          gutterBottom
          component="p"
          sx={{
            fontWeight: 200,
          }}
        >
          <small>{props?.shortContent}</small>
        </Typography>
        <StatisticView {...props} />
      </Box>
    </Box>
  );
}
