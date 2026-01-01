import { useAppTheme } from "@/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import * as Haptics from "expo-haptics";
import React from "react";
import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type Props = {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: number;
  style?: ViewStyle | ViewStyle[];
} & Omit<PressableProps, "style">;

export default function Tile({
  title,
  leftIcon,
  rightIcon,
  size = 45,
  style,
  onPress,
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
          backgroundColor: pressed ? `${theme.textMuted}1A` : "transparent",
        },
        style,
      ]}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 20,
          backgroundColor: "transparent",
        }}
      >
        {leftIcon}
        <ThemedText>{title}</ThemedText>
      </ThemedView>
      {rightIcon ? (
        rightIcon
      ) : (
        <Feather name="chevron-right" color={theme.text} size={20} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
  },
});
