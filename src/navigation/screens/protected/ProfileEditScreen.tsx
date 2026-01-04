import ErrorScreen from "@/components/ErrorScreen";
import Header from "@/components/Header";
import LoadingScreen from "@/components/LoadingScreen";
import TakePictureAndUpload from "@/components/TakePictureAndUpload";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedKeyboardAvoidingView } from "@/components/ui/ThemedKeyboardAvoidingView";
import { ThemedPressable } from "@/components/ui/ThemedPressable";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { APP_PADDING, blurhash } from "@/constants/Values";
import { useBottomSheet } from "@/context/BottomSheetContext";
import { useProfile } from "@/hooks/authHooks";
import { useAppTheme } from "@/hooks/useThemeColor";
import { FileUpload, uploadFile } from "@/services/api/fileApiService";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";

type Props = {};
type fileOptionType = "camera" | "gallery" | null;
export default function ProfileEditScreen({}: Props) {
  const theme = useAppTheme();
  const { show, close } = useBottomSheet();
  const [fileOption, setFileOption] = useState<fileOptionType>(null);
  const { data, isLoading, error } = useProfile({ fetchProfileEnabled: true });
  const [uploadedFile, setUploadedFile] = useState<FileUpload>();
  const [imageUri, setImageUri] = useState<string | undefined>(
    data?.profile?.profile?.link
  );

  const openCamera = () => {
    show({
      node: (
        <TakePictureAndUpload close={close} setUploadedFile={setUploadedFile} />
      ),
      option: {
        snapPoints: ["85%"],
      },
    });
  };

  const openGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImageUri(selectedUri);

      // Upload the selected image
      try {
        const response = await uploadFile(selectedUri, "profile");
        if (response.success) {
          setUploadedFile(response.data);
          setImageUri(response.data.link);
          console.log("Gallery image uploaded successfully:", response.data);
        }
      } catch (error) {
        console.error("Failed to upload gallery image:", error);
        Alert.alert("Upload Error", "Failed to upload the selected image.");
      }
    }
  };

  useEffect(() => {
    if (fileOption) {
      if (fileOption === "camera") {
        openCamera();
      } else {
        openGallery();
      }
      setFileOption(null);
    }
  }, [fileOption, data?.profile?.id]);

  useEffect(() => {
    if (uploadedFile?.link) {
      setImageUri(uploadedFile.link);
    }
  }, [uploadedFile?.link]);

  const handleProfilePress = () => {
    show({
      node: <FileOption close={close} setFileOption={setFileOption} />,
    });
  };

  if (error) return <ErrorScreen errorMessage={error.message} />;

  if (isLoading) return <LoadingScreen />;

  return (
    <ThemedSafeAreaView>
      <Header withGoBack title="Update Profile" />

      <ThemedKeyboardAvoidingView
        contentContainerStyle={{ padding: APP_PADDING }}
      >
        <ThemedPressable
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            overflow: "hidden",
            marginHorizontal: "auto",
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: theme.border,
          }}
          onPress={handleProfilePress}
        >
          <Image
            source={{ uri: imageUri }}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#0553",
            }}
            placeholder={{ blurhash: blurhash }}
            contentFit="cover"
            transition={300}
          />
        </ThemedPressable>
      </ThemedKeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}

const FileOption = ({
  setFileOption,
  close,
}: {
  setFileOption: (opt: fileOptionType) => void;
  close: () => void;
}) => {
  return (
    <ThemedView style={{ gap: 10 }}>
      <ThemedText style={{ textAlign: "center" }}>
        Update you profile picture
      </ThemedText>
      <ThemedButton
        title="Take a Picture"
        onPress={() => {
          setFileOption("camera");
          close();
        }}
      />
      <ThemedButton
        title="Choose from Gallery"
        onPress={() => {
          setFileOption("gallery");
          close();
        }}
      />
      <ThemedButton title="Close" variant="danger" onPress={close} />
    </ThemedView>
  );
};
