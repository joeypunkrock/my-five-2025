import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnimatedBackgroundProps = {
  gradient: string;
  image?: string;
  imageOpacity?: number;
  transitionDuration?: number;
};

function getRandomRotation() {
  // Random float between -3 and 6
  return Math.random() * (2 - -2) + -3;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ gradient, image, imageOpacity = 0.3, transitionDuration = 1.2 }) => {
  const [gradientLayers, setGradientLayers] = useState<{ id: number; gradient: string }[]>([{ id: 0, gradient }]);
  const [nextGradientId, setNextGradientId] = useState(1);

  // Store rotation with each image layer
  const [imageLayers, setImageLayers] = useState<{ id: number; image?: string; rotation: number }[]>([{ id: 0, image, rotation: getRandomRotation() }]);
  const [nextImageId, setNextImageId] = useState(1);

  useEffect(() => {
    setGradientLayers((prev) => [...prev, { id: nextGradientId, gradient }]);
    setNextGradientId((id) => id + 1);
  }, [gradient]);

  useEffect(() => {
    setImageLayers((prev) => [...prev, { id: nextImageId, image, rotation: getRandomRotation() }]);
    setNextImageId((id) => id + 1);
  }, [image]);

  const handleGradientAnimationComplete = (id: number) => {
    setGradientLayers((prev) => prev.filter((layer, i) => i === prev.length - 1 || layer.id !== id));
  };
  const handleImageAnimationComplete = (id: number) => {
    setImageLayers((prev) => prev.filter((layer, i) => i === prev.length - 1 || layer.id !== id));
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
      <AnimatePresence>
        {imageLayers.map((layer, idx) =>
          layer.image ? (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: idx === imageLayers.length - 1 ? imageOpacity : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: transitionDuration, ease: "easeInOut" }}
              style={{
                position: "fixed",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${layer.rotation}deg)`,
                width: "88%",
                aspectRatio: "16 / 9",
                backgroundImage: `url(${layer.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                pointerEvents: "none",
                zIndex: 2,
                overflow: "hidden",
                borderRadius: "1.5rem",
              }}
              onAnimationComplete={() => handleImageAnimationComplete(layer.id)}
            >
              {/* Vignette overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  borderRadius: "1.5rem",
                  background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.60) 96%, rgba(0,0,0,1) 100%)",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  zIndex: 2,
                }}
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};
