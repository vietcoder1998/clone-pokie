import styled from "@emotion/styled";
import { faker } from "@faker-js/faker";
import { Avatar, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import i18n from "../../../i18n";
import ProfileModal from "./profile-modal/ProfileModal";

const HeaderProfileContainer = styled("div")(() => ({
  display: "flex",
  gap: 1,
  color: "black",
  textAlign: "left",
}));

const HeaderProfileShortInfo = styled("div")(() => ({
  textAlign: "left",
  gap: 1,
  color: "black",
  marginLeft: 4,
}));

const HeaderProfileRoleItem = styled("p")(() => ({
  fontSize: "0.6rem",
  margin: 0,
  "&:hover": { textColor: "white" },
}));

const HeaderProfileUserNameItem = styled("p")(() => ({
  fontSize: "0.8rem",
  paddingTop: 2,
  fontWeight: 500,
  margin: 0,
  "&:hover": { textColor: "white" },
}));

const HeaderProfileDetail = styled("p")(() => ({
  display: "flex",
}));

export default React.memo(function ProfileHeader(props) {
  const { userInfo } = props;
  const [visibleModal, setVisibleModal] = React.useState(false);
  const navigate = useRouter();
  const onOpenProfile = () => {
    if (userInfo?.id) {
      setVisibleModal(true);
    } else {
      navigate.push("/login");
    }
  };

  const onCloseProfile = () => {
    setVisibleModal(false);
  };
  const { t } = i18n;

  return (
    <>
      <ProfileModal
        visible={visibleModal}
        onClose={onCloseProfile}
      ></ProfileModal>
      <HeaderProfileContainer onClick={onOpenProfile}>
        {userInfo?.id ? (
          <HeaderProfileDetail>
            <Avatar src={userInfo?.avatarUrl ?? faker.image.avatar()} />
            <HeaderProfileShortInfo>
              <HeaderProfileRoleItem>
                {[userInfo?.role].join(" ")}
              </HeaderProfileRoleItem>
              <HeaderProfileUserNameItem>
                {[userInfo?.firstName, userInfo?.lastName].join(" ")}
              </HeaderProfileUserNameItem>
            </HeaderProfileShortInfo>
          </HeaderProfileDetail>
        ) : (
          <>{t("common.header.loginOrRegister")}</>
        )}
      </HeaderProfileContainer>
    </>
  );
});
