import React, { createContext, useCallback, useContext, useState } from "react";

export type SnackbarType = "success" | "error" | "warning" | "info";

type SnackbarState = {
  visible: boolean;
  addOverlay: boolean;
  message: string;
  type: SnackbarType;
};

type SnackbarContextType = {
  showSnackbar: (
    message: string,
    type?: SnackbarType,
    timeoutSec?: number,
    addOverlay?: boolean
  ) => void;
  hideSnackbar: () => void;
  snackbar: SnackbarState;
};

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    visible: false,
    message: "",
    addOverlay: false,
    type: "info",
  });

  const [toId, setToId] = useState<any>();

  const showSnackbar = useCallback(
    (
      message: string,
      type: SnackbarType = "info",
      timeoutSec: number = 3,
      addOverlay: boolean = false
    ) => {
      setSnackbar({ visible: true, message, type, addOverlay });

      setToId(
        setTimeout(() => {
          setSnackbar((prev) => ({ ...prev, visible: false }));
        }, timeoutSec * 1000)
      );
    },
    []
  );

  const hideSnackbar = () => {
    if (toId) {
      clearTimeout(toId);
    }
    setSnackbar((prev) => ({ ...prev, visible: false }));
    setToId(null);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar, snackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error("useSnackbar must be inside SnackbarProvider");
  return ctx;
}
