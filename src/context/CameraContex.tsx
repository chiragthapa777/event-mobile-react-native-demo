import {
    CameraType,
    PermissionResponse,
    useCameraPermissions,
} from "expo-camera";
import React, {
    createContext,
    ReactNode,
    useContext,
    useMemo,
    useState,
} from "react";

type CameraContextType = {
  facing: CameraType;
  toggleCameraFacing: () => void;
  permissionGranted: boolean;
  permissionLoading: boolean;
  requestPermission: () => Promise<PermissionResponse>;
};

const CameraContext = createContext<CameraContextType | null>(null);

export const CameraProvider = ({ children }: { children: ReactNode }) => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const value = useMemo<CameraContextType>(
    () => ({
      facing,
      toggleCameraFacing,
      permissionGranted: !!permission?.granted,
      permissionLoading: !permission,
      requestPermission,
    }),
    [facing, permission, requestPermission]
  );

  return (
    <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
  );
};

export const useCamera = () => {
  const ctx = useContext(CameraContext);
  if (!ctx) {
    throw new Error("useCamera must be used inside CameraProvider");
  }
  return ctx;
};
