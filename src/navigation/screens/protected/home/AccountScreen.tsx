import Header from "@/components/Header";
import { Divider } from "@/components/ui/Divider";
import IconButton from "@/components/ui/IconButton";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedScrollView } from "@/components/ui/ThemedScrollView";
import Tile from "@/components/ui/Tile";
import { useLogout } from "@/hooks/authHooks";
import { useAppTheme } from "@/hooks/useThemeColor";
import Feather from "@expo/vector-icons/Feather";
import React from "react";

type Props = {};

export default function AccountScreen({}: Props) {
  const logout = useLogout();
  const theme = useAppTheme();
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
          />,
        ]}
      />
      <ThemedScrollView style={{ flex: 1 }}>
        <Tile
          title={"Logout"}
          leftIcon={
            <Feather name="log-out" size={20} color={theme.text} key={"bell"} />
          }
          onPress={logout}
        />
        <Divider />
      </ThemedScrollView>
    </ThemedSafeAreaView>
  );
}
