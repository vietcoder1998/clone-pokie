import EditNoteIcon from "@mui/icons-material/EditNote";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Privacy({ t }) {
  return (
    <Box sx={{}}>
      <Typography>{t("common.footer.privacy")}</Typography>
      <Box
        component={"span"}
        sx={{
          display: "flex",
          my: 1,
        }}
      >
        <Link href={"/privacy"}>{t("common.footer.privacyAndCommitment")}</Link>
      </Box>
    </Box>
  );
}
