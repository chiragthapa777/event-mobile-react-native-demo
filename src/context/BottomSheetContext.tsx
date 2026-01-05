import ThemedBottomSheet from "@/components/ui/ThemedBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

type BottomSheetOption = {
  snapPoints?: (string | number)[];
  enableDynamicSizing?: boolean;
  enablePanDownToClose?: boolean;
  scrollable?: boolean;
  index?: number;
};
interface BottomSheetContextType {
  show: (param: { node: React.ReactNode; option?: BottomSheetOption }) => void;
  close: () => void;
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
  const [node, setNode] = useState<React.ReactNode | null>(null);
  const [option, setOption] = useState<BottomSheetOption>({});

  const show = useCallback(
    ({
      node,
      option,
    }: {
      node: React.ReactNode;
      option?: BottomSheetOption;
    }) => {
      setOption(option || {});
      setNode(node);
      setTimeout(() => {
        bottomSheetRef.current?.snapToIndex(0);
      }, 50);
    },
    []
  );
  const close = useCallback(() => {
    bottomSheetRef?.current?.close();
    setNode(null);
  }, []);

  return (
    <BottomSheetContext.Provider value={{ show, close }}>
      {children}
      <ThemedBottomSheet
        ref={bottomSheetRef}
        snapPoints={["35%"]}
        enableDynamicSizing={false}
        {...option}
      >
        {node}
      </ThemedBottomSheet>
    </BottomSheetContext.Provider>
  );
}

export function useBottomSheet() {
  const context = useContext(BottomSheetContext);
  if (context === undefined) {
    throw new Error("useBottomSheet must be used within a BottomProvider");
  }
  return context;
}
