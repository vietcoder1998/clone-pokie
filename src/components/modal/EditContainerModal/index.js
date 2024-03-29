import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";
import BaseModal from "../../BaseModal";
import Loading from "../../Loading";

/**
 * View Field
 *
 * @return  {[type]}  [return description]
 */

const ModalEditContainer = styled("div")(() => ({}));
const ModalTitleContainer = styled("p")(() => ({
  fontSize: "1.4rem",
  textTransform: "uppercase",
}));

export default function EditContainerModal({
  model,
  children,
  visible,
  onSubmit,
  onCancel,
  loading,
  sx = {},
  title = "",
}) {
  return (
    <BaseModal
      {...{
        onClose: onCancel,
        model,
        onSubmit,
        visible,
        sx: {
          width: "40vw",
          minWidth: 300,
          maxHeight: "80vh",
          minHeight: "100px",
          padding: "15px 5%",
          ...sx,
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <ModalTitleContainer>
          <b>{title ?? "Sửa nội dung"}</b>
        </ModalTitleContainer>
        <Loading loading={loading}>
          <Box sx={{ maxHeight: "60vh", overflowY: "scroll", p: `20px 5px` }}>
            {children}
          </Box>
        </Loading>
      </Box>
    </BaseModal>
  );
}
