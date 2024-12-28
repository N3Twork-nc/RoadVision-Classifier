import { axiosRequest } from "../config/axios.config";
import {
  EditProfileDataType,
  ChangePasswordDataType,
} from "../defination/types/profile.type";
import { getAccessToken } from "../utils/auth.util";

export default {
  getProfile: async ({}) => {
    const url = `/user/api/getProfile`;
    const token = getAccessToken();
    const requestUrl = `${url}?token=${token}`;
    try {
      const response = await axiosRequest.get(requestUrl);
      return response;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  editProfile: async (formData: EditProfileDataType) => {
    const url = `/user/api/editProfile`;
    const token = getAccessToken();
    const requestUrl = `${url}?token=${token}`;
    try {
      const data = await axiosRequest.post(requestUrl, formData);
      return data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  changePassword: async (formData: ChangePasswordDataType) => {
    const url = `/auth/api/changePassword`;
    try {
      const data = await axiosRequest.post(url, formData);
      return data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
};
