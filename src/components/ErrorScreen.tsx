import { Nav } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ThemedButton } from "./ui/ThemedButton";
import { ThemedSafeAreaView } from "./ui/ThemedSafeAreaView";
import { ThemedText } from "./ui/ThemedText";

export default function ErrorScreen({
  errorMessage,
}: {
  errorMessage: string;
}) {
  const navigation = useNavigation<Nav>();
  return (
    <ThemedSafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText color="error">{errorMessage}</ThemedText>
      <ThemedButton
        onPress={() => {
          navigation.goBack();
        }}
        title="Go back"
      />
    </ThemedSafeAreaView>
  );
}
