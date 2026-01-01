import React from "react";
import {
  StyleProp,
  ViewStyle
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";


import { useAppTheme } from "@/hooks/useThemeColor";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function ThemedKeyboardAvoidingView({
  children,
  style,
  contentContainerStyle
}: Props) {
  const theme = useAppTheme();

  return (
    <KeyboardAwareScrollView
        bottomOffset={50}
        style={style}
        contentContainerStyle={contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}