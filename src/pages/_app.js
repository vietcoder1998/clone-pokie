import { GoogleOAuthProvider } from "@react-oauth/google";
import dynamic from "next/dynamic";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticateAPI from "../api/authenticate.api";
import CookieHelper from "../helpers/cookie/cookie.helpers";
import { isPhone } from "../helpers/device";
import { useRouter } from "next/router";
import "../index.css";
import "../App.css";
import "../global.css";
import {} from "next/font/google";
import DefaultLayout from "../components/layouts/DefaultLayout";

export default function App({ Component, pageProps }) {
  const [userInfo, setUserInfo] = React.useState({});
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const router = useRouter();
  React.useEffect(() => {
    router.push(window.location.href);
  }, []);

  const onLogout = React.useCallback(() => {
    const userId = userInfo?.id;

    AuthenticateAPI.instance.logout(userId).then((res) => {
      if (res) {
        CookieHelper.instance.clearCookie();
        document.location.reload();
      }
    });
  }, [userInfo?.id]);

  React.useEffect(() => {
    setIsMobile(isPhone());

    document.addEventListener("resize", () => {
      setIsMobile(isPhone());
    });

    return document.removeEventListener("resize", () => {
      return;
    });
  }, []);

  const onRefreshUserInfo = () => {
    const cookieData = CookieHelper.instance.getUserInfoCookie();

    setUserInfo(cookieData);
    setIsLogin(Boolean(userInfo?.id));
  };

  React.useEffect(() => {
    onRefreshUserInfo();
  }, []);

  const [disablePadding, setDisablePadding] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setDisablePadding(window.location.pathname.includes("/privacy"));
    } else {
      setDisablePadding(false);
    }
  }, []);

  const contextProps = {
    userInfo,
    onLogout,
    isLogin,
    onRefreshUserInfo,
    disablePadding,
  };

  return (
    <DefaultLayout {...contextProps} isMobile={isMobile}>
      <Component {...{ ...pageProps, ...contextProps, isMobile }} />
      <ToastContainer />
    </DefaultLayout>
  );
}
