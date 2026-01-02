import ConfirmationBottomSheet from "@/components/ui/ConfirmationBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import React, {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";

interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "danger";
  onConfirm: () => void;
  onCancel?: () => void;
}

interface BottomSheetContextType {
  showConfirmation: (options: ConfirmationOptions) => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

export function BottomSheetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [confirmationOptions, setConfirmationOptions] =
    useState<ConfirmationOptions | null>(null);

  const showConfirmation = useCallback((options: ConfirmationOptions) => {
    setConfirmationOptions(options);
    // Use setTimeout to ensure the sheet is rendered before opening
    setTimeout(() => {
      bottomSheetRef.current?.snapToIndex(0);
    }, 50);
  }, []);

  const handleConfirm = useCallback(() => {
    confirmationOptions?.onConfirm();
    setConfirmationOptions(null);
  }, [confirmationOptions]);

  const handleCancel = useCallback(() => {
    confirmationOptions?.onCancel?.();
    setConfirmationOptions(null);
  }, [confirmationOptions]);

  return (
    <BottomSheetContext.Provider value={{ showConfirmation }}>
      {children}
      <ConfirmationBottomSheet
        ref={bottomSheetRef}
        title={confirmationOptions?.title || ""}
        message={confirmationOptions?.message || ""}
        confirmText={confirmationOptions?.confirmText}
        cancelText={confirmationOptions?.cancelText}
        confirmVariant={confirmationOptions?.confirmVariant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
}
