import ErrorScreen from "@/components/ErrorScreen";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import TicketAvailability from "@/components/TicketAvailability";
import { Divider } from "@/components/ui/Divider";
import IconButton from "@/components/ui/IconButton";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedScrollView } from "@/components/ui/ThemedScrollView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { APP_PADDING, blurhash } from "@/constants/Values";
import { useBottomSheet } from "@/context/BottomSheetContext";
import { useAppTheme } from "@/hooks/useThemeColor";
import { EventByIdApi } from "@/services/api/eventApiService";
import { Event } from "@/types/event";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React, { useCallback, useMemo } from "react";
import { Dimensions, StyleSheet, useColorScheme } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

type Props = NativeStackScreenProps<any, any>;
const width = Dimensions.get("window").width;

export default function EventDetailScreen({ route }: Props) {
  const { params } = route;
  const theme = useAppTheme();
  const scheme = useColorScheme();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const bottomSheet = useBottomSheet();
  const { data, isLoading, error } = useQuery<Event>({
    queryKey: ["event" + params?.id],
    queryFn: async () => {
      const resp = await EventByIdApi(params?.id);
      return resp.data;
    },
    staleTime: 10000,
    retry: false,
  });
  
  const images = useMemo(
    () =>
      [
        data?.eventPhoto?.link,
        data?.eventLayoutPhoto?.link,
        data?.eventBannerPhoto?.link,
      ].filter((l) => !!l),
    [data]
  );

  useFocusEffect(
    useCallback(() => {
      return bottomSheet.close;
    }, [])
  );

  const handleCheckAvailability = () => {
    if (!data) return;
    bottomSheet.show({
      node: <TicketAvailability event={data} />,
      option: {
        snapPoints: ["50%"],
      },
    });
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen errorMessage={error.message} />;
  return (
    <ThemedSafeAreaView
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
    >
      <Header
        withGoBack
        size="sm"
        items={[
          <IconButton
            size={35}
            icon={
              <Ionicons name="heart-outline" size={24} color={theme.text} />
            }
            key={"heart"}
          />,
          <IconButton
            size={35}
            icon={
              <Ionicons name="share-outline" size={24} color={theme.text} />
            }
            key={"share"}
          />,
        ]}
      />
      <ThemedScrollView style={{ flex: 1 }}>
        <Carousel
          ref={ref}
          style={{ width, height: width / 2 }}
          data={images}
          width={width}
          onProgressChange={progress}
          renderItem={({ index }) => (
            <Image
              source={{
                uri: images[index],
              }}
              style={{
                width: width,
                borderRadius: 10,
                height: width / 2,
                backgroundColor: "#0553",
                marginBottom: 8,
              }}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={300}
            />
          )}
        />
        <ThemedView
          style={{
            padding: APP_PADDING,
          }}
        >
          <ThemedText type="subtitle">{data?.name}</ThemedText>
          <ThemedText color="textMuted">{data?.venue}</ThemedText>
          <ThemedText color="textMuted">{data?.date}</ThemedText>
        </ThemedView>
        <Divider thickness={1} />
        <ThemedView
          style={{
            padding: APP_PADDING,
          }}
        >
          <ThemedText type="medium">Overview</ThemedText>
          <ThemedText color="textMuted">{data?.description}</ThemedText>
        </ThemedView>
        <Divider thickness={1} />
        <ThemedView
          style={{
            padding: APP_PADDING,
          }}
        >
          <ThemedText type="medium">Terms and Conditions</ThemedText>
          <ThemedText color="textMuted">{data?.termsAndCondition}</ThemedText>
        </ThemedView>
        <Divider thickness={1} />
        <ThemedView
          style={{
            padding: APP_PADDING,
            height: 250,
            gap: 5,
            marginBottom: 200,
          }}
        >
          <ThemedText type="medium">
            Location \n get address from lng lat
          </ThemedText>
          <MapView
            style={{ width: "100%", height: "100%" }}
            provider={PROVIDER_GOOGLE}
            userInterfaceStyle={scheme === "dark" ? "dark" : "light"}
            initialRegion={{
              latitude: Number(data?.lat || 0),
              longitude: Number(data?.lng || 0),
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(data?.lat || 0),
                longitude: Number(data?.lng || 0),
              }}
              title={data?.venue}
              description=""
            />
          </MapView>
        </ThemedView>
      </ThemedScrollView>
      <ThemedView
        style={{
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: theme.border,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: APP_PADDING,
          paddingVertical: APP_PADDING / 2,
        }}
      >
        <ThemedView
          style={{
            alignItems: "center",
          }}
        >
          <ThemedText>Starting from Rs 750</ThemedText>
        </ThemedView>
        <ThemedButton
          size="sm"
          title="Check availability"
          onPress={handleCheckAvailability}
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}
