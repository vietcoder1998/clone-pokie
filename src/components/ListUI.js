import { React } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import LoadingComponent from "./Loading";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import i18n from "../i18n";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function ListUI({
  loading,
  children,
  sx = {},
  hide,
  noneComponent = "",
  onRefresh = () => {
    return;
  },
}) {
  const { t } = i18n;

  if (loading) {
    return <LoadingComponent {...{ loading, children, sx }}></LoadingComponent>;
  }

  if (hide) {
    if (noneComponent) {
      return noneComponent;
    }

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          mt: 2,
          minHeight: '20vh',
          ...sx
        }}
      >
        <Box
          sx={{
            fontSize: "1rem",
            fontWeight: 300,
            color: "#11111140",
            fontStyle: "italic",
          }}
        >
          <IconButton size="small" onClick={onRefresh}>
            <RefreshIcon
              sx={{
                color: "#11111140",
              }}
            />
          </IconButton>
          {t("common.ui.noneItemMatch")}
        </Box>
      </Box>
    );
  }

  return <Box hide={hide?.toString()}>{children}</Box>;
}
