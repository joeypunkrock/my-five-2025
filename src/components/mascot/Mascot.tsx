import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useMascot } from "./useMascot";
import { mascotAssets } from "./MascotAssets";
import { MASCOT_MOVEMENT_CONFIG, PX_PER_SEC } from "./movementConfig";

// Message bubble offset from mascot (in px)
const MESSAGE_OFFSET_X = 24; // right of mascot
const MESSAGE_OFFSET_Y = -40; // above mascot center (tune as needed)
const MESSAGE_WIDTH_CLASSES = "min-w-56 max-w-96 w-auto";

// Message transition: no trailing, always "stuck" to mascot
const MESSAGE_TRANSITION = {
  type: "tween",
  duration: 0.8,
  ease: "easeInOut",
};

export const Mascot: React.FC = () => {
  const { state } = useMascot();
  const { mood, position, message, manualTransition, attached } = state;
  const asset = mascotAssets[mood];

  // Track previous mascot position for animation duration
  const prevPos = useRef<{ x: number; y: number }>({ x: position.x, y: position.y });
  const dx = position.x - prevPos.current.x;
  const dy = position.y - prevPos.current.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  // Use duration with transition override if present
  const duration = Math.max(0.4, distance / PX_PER_SEC);

  prevPos.current = { x: position.x, y: position.y };

  // Choose transition: manual override or default
  const mascotTransition = manualTransition || MASCOT_MOVEMENT_CONFIG.animation;

  // Use smaller float when attached to an accordion, else use normal float
  const mascotFloatAnim =
    attached?.type === "accordion"
      ? MASCOT_MOVEMENT_CONFIG.mascotFloatAnimationAttachedAccordion
      : MASCOT_MOVEMENT_CONFIG.mascotFloatAnimation;

  return (
    <motion.div
      className="absolute left-0 top-0 z-50 pointer-events-none"
      initial={false}
      animate={{ x: position.x, y: position.y }}
      transition={{
        ...mascotTransition,
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
        <motion.div animate={mascotFloatAnim} style={{ willChange: "transform" }}>
          <img
            src={asset.src}
            alt={asset.alt}
            className="w-20 h-20 rounded-full shadow-lg bg-base-200 border-4 border-base-100"
            draggable={false}
          />
        </motion.div>
        {message && (
          <motion.div
            className={`absolute left-full top-1/2 z-50 px-4 py-2 bg-white text-black font-semibold rounded-full shadow-xl border border-base-300 text-base`}
            style={{
              transform: `translateX(${MESSAGE_OFFSET_X}px) translateY(${MESSAGE_OFFSET_Y}px)`,
              pointerEvents: "none",
              width: "max-content",
            }}
            animate={MASCOT_MOVEMENT_CONFIG.messageFloatAnimation}
            initial={{ y: 10 }}
            exit={{ y: 10 }}
            transition={{
              ...MASCOT_MOVEMENT_CONFIG.messageFloatAnimation.transition,
              opacity: { duration: 0.7 },
            }}
          >
            {message}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};