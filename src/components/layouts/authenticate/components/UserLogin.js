import { Avatar, Box } from "@mui/material";
import CommonMenu from "./../../../common/CommonMenu";
import React from "react";

export default function UserLogin(props) {
  const { userInfo } = props;

  return (
    <Box display={"flex"}>
      <CommonMenu {...props}>
        <Avatar
          src={userInfo?.avatarUrl}
          width={30}
          height={30}
          alt={userInfo?.fullName}
        />
      </CommonMenu>
    </Box>
  );
}
