/* eslint-disable react-hooks/exhaustive-deps */
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";

import ErrorScreen from "@/components/ErrorScreen";
import LoadingScreen from "@/components/LoadingScreen";
import { HAS_SEEN_ONBOARDING } from "@/constants/StoreKey";
import { useProfile } from "@/hooks/authHooks";
import { getData } from "@/services/asyncStore";
import { useNavigation } from "@react-navigation/native";
import AuthStack from "./screens/auth/AuthStack";
import { NotFound } from "./screens/NotFound";
import OnBoardingStack from "./screens/onboarding/OnBoardingStack";
import ProtectedStack from "./screens/protected/ProtectedStack";

const Root = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Root.Navigator
      initialRouteName={"RoutingScreen"}
      screenOptions={{ headerShown: false }}
    >
      <Root.Screen name="RoutingScreen" component={RoutingScreen} />
      <Root.Screen name="ProtectedStack" component={ProtectedStack} />
      <Root.Screen name="AuthStack" component={AuthStack} />
      <Root.Screen name="OnBoardingStack" component={OnBoardingStack} />
      <Root.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: "404" }}
      />
    </Root.Navigator>
  );
}

const RoutingScreen = () => {
  const [fetchProfileEnabled, setFetchProfileEnabled] = useState(false);
  const navigation = useNavigation<Nav>();
  const { isLoading, isError, error, data } = useProfile({
    fetchProfileEnabled,
  });
  const { isAuthenticated } = data || {};

  const [showOnBoarding, setShowOnBoarding] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    const initialLoad = async () => {
      try {
        const hasSeen = (await getData(HAS_SEEN_ONBOARDING)) || "false";
        setShowOnBoarding(hasSeen === "false");
      } catch (error: any) {
        setErrMsg(error?.message);
      } finally {
        setFetchProfileEnabled(true);
      }
    };
    initialLoad();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "ProtectedStack",
          },
        ],
      });
    }
  }, [isAuthenticated]);

  if (showOnBoarding) {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "OnBoardingStack",
        },
      ],
    });
  }
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (isError) {
    return <ErrorScreen errorMessage={error.message ?? errMsg} />;
  }
};

export type Nav = NativeStackNavigationProp<any, "Home">;
