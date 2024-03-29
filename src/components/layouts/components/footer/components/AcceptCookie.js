import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { CommonState } from "../../../../../config/const";
import CookieHelper from "../../../../../helpers/cookie/cookie.helpers";
import i18n from "../../../../../i18n";
import Privacy from "./privacy/Privacy";

export default function AcceptCookie() {
  const { t } = i18n;
  const [visible, setVisible] = React.useState(
    !CookieHelper.instance.isAcceptCookies()
  );

  const onAcceptCookie = () => {
    CookieHelper.instance.onAcceptCookies();
    setVisible(CommonState.hide);
  };
  const onDenyCookie = () => {
    CookieHelper.instance.onDenyCookies();
    setVisible(CommonState.hide);
  };
  const onHideCookie = () => {
    setVisible(CommonState.hide);
  };
  return (
    <Drawer anchor={"bottom"} open={Boolean(visible)} onClose={onHideCookie}>
      <Container sx={{ pt: 2, px: 2, pb: 2, minHeight: 100 }}>
        <Grid container>
          <Grid md={8} item>
            <Typography sx={{ fontSize: "1.2rem" }}>Cookie 🍪</Typography>
            <Typography>{t("common.footer.needCookie")}</Typography>
            <Privacy {...{ t }} />
          </Grid>
          <Grid md={4}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                height: "100%",
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  boxShadow: "none",
                }}
                variant="contained"
                onClick={onAcceptCookie}
              >
                {t("common.footer.accept")}
              </Button>
              <Button variant="outlined" onClick={onDenyCookie}>
                {t("common.footer.deny")}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Drawer>
  );
}
