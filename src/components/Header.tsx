import { APP_HORIZONTAL_PADDING } from "@/constants/Values";
import { useAppTheme } from "@/hooks/useThemeColor";
import { Nav } from "@/navigation";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import IconButton from "./ui/IconButton";
import { ThemedText } from "./ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";

type Props = {
  title?: string;
  items?: React.ReactNode[];
  withGoBack?: boolean;
};

export default function Header({
  title = "",
  items = [],
  withGoBack = false,
}: Props) {
  const theme = useAppTheme();
  const navigation = useNavigation<Nav>();
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        paddingLeft: withGoBack ? 8 : APP_HORIZONTAL_PADDING,
        paddingVertical: 5,
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: theme.border,
      }}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >
        {withGoBack && (
          <IconButton
            icon={
              <Feather
                name="chevron-left"
                size={24}
                color={theme.text}
                key={"bell"}
              />
            }
            key={"bell"}
            onPress={navigation.goBack}
          />
        )}
        <ThemedText type="thinTitle">{title}</ThemedText>
      </ThemedView>
      <ThemedView style={{ flexDirection: "row", gap: 10 }}>
        {items.map((item) => item)}
      </ThemedView>
    </ThemedView>
  );
}
