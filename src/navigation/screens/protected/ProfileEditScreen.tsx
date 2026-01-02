import Header from "@/components/Header";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import React from "react";

type Props = {};

export default function ProfileEditScreen({}: Props) {
  return (
    <ThemedSafeAreaView>
      <Header withGoBack />
      <ThemedText>ProfileEditScreen</ThemedText>
    </ThemedSafeAreaView>
  );
}
