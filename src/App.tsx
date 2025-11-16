import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

import { useEffect, useState } from "react";
import { ThemedSnackbar } from "./components/ui/ThemedSnackbar";
import { Colors } from "./constants/Colors";
import { HAS_SEEN_ONBOARDING } from "./constants/StoreKey";
import { SnackbarProvider } from "./context/SnackbarContext";
import RootNavigator from "./navigation";
import { getData } from "./services/asyncStore";

SplashScreen.preventAutoHideAsync();

export function App() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(false);

  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function appStartUpTasks() {
      try {
        const hasSeen = await getData(HAS_SEEN_ONBOARDING);
        if (hasSeen) {
          setHasSeenOnboarding(hasSeen === "true");
        }
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
        <RootNavigator
          hasSeenOnboarding={hasSeenOnboarding}
          isLoggedIn={false}
        />
      </NavigationContainer>
      <ThemedSnackbar />
    </SnackbarProvider>
  );
}
