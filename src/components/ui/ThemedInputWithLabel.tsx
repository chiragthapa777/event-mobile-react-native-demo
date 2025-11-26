import { forwardRef } from "react";
import { StyleProp, TextInput, ViewStyle } from "react-native";
import ThemedInput, { ThemedInputProps } from "./ThemedInput";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const ThemedInputWithLabel = forwardRef<TextInput, ThemedInputProps & {
  label: string;
  containerStyles?: StyleProp<ViewStyle>;
}>(({ label, containerStyles, ...props }, ref) => {
  return (
    <ThemedView style={[{}, containerStyles]}>
      <ThemedText type="default" color="textMuted">
        {label}
      </ThemedText>
      <ThemedInput ref={ref} {...props} />
    </ThemedView>
  );
});

ThemedInputWithLabel.displayName = "ThemedInputWithLabel"
export default ThemedInputWithLabel