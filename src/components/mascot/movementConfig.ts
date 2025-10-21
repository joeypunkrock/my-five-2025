export const MASCOT_MOVEMENT_CONFIG = {
  minInterval: 3500,
  maxInterval: 12500,

  animation: {
    type: "spring" as const,
    stiffness: 3.8,
    damping: 20,
    mass: 6.2,
  },

  margin: 32,
  mascotSize: 80,

  // --- ADD THIS FOR EASY MOBILE POSITIONING ---
  mobile: {
    x: 32,  // px from left edge (or use 'center' to auto-center)
    y: "center", // 'center', 'bottom', or a number (px from top)
    // y: 180,   // e.g. 180px from top if you want a fixed spot
    // y: "bottom" // for bottom edge
  },

  restrictTo: null as null | { left: number; top: number; right: number; bottom: number },
  avoidUI: false,

  float_animation: {
    y: [0, -50, 0, 50, 0],
    x: [0, 50, 0, -50, 0],
    transition: {
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  mascot_float_animation: {
    y: [0, -14, 0, 14, 0],
    x: [0, 12, 0, -12, 0],
    transition: {
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const PX_PER_SEC = 14000;