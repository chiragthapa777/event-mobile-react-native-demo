import { ApiResponse } from "@/types/apiReponse";
import { User } from "@/types/user";
import api from "./apiService";

export const LoginApi = async (body: {
  email?: string;
  phoneNumber?: string;
  password: string;
}): Promise<ApiResponse<{ accessToken: string; user: User }>> => {
  const response = await api.post<
    ApiResponse<{ accessToken: string; user: User }>
  >("/auth/login", body);
  return response.data;
};

export const RegisterApi = async (body: any): Promise<ApiResponse<User>> => {
  const response = await api.post<
    ApiResponse<User>
  >("/auth/register", body);
  return response.data;
};

export const ProfileApi = async (): Promise<ApiResponse<User>> => {
  const response = await api.get<ApiResponse<User>>("/auth/me");
  return response.data;
};
