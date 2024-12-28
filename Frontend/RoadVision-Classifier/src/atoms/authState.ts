// atoms.js use to store Auth data state, similar to redux
import { atom } from "recoil";
import { UserType } from "../defination/types/user.type";
import { VerifyFormDataType } from "../defination/types/auth.type";

export const verifyEmailState = atom({
  key: "verifyEmailState",
  default: {
    email: "",
    username: "",
    password: "",
  } as VerifyFormDataType, // default value
});

// store username
export const accountState = atom({
  key: "accountState",
  default: {
    avatar: "",
    username: "",
    email: "",
    role: "",
  } as UserType, // default value
});
