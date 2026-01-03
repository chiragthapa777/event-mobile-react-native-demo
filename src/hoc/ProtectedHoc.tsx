import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { useProfile } from "@/hooks/authHooks";
import { Nav } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function Protected({ children }: Props) {
  const { data, error, isLoading } = useProfile({ fetchProfileEnabled: true });
  const navigation = useNavigation<Nav>();
  const { isAuthenticated = false } = data ?? {};

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "AuthStack",
          },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isAuthenticated]);

  if (isLoading) return <LoadingScreen />;

  if (error) return <ErrorScreen errorMessage={error.message} />;

  return children;
}
