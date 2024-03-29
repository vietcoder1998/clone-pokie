import CookieHelper from "../helpers/cookie/cookie.helpers";
import AuthenticateAPI from "./../api/authenticate.api";

export class UserInfo {
  id = "";
  firstName = "";
  lastName = "";
  token = "";
  role = 1;
  expires = new Date().getTime();

  constructor(id, firstName, lastName, role, token) {
    if (id) {
      this.id = id;
    }
    if (firstName) {
      this.firstName = firstName;
    }

    if (lastName) {
      this.lastName = lastName;
    }
    if (role) {
      this.role = role;
    }

    if (token) {
      this.token = token;
    }
  }
}

export class Security {
  userInfo = new UserInfo();

  static instance = new Security();

  constructor() {
    this.refreshUserInfo();
  }

  refreshUserInfo() {
    const userInfo = CookieHelper.instance.getUserInfoCookie();

    this.userInfo = new UserInfo(
      userInfo?.id,
      userInfo?.firstName,
      userInfo?.lastName,
      userInfo?.email,
      userInfo?.token
    );

    return userInfo;
  }

  getUserInfo() {
    return this.userInfo;
  }

  onGetUserInfo() {
    return CookieHelper.instance.getUserInfoCookie();
  }

  loginUser(userInfo) {
    CookieHelper.instance.setUserInfoCookie(userInfo);
    window.location.reload();
    window.location.assign("/");
  }

  isValidate() {
    return this.userInfo.token !== undefined;
  }

  onLogOut() {
    const userId = this.onGetUserInfo()?.id;

    AuthenticateAPI.instance.logout(userId).then((res) => {
      if (res) {
        CookieHelper.instance.clearCookie();
        document.location.reload();
      }
    });
  }
}
