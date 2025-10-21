import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useMascot } from "./useMascot";
import { mascotAssets } from "./MascotAssets";
import { MASCOT_MOVEMENT_CONFIG, PX_PER_SEC } from "./movementConfig";



export const Mascot: React.FC = () => {
  const { state } = useMascot();
  const { mood, position, message } = state;
  const asset = mascotAssets[mood];

  // Track previous position to compute distance for duration
  const prevPos = useRef<{ x: number; y: number }>({ x: position.x, y: position.y });
  const dx = position.x - prevPos.current.x;
  const dy = position.y - prevPos.current.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const duration = Math.max(0.4, distance / PX_PER_SEC);

  prevPos.current = { x: position.x, y: position.y };

  return (
    <motion.div
      className="fixed left-0 top-0 z-50 flex flex-col items-center space-y-2"
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
      {/* Floating effect always active */}
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
          className="px-4 py-2 bg-base-100 text-base-content rounded-lg shadow-xl border border-base-300 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};