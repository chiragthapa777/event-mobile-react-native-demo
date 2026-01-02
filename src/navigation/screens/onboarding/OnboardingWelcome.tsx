import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { APP_HORIZONTAL_PADDING } from "@/constants/Values";
import { Nav } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

export default function OnboardingWelcome() {
  const navigation = useNavigation<Nav>();
  const handleNext = () => {
    navigation.navigate("OnboardingFeature");
  };

  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Welcome 👋
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Your personal event booking companion. Explore concerts, shows and
          experiences near you.
        </ThemedText>
      </ThemedView>

      <ThemedButton title="Next" size="lg" fullWidth onPress={handleNext} />
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "space-between",
  },
  content: {
    marginTop: 50,
    alignItems: "center",
    paddingHorizontal: APP_HORIZONTAL_PADDING,
  },
  title: {
    textAlign: "center",
  },
  subtitle: {
    marginTop: 12,
    textAlign: "center",
    fontSize: 16,
  },
});
