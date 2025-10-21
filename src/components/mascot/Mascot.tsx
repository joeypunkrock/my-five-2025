import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useMascot } from "./useMascot";
import { mascotAssets } from "./MascotAssets";
import { MASCOT_MOVEMENT_CONFIG, PX_PER_SEC } from "./movementConfig";

// Message bubble offset from mascot (in px)
const MESSAGE_OFFSET_X = 24;   // right of mascot
const MESSAGE_OFFSET_Y = -40;  // above mascot center (tune as needed)
const MESSAGE_WIDTH_CLASSES = "min-w-56 max-w-96 w-auto";

// Message transition: no trailing, always "stuck" to mascot
const MESSAGE_TRANSITION = {
  type: "tween",
  duration: 0.8,
  ease: "easeInOut",
};

export const Mascot: React.FC = () => {
  const { state } = useMascot();
  const { mood, position, message } = state;
  const asset = mascotAssets[mood];

  // Track previous mascot position for animation duration
  const prevPos = useRef<{ x: number; y: number }>({ x: position.x, y: position.y });
  const dx = position.x - prevPos.current.x;
  const dy = position.y - prevPos.current.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const duration = Math.max(0.4, distance / PX_PER_SEC);
  prevPos.current = { x: position.x, y: position.y };

  return (
    <motion.div
      className="fixed left-0 top-0 z-50"
      initial={false}
      animate={{ x: position.x, y: position.y }}
      transition={{
        ...MASCOT_MOVEMENT_CONFIG.animation,
        duration,
      }}
      tabIndex={0}
      role="img"
      aria-label={asset.alt}
      style={{ outline: "none" }}
      data-theme="dark"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Mascot image, floating effect always active */}
        <motion.div
          animate={MASCOT_MOVEMENT_CONFIG.float_animation}
          style={{ willChange: "transform" }}
        >
          <img
            src={asset.src}
            alt={asset.alt}
            className="w-20 h-20 rounded-full shadow-lg bg-base-200 border-4 border-base-100"
            draggable={false}
          />
        </motion.div>
        {message && (
          <motion.div
            className={`absolute left-full top-1/2 z-50 ${MESSAGE_WIDTH_CLASSES} px-4 py-2 bg-white text-black font-semibold rounded-lg shadow-xl border border-base-300 text-sm`}
            style={{
              transform: `translateY(-50%) translateX(${MESSAGE_OFFSET_X}px) translateY(${MESSAGE_OFFSET_Y}px)`,
              pointerEvents: "none",
              width: "max-content",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={MESSAGE_TRANSITION}
          >
            {message}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};