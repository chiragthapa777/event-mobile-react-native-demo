import { ThemedKeyboardAvoidingView } from "@/components/ui/ThemedKeyboardAvoidingView";
import { ThemedSafeAreaScrollView } from "@/components/ui/ThemedSafeAreaScrollView";
import { ThemedText } from "@/components/ui/ThemedText";
import React from "react";

export default function LoginScreen() {
  return (
    <ThemedSafeAreaScrollView>
      <ThemedKeyboardAvoidingView>
        <ThemedText>This is login screen</ThemedText>
      </ThemedKeyboardAvoidingView>
    </ThemedSafeAreaScrollView>
  );
}
