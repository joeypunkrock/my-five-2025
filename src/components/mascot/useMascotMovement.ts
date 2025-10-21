import { useCallback, useEffect, useRef } from "react";
import type { MascotPosition } from "./types";
import { MASCOT_MOVEMENT_CONFIG } from "./movementConfig";

type UseMascotMovementOptions = {
  setPosition: (pos: MascotPosition) => void;
  manual: boolean;
  bounds?: { left: number; top: number; right: number; bottom: number };
};

export function useMascotMovement({ setPosition, manual, bounds }: UseMascotMovementOptions) {
  const movementTimeout = useRef<number | null>(null);

  const getRandomPosition = useCallback((): MascotPosition => {
    const margin = MASCOT_MOVEMENT_CONFIG.margin;
    const mascotSize = MASCOT_MOVEMENT_CONFIG.mascotSize;
    const b =
      bounds ||
      MASCOT_MOVEMENT_CONFIG.restrictTo || {
        left: margin,
        top: margin,
        right: window.innerWidth - margin - mascotSize,
        bottom: window.innerHeight - margin - mascotSize,
      };
    const x = Math.random() * (b.right - b.left) + b.left;
    const y = Math.random() * (b.bottom - b.top) + b.top;
    return { x, y };
  }, [bounds]);

  const scheduleNextMove = useCallback(() => {
    if (manual) return;
    const nextPos = getRandomPosition();
    setPosition(nextPos);

    const { minInterval, maxInterval } = MASCOT_MOVEMENT_CONFIG;
    const interval = minInterval + Math.random() * (maxInterval - minInterval);
    movementTimeout.current = window.setTimeout(scheduleNextMove, interval);
  }, [manual, getRandomPosition, setPosition]);

  useEffect(() => {
    if (!manual) {
      scheduleNextMove();
    }
    return () => {
      if (movementTimeout.current) clearTimeout(movementTimeout.current);
    };
  }, [manual, scheduleNextMove]);
}