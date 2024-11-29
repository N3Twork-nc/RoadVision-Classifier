import { axiosRequest } from "../config/axios.config";

export default {
  signUp: async (formData: any) => {
    const url = `/auth/api/signup`;
    const response = await axiosRequest.post(url, formData);
    return response;
  },

  signIn: async (formData: any) => {
    const url = `/auth/api/signin`;
    const response = await axiosRequest.post(url, formData);
    return response;
  },
};
