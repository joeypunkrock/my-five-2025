import React from "react";
import { motion, useAnimation } from "framer-motion";
import { mascotTestImages } from "../data/mascots";
import type { MascotStyle } from "../data/mascots";

// Animation configs
const idleAnim = {
  y: [0, -8, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

interface MascotProps {
  style?: MascotStyle;
  size?: number;
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  style = "default",
  size = 72,
  className = "",
}) => {
  // Use test mascot images for development
  const mascot = mascotTestImages.find((img) => img.style === style) ??
    mascotTestImages.find((img) => img.style === "default");

  // Animation controls (expand later for more states)
  const controls = useAnimation();
  React.useEffect(() => {
    controls.start(idleAnim);
  }, [controls]);

  if (!mascot) return null; // Fallback if no images found

  return (
    <motion.img
      src={mascot.src}
      alt={mascot.alt}
      width={size}
      height={size}
      className={`inline-block select-none ${className}`}
      animate={controls}
      initial={false}
      draggable={false}
      aria-label={mascot.alt}
      style={{ outline: "none" }}
      tabIndex={0}
    />
  );
};

export default Mascot;