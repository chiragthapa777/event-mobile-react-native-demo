import { APP_PADDING } from "@/constants/Values";
import { useAppTheme } from "@/hooks/useThemeColor";
import { Nav } from "@/navigation";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import IconButton from "./ui/IconButton";
import { TextType, ThemedText } from "./ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";

type HeaderSize = "sm" | "md";

type Props = {
  title?: string;
  items?: React.ReactNode[];
  withGoBack?: boolean;
  size?: HeaderSize;
};

const styleValues: Record<
  HeaderSize,
  {
    paddingVertical: number;
    textType: TextType;
    buttonSize: number;
    buttonIconSize: number;
  }
> = {
  md: {
    paddingVertical: 5,
    textType: "thinTitle",
    buttonSize: 45,
    buttonIconSize: 24,
  },
  sm: {
    paddingVertical: 0,
    textType: "default",
    buttonSize: 35,
    buttonIconSize: 24,
  },
};

export default function Header({
  title = "",
  items = [],
  withGoBack = false,
  size = "md",
}: Props) {
  const theme = useAppTheme();
  const navigation = useNavigation<Nav>();
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        paddingLeft: withGoBack ? 8 : APP_PADDING,
        paddingVertical: styleValues[size].paddingVertical,
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
            size={styleValues[size].buttonSize}
            icon={
              <Feather
                name="chevron-left"
                size={styleValues[size].buttonIconSize}
                color={theme.text}
                key={"bell"}
              />
            }
            key={"bell"}
            onPress={navigation.goBack}
          />
        )}
        <ThemedText type={styleValues[size].textType}>{title}</ThemedText>
      </ThemedView>
      <ThemedView
        style={{
          flexDirection: "row",
          gap: 10,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {items.map((item) => item)}
      </ThemedView>
    </ThemedView>
  );
}
