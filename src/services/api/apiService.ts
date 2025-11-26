import { navigate } from "@/navigation/navigationRef";
import axios from "axios";
import { getData } from "../asyncStore";

const api = axios.create({
  baseURL: "https://api-event-booker.chiragthapa.online/",
});

api.interceptors.request.use(async (config) => {
  const token = await getData('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error?.response?.status === 401) {
      navigate("AuthStack");
    }
    return Promise.reject(error);
  }
);

export default api;
