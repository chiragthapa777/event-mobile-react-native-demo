import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import React, { useCallback, useMemo } from "react";
import { ActivityIndicator, RefreshControl } from "react-native";

import { ThemedPressable } from "@/components/ui/ThemedPressable";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { APP_HORIZONTAL_PADDING, blurhash } from "@/constants/Values";
import { useSearch } from "@/context/SearchContext";
import { useInfiniteEvents } from "@/hooks/eventHooks";
import { useAppTheme } from "@/hooks/useThemeColor";
import { Nav } from "@/navigation";
import { Event } from "@/types/event";

export default function DiscoverScreen() {
  const theme = useAppTheme();
  const { search, setSearch } = useSearch();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteEvents({
    limit: 5,
    search,
  });

  const allEvents = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.list) ?? [];
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleSearch = useCallback((searchText: string) => {
    setSearch(searchText);
  }, []);

  const renderFooter = useCallback(() => {
    if (!isFetchingNextPage) return null;
    return (
      <ThemedView style={{ padding: 20, alignItems: "center" }}>
        <ActivityIndicator size="small" color={theme.primary} />
      </ThemedView>
    );
  }, [isFetchingNextPage, theme.primary]);

  if (isLoading) {
    return (
      <ThemedSafeAreaView>
        <Header onSearch={handleSearch} />
        <ThemedView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={theme.primary} />
          <ThemedText style={{ marginTop: 10 }}>Loading events...</ThemedText>
        </ThemedView>
      </ThemedSafeAreaView>
    );
  }

  if (error && allEvents.length === 0) {
    return (
      <ThemedSafeAreaView>
        <Header onSearch={handleSearch} />
        <ThemedView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: APP_HORIZONTAL_PADDING,
          }}
        >
          <ThemedText color="error">Failed to load events.</ThemedText>
          <ThemedPressable
            onPress={handleRefresh}
            style={{ marginTop: 10, padding: 10 }}
          >
            <ThemedText color="primary">Try Again</ThemedText>
          </ThemedPressable>
        </ThemedView>
      </ThemedSafeAreaView>
    );
  }

  if (!allEvents.length && !isLoading) {
    return (
      <ThemedSafeAreaView>
        <Header onSearch={handleSearch} />
        <ThemedView
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ThemedText>No events found</ThemedText>
        </ThemedView>
      </ThemedSafeAreaView>
    );
  }

  return (
    <ThemedSafeAreaView>
      <Header onSearch={handleSearch} />

      <FlashList
        data={allEvents}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: APP_HORIZONTAL_PADDING,
          paddingTop: 10,
          paddingBottom: 20,
        }}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            tintColor={theme.primary}
          />
        }
      />
    </ThemedSafeAreaView>
  );
}

const EventCard = React.memo(({ event }: { event: Event }) => {
  const theme = useAppTheme();

  return (
    <ThemedPressable
      style={{
        width: "100%",
        marginBottom: 16,
      }}
    >
      <Image
        source={{ uri: event.eventPhoto?.link }}
        style={{
          width: "100%",
          height: 180,
          borderRadius: 10,
          backgroundColor: "#0553",
          marginBottom: 8,
        }}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={300}
      />

      <ThemedView
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginBottom: 4,
        }}
      >
        <ThemedText type="medium" style={{ flex: 1 }} numberOfLines={2}>
          {event.name}
        </ThemedText>

        <Ionicons name="share-outline" size={20} color={theme.text} />
        <Ionicons name="heart-outline" size={20} color={theme.text} />
      </ThemedView>

      <ThemedText color="textMuted" style={{ marginBottom: 2 }}>
        {formatDateTime(event.date)} · {event.venue}
      </ThemedText>

      <ThemedText color="textMuted" type="defaultSemiBold">
        {getLowestPrice(event.tickets)}
      </ThemedText>
    </ThemedPressable>
  );
});

EventCard.displayName = "EventCard";

const Header = React.memo(
  ({ onSearch }: { onSearch: (text: string) => void }) => {
    const theme = useAppTheme();
    const navigation = useNavigation<Nav>();
    const { search } = useSearch();

    return (
      <ThemedView
        style={{
          padding: APP_HORIZONTAL_PADDING - 5,
          paddingVertical: 5,
          gap: 10,
          width: "100%",
        }}
      >
        <ThemedPressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
          onPress={() => {
            // Handle location press if needed
          }}
        >
          <Ionicons name="location-outline" size={24} color={theme.text} />
          <ThemedText type="medium">Location</ThemedText>
          <Ionicons name="chevron-down" size={24} color={theme.text} />
        </ThemedPressable>

        <ThemedView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.card,
            borderRadius: 50,
          }}
        >
          <ThemedPressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              padding: 15,
              flex: 1,
              backgroundColor: "transparent",
            }}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <Ionicons name="search-outline" size={24} color={theme.text} />
            <ThemedText type="small" color="textMuted">
              {search ? search : "Find things to do"}
            </ThemedText>
          </ThemedPressable>

          <ThemedPressable
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderColor: theme.border,
              borderWidth: 1,
              borderRadius: 20,
              marginRight: 10,
              height: 40,
              width: 40,
              backgroundColor: "transparent",
            }}
            onPress={() => {
              // Handle filter press
            }}
          >
            <FontAwesome name="sliders" size={20} color={theme.text} />
          </ThemedPressable>
        </ThemedView>
      </ThemedView>
    );
  }
);

Header.displayName = "Header";

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }) +
    " · " +
    d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })
  );
}

function getLowestPrice(tickets: Event["tickets"]) {
  if (!tickets?.length) return "Free";
  return `Rs ${Math.min(...tickets.map((t) => Number(t.price)))}`;
}
