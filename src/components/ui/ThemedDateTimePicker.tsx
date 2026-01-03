import { paddingHorizontal, paddingVertical } from "@/constants/Values";
import { useAppTheme } from "@/hooks/useThemeColor";
import { format } from "date-fns";
import React, { useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ThemedText } from "./ThemedText";

type InputVariant = "default" | "outline" | "filled";
type InputSize = "sm" | "md" | "lg";

type Props = {
  mode?: "time" | "date" | "datetime";
  error?: string;
  variant?: InputVariant;
  size?: InputSize;
  fullWidth?: boolean;
  style?: ViewStyle;
  onChange?: (date: Date) => void;
  value: Date;
};

export default function ThemedDateTimePicker({
  mode = "date",
  value,
  error,
  variant = "default",
  size = "md",
  fullWidth = true,
  style,
  onChange,
}: Props) {
  const [show, setShow] = useState(false);
  const theme = useAppTheme();
  const scheme = useColorScheme();

  const borderColor = useMemo(() => {
    if (error) {
      return theme.error;
    }
    return theme.border;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const backgroundColor =
    variant === "filled"
      ? theme.backgroundSoft
      : variant === "outline"
      ? "transparent"
      : theme.card;

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date: Date) => {
    if (onChange) {
      onChange(date);
    }
    hideDatePicker();
  };

  return (
    <>
      <DateTimePickerModal
        isVisible={show}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        themeVariant={scheme === "dark" ? "dark" : "light"}
        isDarkModeEnabled={true}
        date={value}
      />
      <Pressable
        style={[
          styles.container,
          {
            backgroundColor,
            borderColor,
            paddingVertical: paddingVertical[size],
            paddingHorizontal: paddingHorizontal[size],
            width: fullWidth ? "100%" : undefined,
          },
          style,
        ]}
        onPress={() => {
          setShow(!show);
        }}
      >
        <ThemedText>{format(value, "dd MMMM yyyy")}</ThemedText>
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
  container: {
    width: "100%",
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
