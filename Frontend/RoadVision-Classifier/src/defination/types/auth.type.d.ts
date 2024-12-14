import { UserType } from "./user.type";

//Define type data of API respone
export type LoginFormDataType = {
  username: string;
  password: string;
};
export type LoginDataType = {
  info: UserType;
  token: string;
};
