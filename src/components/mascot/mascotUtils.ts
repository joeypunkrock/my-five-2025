// Utility to clamp mascot positions to the viewport (mobile and desktop)
export const MASCOT_SIZE = 80;
export const MASCOT_MARGIN = 16;

export function clampMascotPosition(
  x: number,
  y: number,
  mascotSize: number = MASCOT_SIZE,
  margin: number = MASCOT_MARGIN
): { x: number; y: number } {
  const maxX = window.innerWidth - mascotSize - margin;
  const maxY = window.innerHeight - mascotSize - margin;
  return {
    x: Math.max(margin, Math.min(x, maxX)),
    y: Math.max(margin, Math.min(y, maxY)),
  };
}