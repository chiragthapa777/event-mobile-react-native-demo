import { AppColorNames } from "@/constants/Colors";
import { useAppTheme } from "@/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import { SymbolWeight } from "expo-symbols";
import { useState } from "react";
import { StyleProp, TextStyle } from "react-native";

type Props = {
  size?: number;
  color?: AppColorNames;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  onChange?: (hide: boolean) => void;
  initialHide?: boolean;
};

export default function EyeToggleIcon({
  size = 24,
  color = "icon",
  style,
  onChange,
  initialHide = true,
}: Props) {
  const theme = useAppTheme();
  const [hide, setHide] = useState<boolean>(initialHide);
  const toggleHide = () => {
    setHide(!hide);
    if (onChange) {
      onChange(!hide);
    }
  };

  if (hide) {
    return (
      <Feather
        color={theme[color]}
        size={size}
        name="eye"
        style={style}
        onPress={toggleHide}
      />
    );
  }
  return (
    <Feather
      color={theme[color]}
      size={size}
      name="eye-off"
      style={style}
      onPress={toggleHide}
    />
  );
}
