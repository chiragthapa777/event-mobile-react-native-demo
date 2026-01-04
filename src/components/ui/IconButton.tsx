import { useAppTheme } from "@/hooks/useThemeColor";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";

type Props = {
  icon: React.ReactNode;
  size?: number;
  style?: ViewStyle | ViewStyle[];
  bgBlock?: boolean;
} & Omit<PressableProps, "style">;

export default function IconButton({
  icon,
  size = 45,
  style,
  onPress,
  bgBlock = false,
  ...props
}: Props) {
  const theme = useAppTheme();

  return (
    <Pressable
      {...props}
      onPress={(event) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(event);
      }}
      style={({ pressed }) => [
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: pressed
            ? `${theme.textMuted}1A` // only when pressed
            : bgBlock
            ? theme.backgroundOverlay
            : "transparent",
        },
        style,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
  },
});
