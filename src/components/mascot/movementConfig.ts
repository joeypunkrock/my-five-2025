export const MASCOT_MOVEMENT_CONFIG = {
  minInterval: 18500,
  maxInterval: 26500,

  animation: {
    type: "spring" as const,
    stiffness: 3.8,
    damping: 20,
    mass: 6.2,
  },

  margin: 32,
  mascotSize: 80,

  mobile: {
    x: 32, // px from left edge (or use 'center' to auto-center)
    y: "center", // 'center', 'bottom', or a number (px from top)
  },

  restrictTo: null as null | { left: number; top: number; right: number; bottom: number },
  avoidUI: false,

  // Mascot floating animation for idle/normal state
  mascotFloatAnimation: {
    y: [0, -50, 0, 50, 0],
    x: [0, 50, 0, -50, 0],
    transition: {
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Mascot floating animation when attached to an accordion (smaller float)
  mascotFloatAnimationAttachedAccordion: {
    y: [0, -28, 0, 28, 0],
    x: [0, 8, 0, -8, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Message bubble floating animation (subtle)
  messageFloatAnimation: {
    y: [0, -46, 0, 31, 0],
    x: [0, 16, 0, -2, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const PX_PER_SEC = 14000;