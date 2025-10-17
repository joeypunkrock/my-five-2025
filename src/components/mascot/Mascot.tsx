import React from "react";
import { motion } from "framer-motion";
import { useMascot } from "./useMascot";
import { mascotAssets } from "./MascotAssets";

// DESKTOP ONLY: Bottom right floating mascot (MVP)
// Will expand for mobile later

export const Mascot: React.FC = () => {
  const { state } = useMascot();
  const { mood, position, message } = state;
  const asset = mascotAssets[mood];

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center space-y-2"
      initial={false}
      animate={{
        // Animate to new position (expand for element-following later)
        x: position.x,
        y: position.y,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      tabIndex={0}
      role="img"
      aria-label={asset.alt}
      style={{ outline: "none" }}
      data-theme="dark"
    >
      <img
        src={asset.src}
        alt={asset.alt}
        className="w-20 h-20 rounded-full shadow-lg bg-base-200 border-4 border-base-100"
        draggable={false}
      />
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