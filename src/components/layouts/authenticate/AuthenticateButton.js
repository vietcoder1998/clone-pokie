import React from "react";
import ButtonGoogleLogin from "./components/ButtonGoogleLogin";
import UserLogin from "./components/UserLogin";

export default function AuthenticateButton(props) {
  const { isLogin } = props;

  if (isLogin) {
    return <UserLogin {...props} />;
  }

  return <ButtonGoogleLogin {...props} />;
}
