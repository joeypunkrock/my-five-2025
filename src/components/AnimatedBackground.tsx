import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type AnimatedBackgroundProps = {
  gradient: string;
  image?: string;
  imageOpacity?: number;
  durationImage?: number;
  durationGradient?: number;
  ambientImageOpacity?: number;
  ambientSnapSeconds?: number;
  ambientSteps?: number;
  ambientRotationMin?: number; // NEW: minimum rotation (deg)
  ambientRotationMax?: number; // NEW: maximum rotation (deg)
  ambientScaleMin?: number;    // NEW: minimum scale (e.g. 1)
  ambientScaleMax?: number;    // NEW: maximum scale (e.g. 1.15)
};

function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function getAmbientKeyframes(
  steps: number,
  rotationMin: number,
  rotationMax: number,
  scaleMin: number,
  scaleMax: number
): { rotation: number; scale: number }[] {
  return Array.from({ length: steps }, () => ({
    rotation: getRandomInRange(rotationMin, rotationMax),
    scale: getRandomInRange(scaleMin, scaleMax)
  }));
}

let nextId = 0;
const getId = () => ++nextId;

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  gradient,
  image,
  imageOpacity = 0.3,
  durationImage = 0.8,
  durationGradient = 0.6,
  ambientImageOpacity = 0.04,
  ambientSnapSeconds = 12,
  ambientSteps = 28,
  ambientRotationMin = -2,
  ambientRotationMax = 2,
  ambientScaleMin = 0.9,
  ambientScaleMax = 1.04,
}) => {
  // Animated gradient and image layers (unchanged)
  const [gradientLayers, setGradientLayers] = useState<{ id: number; gradient: string }[]>([
    { id: getId(), gradient }
  ]);
  const [imageLayers, setImageLayers] = useState<{ id: number; image?: string; rotation: number }[]>([
    { id: getId(), image, rotation: getRandomInRange(ambientRotationMin, ambientRotationMax) }
  ]);

  // --- Ambient image, CSS keyframes driven ---
  const [ambientKeyframes, setAmbientKeyframes] = useState<{ rotation: number; scale: number }[]>(
    getAmbientKeyframes(ambientSteps, ambientRotationMin, ambientRotationMax, ambientScaleMin, ambientScaleMax)
  );
  React.useEffect(() => {
    setAmbientKeyframes(
      getAmbientKeyframes(ambientSteps, ambientRotationMin, ambientRotationMax, ambientScaleMin, ambientScaleMax)
    );
  }, [image, ambientSteps, ambientRotationMin, ambientRotationMax, ambientScaleMin, ambientScaleMax]);

  // Prepare keyframes CSS for the current sequence
  const keyframesCSS = React.useMemo(() => {
    if (!ambientKeyframes.length) return "";
    let css = "";
    for (let i = 0; i < ambientKeyframes.length; i++) {
      const pct = Math.round((i / ambientKeyframes.length) * 100);
      css += `
        ${pct}% { --ambient-rotation: ${ambientKeyframes[i].rotation}deg; --ambient-scale: ${ambientKeyframes[i].scale}; }
      `;
    }
    css += `
      100% { --ambient-rotation: ${ambientKeyframes[0].rotation}deg; --ambient-scale: ${ambientKeyframes[0].scale}; }
    `;
    return `@keyframes ambient-snap-rotate {${css}}`;
  }, [ambientKeyframes]);

  // Animate new gradient/image layers on prop change (unchanged)
  const prevGradient = useRef(gradient);
  const prevImage = useRef(image);

  if (prevGradient.current !== gradient) {
    setGradientLayers((prev) => [...prev, { id: getId(), gradient }]);
    prevGradient.current = gradient;
  }
  if (prevImage.current !== image) {
    setImageLayers((prev) => [
      ...prev,
      { id: getId(), image, rotation: getRandomInRange(ambientRotationMin, ambientRotationMax) }
    ]);
    prevImage.current = image;
  }

  const handleGradientAnimationComplete = (id: number) => {
    setGradientLayers((prev) => prev.filter((layer, i) => i === prev.length - 1 || layer.id !== id));
  };
  const handleImageAnimationComplete = (id: number) => {
    setImageLayers((prev) => prev.filter((layer, i) => i === prev.length - 1 || layer.id !== id));
  };

  const imageVariants = {
    initial: { opacity: 0 },
    animate: (opacity: number) => ({
      opacity,
      transition: { duration: durationImage, ease: "easeInOut" },
    }),
    exit: {
      opacity: 0,
      transition: { ease: "easeInOut" },
    },
  };

  const gradientVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: durationGradient, ease: "easeInOut" } },
    exit: { opacity: 0, transition: { ease: "easeInOut" } },
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
      <style>{keyframesCSS}</style>

      <AnimatePresence>
        {gradientLayers.map((layer) => (
          <motion.div
            key={layer.id}
            variants={gradientVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ background: layer.gradient }}
            className="absolute inset-0 z-0"
            onAnimationComplete={() => handleGradientAnimationComplete(layer.id)}
          />
        ))}
      </AnimatePresence>

      {image && (
        <div
          className="fixed left-1/2 top-1/2 z-10 pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{
            width: "110%",
            height: "110%",
            maxWidth: "none",
            maxHeight: "none",
            transform:
              "translate(-50%, -50%) rotate(var(--ambient-rotation, 0deg)) scale(var(--ambient-scale, 1))",
            backgroundImage: `url(${image})`,
            opacity: ambientImageOpacity,
            animation: `ambient-snap-rotate ${ambientSnapSeconds}s steps(${ambientSteps}) infinite`,
            filter: `brightness(0.7) grayscale(1)`,
          }}
          aria-hidden="true"
        />
      )}

      <AnimatePresence>
        {imageLayers.map((layer, idx) =>
          layer.image ? (
            <motion.div
              key={layer.id}
              custom={idx === imageLayers.length - 1 ? imageOpacity : 0}
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[var(--rotation)] w-[98%] 3xl:w-[88%] max-w-[2080px] 2xl:max-w-[1980px] aspect-[16/9] bg-cover bg-center bg-no-repeat pointer-events-none z-20 overflow-hidden rounded-2xl"
              style={
                {
                  backgroundImage: `url(${layer.image})`,
                  "--rotation": `${layer.rotation}deg`,
                } as React.CSSProperties
              }
              onAnimationComplete={() => handleImageAnimationComplete(layer.id)}
            >
              {/* Vignette overlay */}
              <div className="absolute inset-0 pointer-events-none rounded-2xl bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.4)_100%,rgba(0,0,0,1)_100%)] border border-[rgba(255,255,255,0.1)] z-20" />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};