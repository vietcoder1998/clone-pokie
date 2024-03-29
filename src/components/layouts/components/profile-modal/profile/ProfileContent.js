import {
  AccountCircle,
  AddPhotoAlternate,
  Edit,
  Email,
  Logout,
  Photo,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import i18n from "../../../../../i18n";
import UploadImage from "../../../../../lib/rich-text/components/UploadFirebaseRichText";
import { Security } from "../../../../../security";
import { useProfile } from "../../../../../store/useProfile";
import BaseStatistic from "./components/BaseStatistic";
import BlogList from "./components/list/BlogList";
import CommentList from "./components/list/CommentList";
import { EditProfileModal } from "./components/modal/EditProfileModal";
import CookieHelper from "../../../../../helpers/cookie/cookie.helpers";
import styled from "@emotion/styled";

// All of padding is: 2
// Single of padding is: 2
// Center gap is: 2
// Default layer is: 2

/**
 * Profile
 *
 *
 * 12: 3 -> 9 ( Edit Avatar ->  Edit Profile )
 * 12: 12 ( Edit statistic )
 *     3 -> 3 -> 3 -> 3: -> Clear -> Total Blob -> Total Comment -> Total Friend
 *
 * 12: 6-> 6 ( BlogList + Comment List -> Friend List)
 *     12 ( BlogList )
 *     12 ( Comment List)
 *
 */

const SectionContainer = styled("div")(() => ({
  backgroundColor: "white",
  padding: `10px 40px`,
  borderRadius: 5,
  marginTop: 10,
}));

const ProfileDetailSection = styled("div")(() => ({
  backgroundColor: "white",
  padding: `10px 40px`,
  borderRadius: 5,
  marginTop: 10,
}));

const TitleItemSection = styled("div")(() => ({
  marginTop: 10,
  marginBottom: 10,
  display: "flex",
  alignItems: "center",
}));

const TitleItem = styled("div")(() => ({
  fontSize: "0.9rem",
  fontWeight: 300,
  width: "70%",
}));
const TitleContent = styled("div")(() => ({
  fontSize: "1rem",
  fontWeight: 400,
  width: "70%",
}));
const AvatarContent = ({ onUpdateProfile, totalBlog, totalComment }) => {
  const [visible, setVisible] = React.useState(false);
  const onShow = () => setVisible(true);
  const onHide = () => setVisible(false);
  const profile = CookieHelper.instance.getUserInfoCookie();

  const onSubmitForm = (data) => {
    onUpdateProfile(profile.id, data);
  };

  const onUploadAvatarProfile = (data) => {
    onUpdateProfile(profile.id, data);
  };
  const { t } = i18n;
  const AvatarUI = () => {
    return (
      <Grid item md={6} xs={6}>
        <UploadImage
          onUploadImage={(url) => {
            onUploadAvatarProfile({ avatarUrl: url });
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#005b96",
            }}
          >
            <Avatar
              sx={{ width: 150, height: 150, border: "solid gray 1px" }}
              src={profile?.avatarUrl}
            />
            <Box
              sx={{
                left: 0,
                bottom: 0,
                cursor: "pointer",
              }}
            >
              <Edit></Edit>
            </Box>
            <Box>{t("pages.profile.upload")}</Box>
          </Box>
        </UploadImage>
      </Grid>
    );
  };
  return (
    <Grid container sx={{ mt: 2, mr: 1 }}>
      <Grid item md={12} xs={12}>
        <Grid container sx={{ pr: 1 }} rowSpacing={2}>
          {AvatarUI()}
          <Grid md={12} item>
            <TitleItemSection>
              <TitleItem sx={{ display: "flex", justifyContent: "left" }}>
                {t("pages.profile.fullNameHeader")}
              </TitleItem>
              <TitleContent>
                {[profile?.firstName, profile?.lastName].join(" ")}
              </TitleContent>
            </TitleItemSection>
            <TitleItemSection>
              <TitleItem sx={{ display: "flex", justifyContent: "left" }}>
                {t("pages.profile.emailHeader")}
              </TitleItem>
              <TitleContent>{profile?.email ?? "-"}</TitleContent>
            </TitleItemSection>
          </Grid>
          <Grid md={12} item>
            <StatisticContent {...{ ...profile, totalBlog, totalComment }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const StatisticContent = ({ totalBlog, totalComment, totalFriend }) => {
  const { t } = i18n;

  return (
    <Grid container spacing={2}>
      <ProfileDetailSection>
        <BaseStatistic
          title={t("pages.profile.blogQuantity")}
          quantity={totalBlog}
        ></BaseStatistic>
      </ProfileDetailSection>
      <ProfileDetailSection>
        <BaseStatistic
          title={t("pages.profile.commentQuantity")}
          quantity={totalComment}
        ></BaseStatistic>
      </ProfileDetailSection>
      <ProfileDetailSection>
        <BaseStatistic
          title={t("pages.profile.friendQuantity")}
          quantity={totalFriend}
        ></BaseStatistic>
      </ProfileDetailSection>
    </Grid>
  );
};

export default function Profile({ userInfo }) {
  const { profileDetail, onGetProfileDetail, onUpdateProfile } = useProfile();
  const { t } = i18n;

  React.useEffect(() => {
    const profileId = userInfo?.id;

    if (profileId) {
      onGetProfileDetail(profileId);
    }
  }, []);

  return (
    <SectionContainer>
      <Grid container rowSpacing={2}>
        <Grid md={12} xs={12} item>
          <AvatarContent
            {...{
              profile: profileDetail,
              onUpdateProfile,
              totalComment: profileDetail?.comments?.length,
              totalBlog: profileDetail?.blogs?.length,
            }}
          />
        </Grid>
        <Grid md={12} xs={12} item>
          <CommentList {...profileDetail} />
          <BlogList {...profileDetail} />
        </Grid>
        <Grid md={12} xs={12} item>
          <Box>
            <Button
              color="error"
              sx={{ fontSize: "0.8rem" }}
              onClick={() => Security.instance.onLogOut()}
            >
              <Logout></Logout>
              {t("common.profile.logout")}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </SectionContainer>
  );
}
