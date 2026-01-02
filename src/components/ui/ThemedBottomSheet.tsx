import { APP_HORIZONTAL_PADDING } from "@/constants/Values";
import { useAppTheme } from "@/hooks/useThemeColor";
import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useMemo } from "react";
import { Platform, StyleSheet } from "react-native";

export interface ThemedBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  scrollable?: boolean;
  index?: number;
}

const ThemedBottomSheet = forwardRef<BottomSheet, ThemedBottomSheetProps>(
  (
    {
      children,
      snapPoints: customSnapPoints,
      enableDynamicSizing = false,
      enablePanDownToClose = true,
      scrollable = false,
      index = -1,
    },
    ref
  ) => {
    const theme = useAppTheme();
    const snapPoints = useMemo(
      () => customSnapPoints || ["50%", "75%"],
      [customSnapPoints]
    );

    const ContentWrapper = scrollable ? BottomSheetScrollView : BottomSheetView;

    return (
      <BottomSheet
        ref={ref}
        index={index}
        snapPoints={enableDynamicSizing ? undefined : snapPoints}
        enableDynamicSizing={enableDynamicSizing}
        enablePanDownToClose={enablePanDownToClose}
        backgroundStyle={[
          styles.backgroundStyle,
          {
            backgroundColor: theme.background,
            borderColor: theme.border,
          },
        ]}
        handleIndicatorStyle={{
          backgroundColor: theme.textMuted,
        }}
      >
        <ContentWrapper
          style={[
            styles.contentContainer,
            { paddingBottom: Platform.OS === "ios" ? 34 : 24 },
          ]}
          contentContainerStyle={scrollable ? styles.scrollContent : undefined}
        >
          {children}
        </ContentWrapper>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  backgroundStyle: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: APP_HORIZONTAL_PADDING,
  },
  scrollContent: {
    paddingBottom: Platform.OS === "ios" ? 34 : 24,
  },
});

ThemedBottomSheet.displayName = "ThemedBottomSheet";

export default ThemedBottomSheet;
