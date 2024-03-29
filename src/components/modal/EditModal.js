import { Box, TextField } from "@mui/material";
import React from "react";
import EditContainerModal from "./EditContainerModal";

/**
 * View Field
 *
 * @return  {[type]}  [return description]
 */

export default function EditModal({
  onCancel = () => {
    return;
  },
  onSubmit = () => {
    return;
  },
  visible,
  children = "",
  sx = {},
  title = ''
}) {
  return (
    <EditContainerModal {...{ sx, onCancel, onSubmit, visible, title }}>
      {children}
    </EditContainerModal>
  );
}
