// atoms.js
import { atom } from "recoil";

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
  }, // default value
});
