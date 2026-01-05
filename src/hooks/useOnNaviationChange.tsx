import { navigationRef } from "@/navigation/navigationRef";
import { useEffect, useRef } from "react";

export function useOnNavigationChange(fn: () => void) {
  const unsubscribeRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const trySubscribe = () => {
      // Already subscribed
      if (unsubscribeRef.current) return;

      // Navigation not ready yet
      if (!navigationRef.isReady()) return;

      // Subscribe
      unsubscribeRef.current = navigationRef.addListener("state", () => {
        fn?.();
      });

      // Stop polling once subscribed
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    // Try immediately
    trySubscribe();

    // Poll until navigation becomes ready
    if (!unsubscribeRef.current) {
      intervalId = setInterval(trySubscribe, 50);
    }

    return () => {
      // Cleanup interval
      if (intervalId) {
        clearInterval(intervalId);
      }

      // Cleanup navigation listener
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, []);
}
