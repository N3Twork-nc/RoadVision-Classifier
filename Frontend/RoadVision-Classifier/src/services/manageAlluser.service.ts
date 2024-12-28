import { axiosRequest } from "../config/axios.config";
import { AllUserType } from "../defination/types/alluser.type";
import { getAccessToken } from "../utils/auth.util";
export default {
    getAllUser: async ({}) =>
    {
        const url = `/user/api/getUserStatistics`;
        const token = getAccessToken();
        const requestUrl = `${url}?token=${token}`;
        try
        {
            const response = await axiosRequest.get(requestUrl);
            return response;
        }
        catch (error)
        {
            console.error("Error fetching all user:", error);
            throw error;
        }
    },
    addNewUser: async (formData: AllUserType) =>
    {
        const url = `/auth/api/addUser`;
        try
        {
            const data = await axiosRequest.post(url, formData);
            return data;
        }
        catch (error)
        {
            console.error("Error adding new user:", error);
            throw error;
        }
    }
}