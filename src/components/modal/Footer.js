import { Box, Button } from "@mui/material";

export default function ModalFooter({ onCancel }) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        marginTop: 2,
      }}
    >
      <Button onClick={onCancel} variant="outlined">
        Cancel
      </Button>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
