import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const sx = {
  position: "absolute",
  top: "50%",
  left: "30%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  overFlowY: "scroll",
  "*::-webkit-scrollbar": {
    width: "0.4em",
    height: "0.4em",
    color: "whitesmoke",
    borderRadius: 2,
  },
  "*::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0,0,0,.1)",
  },
};

/**
 * 
 * export interface BaseModalProps {
  visible?: boolean
  header?: any
  footer?: any
  children?: any
  action?: any
  onClose?: () => any
  onOpen?: () => any
  style?: React.CSSProperties
  sx?: SxProps
}
 * 
 */

export default function ImageContainerModal(props) {
  return (
    <Modal
      open={Boolean(props.visible)}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        {...props}
        sx={{ ...sx, ...props?.sx }}
        style={{ ...(props?.style ?? {}) }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props?.header}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            width: "70vw",
            height: "80vh",
            borderRadius: 2,
            overflow: "auto",
          }}
        >
          {props?.children}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          {props?.action}
        </Box>
      </Box>
    </Modal>
  );
}
