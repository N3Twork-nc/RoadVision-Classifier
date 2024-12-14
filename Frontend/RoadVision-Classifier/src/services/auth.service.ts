import { axiosRequest } from "../config/axios.config";
import { LoginDataType, LoginFormDataType } from "../defination/types/auth.type";

export default {
  signUp: async (formData: any) => {
    const url = `/auth/api/signup`;
    const data = await axiosRequest.post(url, formData);
    return data;
  },

  verify: async (formData: any) => {
    const url = `/auth/api/verify`;
    const data = await axiosRequest.post(url, formData);
    return data;
  },

  signIn: async (formData: LoginFormDataType) => {
    const url = `/auth/api/signin`;
    const data: LoginDataType = await axiosRequest.post(url, formData);
    return data;
  },
};
