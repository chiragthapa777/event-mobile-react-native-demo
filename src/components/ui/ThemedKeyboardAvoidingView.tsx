import React from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from "react-native";

import { useAppTheme } from "@/hooks/useThemeColor";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  behavior?: "padding" | "height" | "position";
  enabled?: boolean;
  scroll?: boolean; // enable scroll when form is long
};

export function ThemedKeyboardAvoidingView({
  children,
  style,
  contentContainerStyle,
  behavior = Platform.OS === "ios" ? "padding" : "height",
  enabled = true,
  scroll = false,
}: Props) {
  const theme = useAppTheme();

  const Container = scroll ? ScrollView : React.Fragment;

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: theme.background },
        style,
      ]}
      behavior={behavior}
      enabled={enabled}
    >
      {scroll ? (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[
            { paddingBottom: 40 },
            contentContainerStyle,
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <Container>{children}</Container>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
