import { Box, Typography } from "@mui/material";

export default function BaseStatistic({ title = "Default", quantity = 0 }) {
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: 'baseline' }}>
      <Typography>{title}</Typography>
      <Typography sx={{ fontSize: "1.5rem" }}>{quantity}</Typography>
    </Box>
  );
}
