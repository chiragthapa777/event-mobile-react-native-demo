import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { ThemedSnackbar } from "./components/ui/ThemedSnackbar";
import { Colors } from "./constants/Colors";
import { SnackbarProvider } from "./context/SnackbarContext";
import RootNavigator from "./navigation";
import { navigationRef } from "./navigation/navigationRef";

SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

export function App() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);

  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function appStartUpTasks() {
      try {
        // do app start up task
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    appStartUpTasks();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!loaded || !isReady) {
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
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <SnackbarProvider>
          <NavigationContainer
            ref={navigationRef}
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
      </KeyboardProvider>
    </QueryClientProvider>
  );
}
