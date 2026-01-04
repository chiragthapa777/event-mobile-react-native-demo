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

interface BottomSheetConfirmationContextType {
  showConfirmation: (options: ConfirmationOptions) => void;
}

const BottomSheetConfirmationContext = createContext<BottomSheetConfirmationContextType | undefined>(
  undefined
);

export function BottomSheetConfirmationProvider({
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
    <BottomSheetConfirmationContext.Provider value={{ showConfirmation }}>
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
    </BottomSheetConfirmationContext.Provider>
  );
}

export function useConformationBottomSheet() {
  const context = useContext(BottomSheetConfirmationContext);
  if (context === undefined) {
    throw new Error("useConformationBottomSheet must be used within a BottomSheetConfirmationProvider");
  }
  return context;
}
