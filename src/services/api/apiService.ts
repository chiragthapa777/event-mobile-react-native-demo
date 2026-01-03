import { navigate } from "@/navigation/navigationRef";
import axios, { AxiosError } from "axios";
import { getData } from "../asyncStore";

const api = axios.create({
  baseURL: "https://api-event-booker.chiragthapa.online/",
});

api.interceptors.request.use(async (config) => {
  const token = await getData("auth-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`[REQUEST]`);
  console.log(config);
  return config;
});

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`[RESPONSE]`);
    console.log(response);
    return response;
  },
  (error: AxiosError) => {
    console.log(`[ERROR RESPONSE]`);
    const errorStatusCode = error?.response?.status
    console.log(errorStatusCode);
    console.log(error?.response?.data);
    if (errorStatusCode === 401 || errorStatusCode === 403) {
      navigate("AuthStack");
    }
    return Promise.reject(error);
  }
);

export default api;
