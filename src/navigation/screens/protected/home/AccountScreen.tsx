import Header from "@/components/Header";
import { Divider } from "@/components/ui/Divider";
import IconButton from "@/components/ui/IconButton";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedScrollView } from "@/components/ui/ThemedScrollView";
import Tile from "@/components/ui/Tile";
import { useConformationBottomSheet } from "@/context/BottomSheetConfirmationContext";
import { useLogout } from "@/hooks/authHooks";
import { useAppTheme } from "@/hooks/useThemeColor";
import { Nav } from "@/navigation";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function AccountScreen() {
  const logout = useLogout();
  const navigate = useNavigation<Nav>();
  const theme = useAppTheme();
  const { showConfirmation } = useConformationBottomSheet();

  const handleLogoutPress = () => {
    showConfirmation({
      title: "Logout",
      message:
        "Are you sure you want to logout? You will need to sign in again to access your account.",
      confirmText: "Logout",
      cancelText: "Cancel",
      confirmVariant: "danger",
      onConfirm: logout,
    });
  };

  return (
    <ThemedSafeAreaView>
      <Header
        title="Account"
        items={[
          <IconButton
            icon={
              <Feather name="bell" size={20} color={theme.text} key={"bell"} />
            }
            key={"bell"}
          />,
          <IconButton
            icon={<Feather name="settings" size={20} color={theme.text} />}
            key={"settings"}
            onPress={() => {
              navigate.navigate("ProfileEditScreen");
            }}
          />,
        ]}
      />
      <ThemedScrollView style={{ flex: 1 }}>
        <Tile
          title={"Logout"}
          leftIcon={
            <Feather name="log-out" size={20} color={theme.text} key={"bell"} />
          }
          onPress={handleLogoutPress}
        />
        <Divider />
      </ThemedScrollView>
    </ThemedSafeAreaView>
  );
}
