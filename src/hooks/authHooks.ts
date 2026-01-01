import { useSnackbar } from "@/context/SnackbarContext";
import { Nav } from "@/navigation";
import { LoginApi, ProfileApi } from "@/services/api/authApiService";
import { removeData, storeData } from "@/services/asyncStore";
import { ApiResponse } from "@/types/apiReponse";
import { User } from "@/types/user";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

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

export function useProfile({
  fetchProfileEnabled = false,
}: {
  fetchProfileEnabled?: boolean;
}) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const resp = await ProfileApi();
      return {
        isAuthenticated: !!resp?.data?.id,
        profile: resp.data
      }
    },
    staleTime: 5000,
    retry: false,
    enabled: fetchProfileEnabled,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigation = useNavigation<Nav>();
  return async function () {
    await removeData("auth-token");
    queryClient.invalidateQueries({
      queryKey: ["profile"],
    });
    queryClient.refetchQueries();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "AuthStack",
        },
      ],
    });
  };
}
