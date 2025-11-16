import { useAppTheme } from '@/hooks/useThemeColor';
import React, { useState } from 'react';
import {
    Platform,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

type InputVariant = 'default' | 'outline' | 'filled';
type InputSize = 'sm' | 'md' | 'lg';

export interface ThemedInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;

  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;

  error?: string | boolean;
  success?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function ThemedInput({
  style,
  inputStyle,
  variant = 'default',
  size = 'md',
  fullWidth = true,
  error,
  success = false,
  leftIcon,
  rightIcon,
  ...props
}: ThemedInputProps) {
  const theme = useAppTheme();
  const [focused, setFocused] = useState(false);

  // Animation (scale & elevation on focus)
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Colors
  const baseBorder = theme.border;
  const focusedBorder = theme.primary;

  const borderColor =
    error ? theme.error : success ? theme.success : focused ? focusedBorder : baseBorder;

  const backgroundColor =
    variant === 'filled'
      ? theme.backgroundSoft
      : variant === 'outline'
      ? 'transparent'
      : theme.card;

  const paddingVertical = size === 'sm' ? 8 : size === 'lg' ? 14 : 12;
  const paddingHorizontal = size === 'sm' ? 10 : size === 'lg' ? 16 : 14;

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            borderColor,
            paddingVertical,
            paddingHorizontal,
            width: fullWidth ? '100%' : undefined,
          },
          style,
        ]}
      >
        {leftIcon ? <View style={styles.iconLeft}>{leftIcon}</View> : null}

        <TextInput
          placeholderTextColor={theme.textMuted}
          style={[
            styles.input,
            { color: theme.text },
            leftIcon ? { marginLeft: 6 } : null,
            rightIcon ? { marginRight: 6 } : null,
            inputStyle,
          ]}
          onFocus={() => {
            scale.value = withTiming(0.98, { duration: 80 });
            setFocused(true);
          }}
          onBlur={() => {
            scale.value = withTiming(1, { duration: 80 });
            setFocused(false);
          }}
          {...props}
        />

        {rightIcon ? <View style={styles.iconRight}>{rightIcon}</View> : null}
      </View>

      {typeof error === 'string' && (
        <Animated.Text style={[styles.errorText, { color: theme.error }]}>
          {error}
        </Animated.Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === 'android' ? 4 : 0,
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
  errorText: {
    marginTop: 0,
    marginBottom:2,
    fontSize: 13,
  },
});
