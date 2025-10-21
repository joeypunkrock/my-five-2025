export const MASCOT_MOVEMENT_CONFIG = {
  minInterval: 6500,
  maxInterval: 14500,

  animation: {
    type: "spring" as const,
    stiffness: 3.8, // springiness (faster/snappier movement)
    damping: 20, // resistance (less bounce, stops quicker)
    mass: 6.2, // mascot weight (heavier/slower to accelerate/decelerate)
  },

  margin: 32,

  mascotSize: 80,

  restrictTo: null as null | { left: number; top: number; right: number; bottom: number },

  avoidUI: false,

  float_animation:{
    y: [0, -50, 0, 50, 0],
    x: [0, 50, 0, -50, 0],
    transition: {
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }
};

export const PX_PER_SEC = 14000;
