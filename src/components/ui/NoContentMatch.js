import { Box } from "@mui/material";
import i18n from "../../i18n";

export default function NoContentMatch() {
  const { t } = i18n;
  return (
    <Box sx={{ fontStyle: "italic", fontColor: "gray" }}>
      {t("common.ui.noContentMatch")}
    </Box>
  );
}
