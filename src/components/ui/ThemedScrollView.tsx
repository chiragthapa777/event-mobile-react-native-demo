import React from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedScrollViewProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  lightColor?: string;
  darkColor?: string;
  showsVerticalScrollIndicator?: boolean;
};

export function ThemedScrollView({
  children,
  style,
  contentContainerStyle,
  lightColor,
  darkColor,
  showsVerticalScrollIndicator = false,
}: ThemedScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <ScrollView
      style={[{ backgroundColor }, style]}
      contentContainerStyle={[
        { flexGrow: 1 }, // ★ THIS FIXES ANDROID SCROLLING
        contentContainerStyle,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    >
      {children}
    </ScrollView>
  );
}
