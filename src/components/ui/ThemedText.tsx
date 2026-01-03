import { StyleSheet, Text, type TextProps } from "react-native";

import { AppColorNames } from "@/constants/Colors";
import { useAppTheme } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  type?:
    | "default"
    | "title"
    | "small"
    | "largeThinTitle"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "medium"
    | "thinTitle";
  color?: AppColorNames;
};

export function ThemedText({
  style,
  type = "default",
  color = "text",
  ...rest
}: ThemedTextProps) {
  const textColor = useAppTheme()[color];

  return <Text style={[{ color: textColor }, styles[type], style]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
    lineHeight: 22,
  },
  medium: {
    fontSize: 18,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 32,
  },
  thinTitle: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
  },
  largeThinTitle: {
    fontSize: 36,
    fontWeight: "400",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
