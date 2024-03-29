import { Grid, Typography } from "@mui/material";
import BaseModal from "../../../BaseModal";
import Profile from "./profile/ProfileContent";
import ProfileMenu from "./profile/ProfileMenu";
import i18n from "../../../../i18n";
import { styled } from "@mui/system";

const ProfileTitle = styled("div")(() => ({
  fontSize: "1.4rem",
  backgroundColor: "white",
  textTransform: "uppercase",
}));

export default function ProfileModal({
  visible = true,
  onOpen = () => {
    return;
  },
  onClose = () => {
    return;
  },
}) {
  const { t } = i18n;
  return (
    <BaseModal
      {...{
        visible,
        onOpen,
        onClose,
        sx: { minWidth: "400", width: "60vw", padding: "20px 60px" },
      }}
    >
      <ProfileTitle>{t("pages.profile.modalHeader")}</ProfileTitle>
      <Grid container>
        <Grid item md={3}>
          <ProfileMenu />
        </Grid>
        <Grid item md={9}>
          <Profile {...{ open: visible }}></Profile>
        </Grid>
      </Grid>
    </BaseModal>
  );
}
