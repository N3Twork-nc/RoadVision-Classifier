import { atom } from "recoil";
import { AllUserType } from "../../defination/types/alluser.type";

export const userState = atom({
  key: "allUserState",
  default: {
      email: "",
      username: "",
      fullname: "",
      contribution: 0,
  } as AllUserType, 
});