import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import SubscribeAPI from "../../../../api/subscribe.api";
import Privacy from "./components/privacy/Privacy";
import i18n from "../../../../i18n/index";
import styled from "@emotion/styled";
import OutProduction from "./components/OutProduction";

const mail = "duyviet2841998@gmail.com";
const FooterCopyRightContainer = styled("div")(() => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "whitesmoke",
  lineHeight: 4,
}));

const SocialLink = () => {
  const { t } = i18n;

  return (
    <Box container rowSpacing={1}>
      <Box md={12}>
        <Typography sx={{ fontSize: "1.1rem", mb: 2 }}>
          {t("common.footer.contact")}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "end",
          }}
        >
          <Link
            sx={{ px: 2 }}
            target="_blank"
            href={`https://mail.google.com/mail/u/0/?fs=1&to=${mail}&su=${"Phản hồi tới VietBlog"}&body=BODY&bcc=&tf=cm`}
          >
            <GoogleIcon size={"small"} />
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "end",
          }}
        >
          <Link
            sx={{ px: 2 }}
            target="_blank"
            href={`https://www.facebook.com/tran.duy.viet.28.04/`}
          >
            <FacebookIcon size={"small"} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default function Footer() {
  const { t } = i18n;
  const [isDisplaySubscribed, setIsSubscribed] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [emailSubscribe, setEmailSubscribe] = React.useState("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeEmail = (e) => {
    setEmailSubscribe(e?.target?.value);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmitEmail = React.useCallback(
    (e) => {
      e?.preventDefault();

      if (Boolean(emailSubscribe)) {
        SubscribeAPI.instance
          .create({ email: emailSubscribe })
          .then((response) => {
            if (response.data) {
              setIsSubscribed(true);
              setIsError(false);
            } else {
              setIsError(true);
            }
          })
          .catch((error) => {
            setIsError(true);
          });
      } else {
        setIsError(true);
      }
    },
    [emailSubscribe]
  );

  const SubscribeFormUI = React.useMemo(() => {
    return (
      <Box sx={{ mb: 4 }} component="form" onSubmit={onSubmitEmail}>
        <Box>
          <input
            onChange={onChangeEmail}
            style={{ padding: 10, margin: "10px 0 10px", width: "70%" }}
            placeholder={t("common.footer.emailAddress")}
          />
        </Box>
        <Box>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#607274",
              color: "white",
              boxShadow: "none",
              fontSize: "0.7rem",
            }}
          >
            Subscribes
          </Button>
        </Box>
      </Box>
    );
  }, [onSubmitEmail, onChangeEmail]);
  const SubscribeSuccessUI = React.useMemo(() => {
    return (
      <Box
        style={{
          backgroundColor: "#A1EEBD30",
          color: "green",
          border: "solid green 1px",
          fontWeight: 300,
          borderRadius: 5,
          p: 2,
        }}
      >
        <Typography sx={{ padding: 2 }}>
          Đã gửi đến gmail, vui lòng subscribe. Cám ơn bạn!
        </Typography>
      </Box>
    );
  }, []);
  const SubscribeErrorUI = React.useMemo(() => {
    return (
      <>
        <Box
          style={{
            backgroundColor: "#FF8F8F30",
            color: "red",
            border: "solid red 1px",
            fontWeight: 300,
            borderRadius: 5,
            p: 2,
          }}
        >
          <Typography sx={{ padding: 2 }}>
            Địa chỉ mail sai hoặc không đúng vui lòng nhập lại
          </Typography>
        </Box>
        {SubscribeFormUI}
      </>
    );
  }, [SubscribeFormUI]);
  const SubscribeStateDisplay = isError ? SubscribeErrorUI : SubscribeSuccessUI;
  const SubscribeDisplay = React.useMemo(() => {
    return !isDisplaySubscribed ? SubscribeFormUI : SubscribeStateDisplay;
  }, [SubscribeFormUI, SubscribeStateDisplay, isDisplaySubscribed]);

  return (
    <Box
      sx={{
        backgroundColor: "white",
        fontSize: "0.8rem",
        mt: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#ffffff00",
          zIndex: -1
        }}
      >
        <Box
          className="clipPath"
          sx={{
            backgroundColor: "white",
            height: "26px",
            width: "100%",
          }}
        ></Box>
      </Box>
      <Container
        sx={{
          width: "100%",
          justifyContent: "center",
          minHeight: 250,
          p: 2,
          bottom: 0,
          overflow: "hide",
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={3} xs={12}>
            <SocialLink />
          </Grid>
          <Grid item md={3} xs={12}>
            <Privacy {...{ t }} />
          </Grid>
          <Grid item md={6}>
            <Typography>{t("common.footer.subscribe")}</Typography>
            <Box sx={{ mb: 2 }}>{t("common.footer.quote")}</Box>
            {SubscribeDisplay}
          </Grid>
        </Grid>
      </Container>
      <FooterCopyRightContainer>
        {t("common.footer.copyRight")}
      </FooterCopyRightContainer>
    </Box>
  );
}
