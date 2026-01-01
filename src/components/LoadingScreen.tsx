import React from "react";
import { ThemedSafeAreaView } from "./ui/ThemedSafeAreaView";
import { ThemedText } from "./ui/ThemedText";

export default function LoadingScreen() {
  return (
    <ThemedSafeAreaView
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText>Loading...</ThemedText>
    </ThemedSafeAreaView>
  );
}
