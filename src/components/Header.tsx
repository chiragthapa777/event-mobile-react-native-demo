import { useAppTheme } from "@/hooks/useThemeColor";
import React from "react";
import { ThemedText } from "./ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";

type Props = {
  title: string;
  items: React.ReactNode[];
};

export default function Header({ title, items }: Props) {
  const theme = useAppTheme();
  return (
    <ThemedView
      style={{
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: "space-between",
        alignItems:"center",
        borderBottomWidth: 0.5,
        borderBottomColor: theme.border,
      }}
    >
      <ThemedText type="thinTitle">{title}</ThemedText>
      <ThemedView style={{ flexDirection: "row", gap: 10 }}>
        {items.map((item) => item)}
      </ThemedView>
    </ThemedView>
  );
}
