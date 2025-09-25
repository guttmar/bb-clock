import { useRef, useEffect } from "react";
import NoSleep from "nosleep.js";

export default function useWakeLock(active: boolean) {
  const noSleepRef = useRef<NoSleep | null>(null);

  useEffect(() => {
    if (!noSleepRef.current) {
      noSleepRef.current = new NoSleep();
    }

    const enableWakeLock = () => {
      if (active) noSleepRef.current?.enable();
    };

    // iOS requires user gesture
    document.addEventListener("click", enableWakeLock, { once: true });

    // Disable on cleanup
    return () => {
      noSleepRef.current?.disable();
      document.removeEventListener("click", enableWakeLock);
    };
  }, [active]);
}
