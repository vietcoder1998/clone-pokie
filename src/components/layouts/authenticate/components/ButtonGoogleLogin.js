import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import AuthenticateAPI from "../../../../api/authenticate.api";
import CookieHelper from "../../../../helpers/cookie/cookie.helpers";

export default function ButtonGoogleLogin(props) {
  const errorMessage = (error) => {
    console.log(error);
  };

  const { onRefreshUserInfo } = props;

  const responseMessage = async (response) => {
    const body = {
      token: response.credential,
    };

    AuthenticateAPI.instance.loginWithGoogle(body).then((res) => {
      if (res) {
        const data = res?.data?.data;
        CookieHelper.instance.setUserInfoCookie(data);
        onRefreshUserInfo(data);
      }
    });
  };

  return <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />;
}
