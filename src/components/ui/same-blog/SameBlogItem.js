import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import BlogLink from "../../BLogLink";
import StatisticView from "../StatisticView";

export default function SameBlogItem(props) {
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
        <BlogLink href={`/blog/${props?.slug}`}>{props?.title}</BlogLink>
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
