// Manage Auth API
import { axiosRequest } from "../config/axios.config";
import {
  GetInfoRoadsParams,
  UploadImgFormDataType,
} from "../defination/types/data.type";
import { getAccessToken } from "../utils/auth.util";

export default {
  uploadRoad: async (formData: UploadImgFormDataType) => {
    const url = `/datasvc/api/uploadRoad`;
    const data = await axiosRequest.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },

  getInfoRoads: async (params: GetInfoRoadsParams) => {
    const url = "/datasvc/api/getInfoRoads";
    const data = await axiosRequest.get(url, {
      params,
    });
    return data;
  },

  deleteRoad: async (params: GetInfoRoadsParams) => {
    const url = "/datasvc/api/deleteRoad";
    const data = await axiosRequest.delete(url, {
      params,
    });
    return data;
  },

  getRouteMap: async () => {
    try {
      const url = "/datasvc/api/getRouteMap";
      const response = await axiosRequest.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching route map:", error);
      throw error;
    }
  },

  updateLocationRoad: async (
    id: number,
    latitude: number,
    longitude: number
  ) => {
    const url = `/datasvc/api/updateLocationRoad`;
    const data = await axiosRequest.patch(url, null, {
      params: { id, latitude, longitude },
    });
    return data;
  },

  getValidWards: async ({}) => {
    const url = "/user/api/getValidWard";
    const token = getAccessToken();
    const requestUrl = `${url}?token=${token}`;
    try {
      const validWard = await axiosRequest.get(requestUrl);
      console.log("validWard", validWard);
      return validWard;
    } catch (error) {}
  },
};
