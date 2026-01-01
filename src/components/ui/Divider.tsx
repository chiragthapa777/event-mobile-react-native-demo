import { useAppTheme } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type DividerProps = {
  thickness?: number; // line height
  style?: ViewStyle;
};

export function Divider({
  thickness = StyleSheet.hairlineWidth,
  style,
}: DividerProps) {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.divider,
        {
          height: thickness,
          backgroundColor: theme.border,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 10,
  },
});
