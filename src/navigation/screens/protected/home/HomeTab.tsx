import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";
import AccountScreen from "./AccountScreen";
import DiscoverScreen from "./DiscoverScreen";
import SavedScreen from "./SavedScreen";
import TicketsScreen from "./TicketsScreen";

const Tab = createBottomTabNavigator();

export default function HomeTab() {
  return (
    <Tab.Navigator
      initialRouteName="DiscoverScreen"
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
        name="DiscoverScreen"
        component={DiscoverScreen}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="home-variant"
                size={24}
                color={color}
              />
            ) : (
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={24}
                color={color}
              />
            ),
        }}
      />
      <Tab.Screen
        name="SavedScreen"
        component={SavedScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="cards-heart"
                size={24}
                color={color}
              />
            ) : (
              <MaterialCommunityIcons
                name="cards-heart-outline"
                size={24}
                color={color}
              />
            ),
        }}
      />
      <Tab.Screen
        name="TicketsScreen"
        component={TicketsScreen}
        options={{
          tabBarLabel: "Tickets",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="ticket-confirmation"
                size={24}
                color={color}
              />
            ) : (
              <MaterialCommunityIcons
                name="ticket-confirmation-outline"
                size={24}
                color={color}
              />
            ),
        }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <MaterialCommunityIcons name="account" size={24} color={color} />
            ) : (
              <MaterialCommunityIcons
                name="account-outline"
                size={24}
                color={color}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
