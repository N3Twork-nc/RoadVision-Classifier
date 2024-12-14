// atoms.js use to store Auth data state, similar to redux  
import { atom } from "recoil";
import { UserType } from "../defination/types/user.type";

export const verifyEmailState = atom({
  key: "verifyEmailState",
  default: {
    email: "",
    username: "",
    password: "",
  }, // default value
});

// store username
export const userState = atom({
  key: "userState",
  default: {
    username: "",
    email: "",
  } as UserType, // default value
});
