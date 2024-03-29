import Cookie from "universal-cookie";
import { CommonState, CookieVariable } from "../../config/const";
import StringHelper from "../string/string.helper";

export default class CookieHelper {
  cookie = new Cookie();
  static instance = new CookieHelper();

  setToken(token) {
    return this.cookie.set(CookieVariable.token, token, { path: "/" });
  }

  getToken() {
    return this.cookie.get(CookieVariable.token, { path: "/" });
  }

  removeToken() {
    return this.cookie.remove(CookieVariable.token, { path: "/" });
  }

  getUserInfo() {
    return this.cookie.get(CookieVariable.userInfo, { path: "/" });
  }

  setUserInfo(strUserInfo) {
    return this.cookie.set(CookieVariable.userInfo, strUserInfo, { path: '/' });
  }

  isValidated() {
    return Boolean(this.getToken());
  }

  clearCookie() {
    this.cookie.remove(CookieVariable.token, { path: '/' });
    this.cookie.remove(CookieVariable.userInfo, { path: '/' });
    this.cookie.remove(CookieVariable.userId, { path: '/' });
  }

  getUserInfoCookie() {
    const strUserInfo = this.getUserInfo();
    const jsonData = StringHelper.instance.base64ToJSON(strUserInfo);

    return jsonData;
  }

  getAcceptCookie() {
    return this.cookie.get(CookieVariable.isAcceptCookies);
  }

  setAcceptCookie(value) {
    return this.cookie.set(CookieVariable.isAcceptCookies, value);
  }

  isAcceptCookies() {
    return Number(this.getAcceptCookie());
  }

  onAcceptCookies() {
    this.setAcceptCookie(CommonState.accept);
  }
  onDenyCookies() {
    this.setAcceptCookie(CommonState.deny);
  }
  getUserId() {
    const userInfo = this.getUserInfoCookie();

    return userInfo?.id;
  }

  setUserInfoCookie(userInfo) {
    const b64UserInfo = StringHelper.instance.jsonToBase64(userInfo);

    this.setToken(userInfo?.token);
    this.setUserInfo(b64UserInfo);
  }
}
