import { useSnackbar } from "@/context/SnackbarContext";
import { ApiResponse } from "@/types/apiReponse";
import { User } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginApi, ProfileApi } from "../api/authApiService";
import { storeData } from "../asyncStore";

export function useLogin({
  onSuccess,
}: {
  onSuccess?: (data: ApiResponse<{ accessToken: string; user: User }>) => void;
}) {
  const snackbar = useSnackbar();
  return useMutation({
    mutationFn: async ({
      emailOrPhoneNumber,
      password,
    }: {
      emailOrPhoneNumber: string;
      password: string;
    }) => {
      const body: { email?: string; phoneNumber?: string; password: string } = {
        password,
      };
      if (emailOrPhoneNumber.includes("@")) {
        body.email = emailOrPhoneNumber;
      } else {
        body.phoneNumber = emailOrPhoneNumber;
      }
      return await LoginApi(body);
    },
    onSuccess: (data) => {
      storeData("auth-token", data.data.accessToken);
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error: AxiosError<ApiResponse>) => {
      snackbar.showSnackbar(
        error.response?.data?.message
          ? error.response?.data?.message
          : error?.message,
        "error",
        5,
        true
      );
    },
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      return ProfileApi();
    },
  });
}
