import React, { useEffect } from "react";
import {
    Keyboard,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated, {
    SlideInDown,
    SlideOutDown,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import { useSnackbar } from "@/context/SnackbarContext";
import { useAppTheme } from "@/hooks/useThemeColor";

export function ThemedSnackbar() {
  const { snackbar, hideSnackbar } = useSnackbar();
  const theme = useAppTheme();

  // ---------------------------------------
  // KEYBOARD AWARE BOTTOM POSITION
  // ---------------------------------------
  const bottomOffset = useSharedValue(Platform.OS === "ios" ? 18 : 12);

  useEffect(() => {
    if (!snackbar.visible) {
      bottomOffset.value = withTiming(Platform.OS === "ios" ? 18 : 12, {
        duration: 180,
      });
      return;
    }

    let showSub: any;
    let hideSub: any;

    if (Platform.OS === "ios") {
      // iOS supports "will" events
      showSub = Keyboard.addListener("keyboardWillShow", (event) => {
        const height = event.endCoordinates?.height ?? 0;
        bottomOffset.value = withTiming(height + 20, { duration: 180 });
      });

      hideSub = Keyboard.addListener("keyboardWillHide", () => {
        bottomOffset.value = withTiming(18, { duration: 180 });
      });
    } else {
      // Android supports "did" events only
      showSub = Keyboard.addListener("keyboardDidShow", (event) => {
        const height = event.endCoordinates?.height ?? 0;
        bottomOffset.value = withTiming(height + 20, { duration: 100 });
      });

      hideSub = Keyboard.addListener("keyboardDidHide", () => {
        bottomOffset.value = withTiming(12, { duration: 120 });
      });
    }

    return () => {
      showSub?.remove?.();
      hideSub?.remove?.();
    };
  }, [snackbar.visible]);

  const animatedPosition = useAnimatedStyle(() => ({
    bottom: bottomOffset.value,
  }));

  if (!snackbar.visible) return null;

  // --------- TEXT COLOR LOGIC ---------
  const textColor =
    snackbar.type === "error"
      ? theme.error
      : snackbar.type === "warning"
      ? theme.warning
      : theme.text;

  return (
    <View style={StyleSheet.absoluteFill}>
      {snackbar.addOverlay ? (
        <Pressable style={styles.overlay} onPress={hideSnackbar} />
      ) : (
        <></>
      )}

      <Animated.View
        entering={SlideInDown.duration(200)}
        exiting={SlideOutDown.duration(180)}
        style={[styles.wrapper, animatedPosition]}
      >
        <Pressable
          onPress={hideSnackbar}
          style={[
            styles.snackbar,
            {
              backgroundColor: theme.card,
              borderColor: theme.border,
            },
          ]}
        >
          <Text style={[styles.text, { color: textColor }]}>
            {snackbar.message}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },
  wrapper: {
    position: "absolute",
    width: "100%",
    alignItems: "center",
    zIndex: 9999,
  },
  snackbar: {
    width: "94%",
    paddingVertical: 14,
    paddingHorizontal: 18,

    borderWidth: 1.2,
    borderRadius: 5,
    marginBottom: 10,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
