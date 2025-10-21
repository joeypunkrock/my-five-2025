import { MASCOT_MOVEMENT_CONFIG } from "./movementConfig";

export const MOBILE_BREAKPOINT = 640;
export const TABLET_BREAKPOINT = 1024;

export function getMascotPositionByBreakpoint(
  rect?: DOMRect
): { x: number; y: number } {
  const mascotSize = MASCOT_MOVEMENT_CONFIG.mascotSize ?? 120;
  const margin = MASCOT_MOVEMENT_CONFIG.margin ?? 16;
  const width = window.innerWidth;
  const height = window.innerHeight;

  // --- READ MOBILE X/Y FROM CONFIG! ---
  if (width < MOBILE_BREAKPOINT) {
    const mobileCfg = MASCOT_MOVEMENT_CONFIG.mobile ?? {};

    // X position logic
    let x = margin;
    if (mobileCfg.x === "center") {
      x = Math.max(margin, Math.min(width / 2 - mascotSize / 2, width - mascotSize - margin));
    } else if (typeof mobileCfg.x === "number") {
      x = mobileCfg.x;
    } // else default to margin/left

    // Y position logic
    let y = margin;
    if (mobileCfg.y === "center") {
      y = Math.max(margin, Math.min(height / 2 - mascotSize / 2, height - mascotSize - margin));
    } else if (mobileCfg.y === "bottom") {
      y = height - mascotSize - margin;
    } else if (typeof mobileCfg.y === "number") {
      y = mobileCfg.y;
    } // else default to margin/top

    return { x, y };
  } else if (width < TABLET_BREAKPOINT) {
    return {
      x: width - mascotSize - margin,
      y: height - mascotSize - margin,
    };
  } else if (rect) {
    const desiredX = rect.left + rect.width + margin;
    const desiredY = rect.top + rect.height / 2 - mascotSize / 2;
    return {
      x: Math.max(margin, Math.min(desiredX, width - mascotSize - margin)),
      y: Math.max(margin, Math.min(desiredY, height - mascotSize - margin)),
    };
  }
  return { x: margin, y: margin };
}