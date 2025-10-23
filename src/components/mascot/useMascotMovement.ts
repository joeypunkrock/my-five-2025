import { useCallback, useEffect, useRef } from "react";
import type { MascotPosition } from "./Mascot.types";
import { MASCOT_MOVEMENT_CONFIG } from "./movementConfig";
import { clampMascotPosition, MASCOT_SIZE, MASCOT_MARGIN } from "./mascotUtils";

type UseMascotMovementOptions = {
  setPosition: (pos: MascotPosition) => void;
  manual: boolean;
  bounds?: { left: number; top: number; right: number; bottom: number };
};

/**
 * Handles mascot's idle (random) movement, always keeping mascot inside viewport.
 */
export function useMascotMovement({ setPosition, manual, bounds }: UseMascotMovementOptions) {
  const movementTimeout = useRef<number | null>(null);

  const getRandomPosition = useCallback((): MascotPosition => {
    const margin = MASCOT_MOVEMENT_CONFIG.margin ?? MASCOT_MARGIN;
    const mascotSize = MASCOT_MOVEMENT_CONFIG.mascotSize ?? MASCOT_SIZE;
    const b =
      bounds ||
      MASCOT_MOVEMENT_CONFIG.restrictTo || {
        left: margin,
        top: margin,
        right: window.innerWidth - margin - mascotSize,
        bottom: window.innerHeight - margin - mascotSize,
      };
    const rawX = Math.random() * (b.right - b.left) + b.left;
    const rawY = Math.random() * (b.bottom - b.top) + b.top;
    return clampMascotPosition(rawX, rawY, mascotSize, margin);
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