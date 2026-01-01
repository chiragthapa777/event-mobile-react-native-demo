import { useAppTheme } from "@/hooks/useThemeColor";
import { format } from "date-fns";
import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, ViewStyle } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ThemedText } from "./ThemedText";

type InputVariant = "default" | "outline" | "filled";
type InputSize = "sm" | "md" | "lg";

type Props = {
  mode: "time" | "date" | "datetime";
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  error?: string;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  style?: ViewStyle;
};

export default function ThemedDateTimePicker({
  mode,
  date,
  setDate,
  error,
  variant = "default",
  size = "md",
  fullWidth = true,
  style,
}: Props) {
  const [show, setShow] = useState(false);
  const theme = useAppTheme();

  // Colors
  const baseBorder = theme.border;

  const borderColor = error ? theme.error : baseBorder;

  const backgroundColor =
    variant === "filled"
      ? theme.backgroundSoft
      : variant === "outline"
      ? "transparent"
      : theme.card;

  const paddingVertical = size === "sm" ? 8 : size === "lg" ? 14 : 12;
  const paddingHorizontal = size === "sm" ? 10 : size === "lg" ? 16 : 14;

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor,
            borderColor,
            paddingVertical,
            paddingHorizontal,
            width: fullWidth ? "100%" : undefined,
          },
          style,
        ]}
        onPress={() => {
          setShow(!show);
        }}
      >
        <ThemedText>{format(date, "dd MMMM yyyy")}</ThemedText>
      </Pressable>
      {error && (
        <ThemedText style={[styles.errorText, { color: theme.error }]}>
          {error}
        </ThemedText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  container: {
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === "android" ? 4 : 0,
  },
  iconLeft: {
    marginRight: 6,
  },
  iconRight: {
    marginLeft: 6,
  },
  errorText: {
    marginTop: 0,
    marginBottom: 2,
    fontSize: 13,
  },
});
