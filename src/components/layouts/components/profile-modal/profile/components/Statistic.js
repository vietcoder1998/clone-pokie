import { Box } from "@mui/material";

export default function Statistic({ title, quantity }) {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box>{title}</Box>
      <Box>{quantity}</Box>
    </Box>
  );
}
