import { axiosRequest } from "../config/axios.config";
import { AllTechnicianType } from "../defination/types/alltechnician.type";
import { getAccessToken } from "../utils/auth.util";

export default {
    getAllTechnician: async ({}) =>
    {
        const url = `/user/api/getTechnicalStatistics`;
        const token = getAccessToken();
        const requestUrl = `${url}?token=${token}`;
        try
        {
            const allTechnician = await axiosRequest.get(requestUrl);
            console.log("All technician:", allTechnician);
            return allTechnician;
        }
        catch (error)
        {
            console.error("Error fetching all user:", error);
            throw error;
        }
    }, 

    addNewTechnician: async (formData: AllTechnicianType) => {
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