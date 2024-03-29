import styled from "@emotion/styled";
import { Avatar, Box, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import * as React from "react";
import EmailHelper from "../../../../../helpers/mail.helper";
import { Send } from "@mui/icons-material";
import { useRouter } from "next/router";

/**
 * User information menu
 *
 * @param { React.ReactNode } avatarUrl - User avatar
 * @param { React.ReactNode } userName - Link to the user
 * @param { React.ReactNode } profile - Link to the profile of user
 *
 * @return { React.ReactNode }
 *
 */

/** */

const DisplayAvatarContainer = styled("div")(() => ({
  position: "relative",
}));

export default function UserInfoMenu({
  avatarUrl,
  fullName,
  profileId,
  children,
  email,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const mailLink = `${EmailHelper.getLinkToMail(email, "Example", "Body")}`;
  const router = useRouter();
  const navigateToProfile = () => {
    router.push(`/profile/${profileId}`);
  };

  const navigateToEmail = () => {
    router.push(mailLink);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ backgroundColor: "white", zIndex: 1 }}
        arial-label="Avatar user login"
      >
        {children}
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <DisplayAvatarContainer>
            <Avatar
              style={{ width: 100, height: 100 }}
              alt="profile id"
              src={avatarUrl}
            />
          </DisplayAvatarContainer>
        </MenuItem>
        <MenuItem onClick={navigateToProfile}>
          <b>{fullName}</b>
        </MenuItem>
      </Menu>
    </div>
  );
}
