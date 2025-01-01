// Manage Auth API
import { axiosRequest } from "../config/axios.config";
import {
  GetInfoRoadsParams,
  UploadImgFormDataType,
} from "../defination/types/data.type";

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
      return response; // Đảm bảo trả về dữ liệu từ API
    } catch (error) {
      console.error("Error fetching route map:", error);
      throw error; // Có thể throw để xử lý lỗi ở cấp cao hơn
    }
  },
};
