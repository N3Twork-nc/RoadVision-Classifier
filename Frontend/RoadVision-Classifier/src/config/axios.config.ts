import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const axiosRequest = axios.create({
  baseURL: BASE_URL,
});

axiosRequest.interceptors.request.use((config) => {
  if (localStorage.getItem("USER_INFO_KEY")) {
    const userInfo = JSON.parse(localStorage.getItem("USER_INFO_KEY") || "{}");
    const accessToken = userInfo.access_token;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  return config;
});

export { axiosRequest };