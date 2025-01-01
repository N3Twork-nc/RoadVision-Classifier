import Cookies from "js-cookie";
import { removeStoredAdminInfo, removeStoredTechnicianInfo, removeStoredUserInfo } from "./local-storage.util";
import { PageEnum } from "../defination/enums/page.enum";
import { CookieKeyEnum } from "../defination/enums/key.enum";

//save role 
export const saveUserRole = (role: string) => {
  Cookies.set(CookieKeyEnum.USER_ROLE, role, { path: "/", secure: true, sameSite: "Strict" });
};

export const getUserRole = () => {
  return Cookies.get(CookieKeyEnum.USER_ROLE);
};

export const removeUserRole = () => {
  Cookies.remove(CookieKeyEnum.USER_ROLE);
};

export const saveAccessToken = (accessToken: string) => {
  Cookies.set(CookieKeyEnum.ACCESS_TOKEN, accessToken, {
    expires: 30,
    path: "/",
    secure: window.location.protocol === 'https:',
    sameSite: "Strict",
    domain: window.location.hostname
  });
};
export const getAccessToken = () => {
  return Cookies.get(CookieKeyEnum.ACCESS_TOKEN);
};

export const removeAccessToken = () => {
  return Cookies.remove(CookieKeyEnum.ACCESS_TOKEN);
}; // when u logout you need to remove all datas

export const isAuthenticated = () => {
  return !!Cookies.get(CookieKeyEnum.ACCESS_TOKEN); // check token
};
export const handleLogOut = () => {
  removeAccessToken();
  removeStoredUserInfo();
  removeUserRole();
  removeStoredAdminInfo();
  removeStoredTechnicianInfo();
  window.location.href = PageEnum.LOGIN;

};
