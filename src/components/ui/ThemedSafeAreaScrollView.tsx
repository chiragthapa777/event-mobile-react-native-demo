import React from 'react';
import {
    ScrollView,
    StyleProp,
    StyleSheet,
    ViewStyle,
} from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedSafeAreaScrollViewProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  lightColor?: string;
  darkColor?: string;
  showsVerticalScrollIndicator?: boolean;
};

export function ThemedSafeAreaScrollView({
  children,
  style,
  contentContainerStyle,
  lightColor,
  darkColor,
  showsVerticalScrollIndicator = false,
}: ThemedSafeAreaScrollViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView
        style={[{ backgroundColor }, style]}
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
