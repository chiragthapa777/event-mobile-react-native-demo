import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import AuthStack from "./screens/auth/AuthStack";
import { Explore } from "./screens/Explore";
import { Home } from "./screens/Home";
import { NotFound } from "./screens/NotFound";
import OnBoardingStack from "./screens/onboarding/OnBoardingStack";

// ---------------------
// Bottom Tabs
// ---------------------
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="paperplane.fill" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// ---------------------
// Root Stack
// ---------------------
const Root = createNativeStackNavigator();

export default function RootNavigator({
  hasSeenOnboarding,
  isLoggedIn,
}: {
  hasSeenOnboarding: boolean;
  isLoggedIn: boolean;
}) {
  return (
    <Root.Navigator
      initialRouteName={"AuthStack"}
      screenOptions={{ headerShown: false }}
    >
      <Root.Screen name="HomeTabs" component={HomeTabs} />
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

export type Nav = NativeStackNavigationProp<any, "Home">;
