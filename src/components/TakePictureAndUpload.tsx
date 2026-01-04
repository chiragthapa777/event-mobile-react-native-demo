import { useAppTheme } from "@/hooks/useThemeColor";
import { FileUpload, uploadFile } from "@/services/api/fileApiService";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Image, Text, View } from "react-native";
import IconButton from "./ui/IconButton";
import { ThemedButton } from "./ui/ThemedButton";
import { ThemedView } from "./ui/ThemedView";

export default function TakePictureAndUpload({
  close,
  folder = "profile",
  setUploadedFile,
}: {
  close?: () => void;
  folder?: string;
  setUploadedFile: (file: FileUpload) => void;
}) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const theme = useAppTheme();

  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
        }}
      >
        <Text>We need camera permission</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const takePicture = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.8,
    });

    setPhotoUri(photo.uri);
  };

  const uploadPhoto = async () => {
    if (!photoUri) return;

    try {
      setUploading(true);
      const response = await uploadFile(photoUri, folder);

      if (response.success) {
        setUploadedFile(response.data);
        close?.();
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const toggleCamera = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  return (
    <ThemedView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      {photoUri ? (
        <>
          <Image
            source={{ uri: photoUri }}
            style={[
              {
                flex: 1,
                resizeMode: "contain",
              },
              facing === "front" && { transform: [{ scaleX: -1 }] },
            ]}
          />
          <ThemedButton
            title="Retake"
            variant="secondary"
            style={{
              marginTop: 5,
            }}
            onPress={() => setPhotoUri(null)}
          />
          <ThemedButton
            title={uploading ? "Uploading..." : "Use this photo"}
            onPress={() => uploadPhoto()}
            disabled={uploading}
            style={{
              marginTop: 5,
            }}
          />
          <ThemedButton
            title="Close"
            variant="danger"
            onPress={close}
            style={{
              marginTop: 5,
            }}
          />
        </>
      ) : (
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing}>
          <IconButton
            onPress={close}
            bgBlock
            style={{
              position: "absolute",
              top: 5,
              right: 5,
            }}
            size={30}
            icon={<Ionicons name="close" size={20} color={theme.text} />}
          />
          <ThemedView
            style={{
              position: "absolute",
              bottom: 40,
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              backgroundColor: "transparent",
            }}
          >
            <IconButton
              onPress={takePicture}
              style={{
                marginHorizontal: "auto",
              }}
              bgBlock
              size={70}
              icon={<Ionicons name="camera" size={24} color={theme.text} />}
            />

            <IconButton
              style={{
                position: "absolute",
                right: 60,
              }}
              onPress={toggleCamera}
              bgBlock
              icon={
                <Ionicons
                  name="camera-reverse-sharp"
                  size={24}
                  color={theme.text}
                />
              }
            />
          </ThemedView>
        </CameraView>
      )}
    </ThemedView>
  );
}
