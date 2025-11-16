import React from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    ViewStyle,
} from "react-native";

import { useAppTheme } from "@/hooks/useThemeColor";
import * as Haptics from "expo-haptics";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";
type HapticType =
  | "light"
  | "medium"
  | "heavy"
  | "success"
  | "warning"
  | "error"
  | "none";

export interface ThemedButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;

  disabled?: boolean;
  loading?: boolean;

  hapticType?: HapticType;
}

export function ThemedButton({
  title,
  onPress,
  style,
  textStyle,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  hapticType = "light",
}: ThemedButtonProps) {
  const theme = useAppTheme();

  // Animation shared value (scale)
  const scale = useSharedValue(1);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Trigger haptics
  const triggerHaptics = () => {
    if (hapticType === "none") return;

    const impactMap = {
      light: Haptics.ImpactFeedbackStyle.Light,
      medium: Haptics.ImpactFeedbackStyle.Medium,
      heavy: Haptics.ImpactFeedbackStyle.Heavy,
      success: Haptics.ImpactFeedbackStyle.Light,
      warning: Haptics.ImpactFeedbackStyle.Medium,
      error: Haptics.ImpactFeedbackStyle.Heavy,
      none: null,
    };

    if (impactMap[hapticType]) {
      return Haptics.impactAsync(impactMap[hapticType]);
    }

    if (hapticType === "success")
      return Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    if (hapticType === "warning")
      return Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Warning
      );
    if (hapticType === "error")
      return Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const handlePress = () => {
    triggerHaptics();
    onPress?.();
  };

  // Button style logic
  const backgroundColor = (() => {
    if (variant === "primary") return theme.primary;
    if (variant === "secondary") return theme.secondary;
    if (variant === "danger") return theme.error;
    if (variant === "outline" || variant === "ghost") return "transparent";
    return theme.primary;
  })();

  const textColor = (() => {
    if (variant === "outline" || variant === "ghost") return theme.text;
    return "#fff";
  })();

  const borderColor = (() => {
    if (variant === "outline") return theme.border;
    if (variant === "danger") return theme.error;
    return "transparent";
  })();

  const paddingVertical = size === "sm" ? 8 : size === "lg" ? 16 : 12;
  const paddingHorizontal = size === "sm" ? 14 : size === "lg" ? 22 : 18;

  return (
    <Pressable
      onPress={disabled || loading ? undefined : handlePress}
      onPressIn={() => {
        if (!disabled && !loading) {
          scale.value = withTiming(0.991, { duration: 80 });
        }
      }}
      onPressOut={() => {
        scale.value = withTiming(1, { duration: 80 });
      }}
      style={{ width: fullWidth ? "100%" : undefined }}
    >
      <Animated.View
        style={[
          styles.button,
          {
            backgroundColor,
            borderColor,
            paddingVertical,
            paddingHorizontal,
            opacity: disabled ? 0.5 : 1,
          },
          style,
          animatedStyle,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {title}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
