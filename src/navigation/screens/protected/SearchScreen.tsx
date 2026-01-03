import ThemedInput from "@/components/ui/ThemedInput";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { APP_HORIZONTAL_PADDING } from "@/constants/Values";
import { useSearch } from "@/context/SearchContext";
import { useAppTheme } from "@/hooks/useThemeColor";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";

export default function SearchScreen() {
  const navigation = useNavigation();
  const theme = useAppTheme();
  const { setSearch, search } = useSearch();
  const searchRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState(search);

  useEffect(() => {
    searchRef?.current?.focus();
  }, []);

  const handleSubmit = () => {
    setSearch(searchText.trim());
    navigation.goBack();
  };

  return (
    <ThemedSafeAreaView
      style={{
        flex: 1,
        gap: 10,
        padding: APP_HORIZONTAL_PADDING,
      }}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText type="subtitle">Search</ThemedText>
        <AntDesign
          name="close"
          size={24}
          color={theme.text}
          onPress={navigation.goBack}
        />
      </ThemedView>
      <ThemedInput
        variant="filled"
        size="lg"
        ref={searchRef}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={handleSubmit}
        placeholder="Search events..."
        returnKeyType="search"
        style={{
          backgroundColor: theme.card,
        }}
      />
    </ThemedSafeAreaView>
  );
}
