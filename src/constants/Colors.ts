// Primary should be slightly purplish
const primaryLight = '#7C4DFF';   // Deep Purple A200
const primaryDark = '#B388FF';    // Lighter purple shade

// Secondary accent (modern blue)
const secondaryLight = '#2979FF';
const secondaryDark = '#82B1FF';

export const Colors = {
  light: {
    // Brand colors
    primary: primaryLight,
    secondary: secondaryLight,

    // Base UI
    text: '#11181C',
    textMuted: '#687076',
    background: '#FFFFFF',
    backgroundSoft: '#F5F6FA',
    card: '#FFFFFF',
    border: '#E1E5EA',

    // Navigation & icons
    tint: primaryLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primaryLight,

    // Utility colors
    success: '#4CAF50',
    warning: '#FB8C00',
    error: '#E53935',
  },

  dark: {
    // Brand colors
    primary: primaryDark,
    secondary: secondaryDark,

    // Base UI
    text: '#ECEDEE',
    textMuted: '#9BA1A6',
    background: '#151718',
    backgroundSoft: '#1E2022',
    card: '#1F1F23',
    border: '#2A2C2E',

    // Navigation & icons
    tint: primaryDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryDark,

    // Utility colors
    success: '#66BB6A',
    warning: '#FFA726',
    error: '#EF5350',
  },
};

export type AppColorTheme = {
  primary: string;
  secondary: string;

  text: string;
  textMuted: string;
  background: string;
  backgroundSoft: string;
  card: string;
  border: string;

  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;

  success: string;
  warning: string;
  error: string;
};

export type AppColorNames = keyof AppColorTheme

export type AppColors = {
  light: AppColorTheme;
  dark: AppColorTheme;
};

