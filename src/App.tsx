import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

import { ThemedSnackbar } from "./components/ui/ThemedSnackbar";
import { Colors } from "./constants/Colors";
import { SnackbarProvider } from "./context/SnackbarContext";
import RootNavigator from "./navigation";

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const theme =
    colorScheme === "dark"
      ? {
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            primary: Colors[colorScheme ?? "light"].tint,
          },
        }
      : {
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            primary: Colors[colorScheme ?? "light"].tint,
          },
        };

  return (
    <SnackbarProvider>
      <NavigationContainer
        theme={theme}
        linking={{
          enabled: true,
          prefixes: ["helloworld://"],
        }}
        onReady={() => {
          SplashScreen.hideAsync();
        }}
      >
        <RootNavigator />
      </NavigationContainer>
      <ThemedSnackbar />
    </SnackbarProvider>
  );
}
