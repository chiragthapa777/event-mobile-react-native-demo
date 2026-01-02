import { useAppTheme } from "@/hooks/useThemeColor";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { StyleSheet, View } from "react-native";
import { Divider } from "./Divider";
import ThemedBottomSheet from "./ThemedBottomSheet";
import { ThemedButton } from "./ThemedButton";
import { ThemedText } from "./ThemedText";

export interface ConfirmationBottomSheetProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  confirmVariant?: "primary" | "danger";
}

const ConfirmationBottomSheet = forwardRef<
  BottomSheet,
  ConfirmationBottomSheetProps
>(
  (
    {
      title,
      message,
      confirmText = "Confirm",
      cancelText = "Cancel",
      onConfirm,
      onCancel,
      confirmVariant = "primary",
    },
    ref
  ) => {
    const theme = useAppTheme();

    const handleConfirm = () => {
      onConfirm();
      // @ts-ignore
      ref?.current?.close();
    };

    const handleCancel = () => {
      onCancel?.();
      // @ts-ignore
      ref?.current?.close();
    };

    return (
      <ThemedBottomSheet
        ref={ref}
        snapPoints={["35%"]}
        enableDynamicSizing={false}
      >
        <View style={styles.header}>
          <ThemedText type="subtitle" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText style={[styles.message, { color: theme.textMuted }]}>
            {message}
          </ThemedText>
        </View>

        <Divider />

        <View style={styles.buttonContainer}>
          <ThemedButton
            title={cancelText}
            variant="ghost"
            onPress={handleCancel}
            fullWidth
          />
          <ThemedButton
            title={confirmText}
            variant={confirmVariant}
            onPress={handleConfirm}
            fullWidth
            hapticType="medium"
          />
        </View>
      </ThemedBottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 12,
    marginTop: 20,
  },
});

ConfirmationBottomSheet.displayName = "ConfirmationBottomSheet";

export default ConfirmationBottomSheet;
