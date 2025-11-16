import { useAppTheme } from '@/hooks/useThemeColor';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedSafeAreaViewProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  lightColor?: string;
  darkColor?: string;
};

export function ThemedSafeAreaView({
  children,
  style,
}: ThemedSafeAreaViewProps) {
  const theme = useAppTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor : theme.background }, style]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
