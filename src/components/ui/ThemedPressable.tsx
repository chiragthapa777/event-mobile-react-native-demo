import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, PressableProps, StyleProp, ViewStyle } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type HapticType = "light" | "medium" | "heavy" | "selection" | "none";

const HAPTIC_MAP: Record<Exclude<HapticType, "none">, () => Promise<void>> = {
  light: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  selection: () => Haptics.selectionAsync(),
};

export type ThemedPressableProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  haptic?: HapticType;
  style?: StyleProp<ViewStyle>;
};

export function ThemedPressable({
  style,
  lightColor,
  darkColor,
  haptic = "light",
  onPress,
  ...rest
}: ThemedPressableProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  const handlePress = (event: any) => {
    if (haptic !== "none") {
      HAPTIC_MAP[haptic]?.();
    }

    onPress?.(event);
  };

  return (
    <Pressable
      {...rest}
      onPress={handlePress}
      style={[{ backgroundColor }, style]}
    />
  );
}
