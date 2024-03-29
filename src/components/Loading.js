import { Box, CircularProgress } from "@mui/material";

export default function LoadingComponent({ loading, children, sx ={} }) {
  return (
    <Box sx={{ position: "relative", ...{...sx ?? {}} }}>
      {loading && (
        <Box
          sx={{
            display: "flex",
            width: "-webkit-fill-available",
            height: "-webkit-fill-available",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: 'whitesmoke',
            top: 0,
            left: 0,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {children}
    </Box>
  );
}
