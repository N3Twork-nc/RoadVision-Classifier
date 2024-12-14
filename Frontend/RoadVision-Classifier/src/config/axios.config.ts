import axios from "axios";
import { getAccessToken } from "../utils/auth.util";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosRequest = axios.create({
  baseURL: BASE_URL,
});

axiosRequest.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosRequest.interceptors.response.use((response) => {
  return response.data || response;
});

export { axiosRequest };
