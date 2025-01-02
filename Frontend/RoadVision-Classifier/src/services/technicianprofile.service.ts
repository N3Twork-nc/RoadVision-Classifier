import { axiosRequest } from "../config/axios.config";
import { getAccessToken } from "../utils/auth.util";

export default {
  getAllTask: async ({}) => {
    const url = `/user/api/getTask`;
    const token = getAccessToken();
    const requestUrl = `${url}?token=${token}`;
    try {
      const response = await axiosRequest.post(requestUrl);
      return response;
    } catch (error) {
      console.error("Error fetching all tasks:", error);
      throw error;
    }
  },
};
