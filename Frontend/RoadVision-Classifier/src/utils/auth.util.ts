import Cookies from "js-cookie";
import { removeStoredUserInfo } from "./local-storage.util";
import { PageEnum } from "../defination/enums/page.enum";
import { CookieKeyEnum } from "../defination/enums/key.enum";

export const saveAccessToken = (accessToken: string) => {
  Cookies.set(CookieKeyEnum.ACCESS_TOKEN, accessToken, {
    expires: 30,
    path: "/",
    secure: true,
    sameSite: "Strict",
  });
};
export const getAccessToken = () => {
  return Cookies.get(CookieKeyEnum.ACCESS_TOKEN);
};

export const removeAccessToken = () => {
  return Cookies.remove(CookieKeyEnum.ACCESS_TOKEN);
}; // when u logout you need to remove all datas

export const handleLogOut = () => {
  removeAccessToken();
  removeStoredUserInfo();
  window.location.href = PageEnum.LOGIN;
};
