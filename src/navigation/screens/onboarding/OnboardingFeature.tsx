import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { HAS_SEEN_ONBOARDING } from "@/constants/StoreKey";
import { APP_HORIZONTAL_PADDING } from "@/constants/Values";
import { useSnackbar } from "@/context/SnackbarContext";
import { Nav } from "@/navigation";
import { storeData } from "@/services/asyncStore";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

export default function OnboardingFeature() {
  const navigation = useNavigation<Nav>();
  const snackbar = useSnackbar();
  const handleNext = async () => {
    try {
      await storeData(HAS_SEEN_ONBOARDING, "true");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "AuthStack",
          },
        ],
      });
    } catch (error: any) {
      snackbar.showSnackbar(
        typeof error == "string" ? error : error?.message,
        "error",
        5,
        true
      );
    }
  };
  return (
    <ThemedSafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          App Features ✨
        </ThemedText>

        <ThemedView>
          <ThemedView style={styles.featureBox}>
            <ThemedText type="defaultSemiBold">🎟 Simple Booking</ThemedText>
            <ThemedText>
              Book events in just a few taps with a smooth interface.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.featureBox}>
            <ThemedText type="defaultSemiBold">🔥 Exclusive Offers</ThemedText>
            <ThemedText>
              Unlock early access and special deals on upcoming events.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.featureBox}>
            <ThemedText type="defaultSemiBold">
              📍 Personalized Suggestions
            </ThemedText>
            <ThemedText>
              Discover events based on your interests and location.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
      <ThemedButton
        title="Get Started"
        size="lg"
        fullWidth
        onPress={handleNext}
      />
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
    marginTop: 20,
    marginBottom: 10,
  },
  featureBox: {
    marginTop: 24,
  },
});
