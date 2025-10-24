import React from "react";
import MediaList from "@/components/ui/MediaList";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Particles } from "@/components/ui/Particles";
import { useScene } from "@/context/SceneContext";

const HomePage: React.FC = () => {
  const { scene } = useScene();

  return (
    <main className="relative min-h-screen overflow-hidden" data-theme="dark">
      <AnimatedBackground
        gradient={scene.gradient || "linear-gradient(to bottom, #0f172a, #a21caf)"}
        image={scene.backgroundImage}
        imageOpacity={scene.overlayOpacity ?? 0.3}
        imageWidth={480}          // Set to desired width (number = px, or string '30rem', etc.)
        imageRotation={-8}        // Degrees, negative to tilt left
        imageTop="8%"             // Top offset (px, %, etc.)
        imageLeft="6%"            // Left offset (px, %, etc.)
        transitionDuration={1.2}  // Fade duration in seconds
      />
      <div className="bg-overlay" aria-hidden="true" />
      <MediaList />
      <Particles className="absolute inset-0 z-10" quantity={scene.particleQuantity || 60} color={scene.particleColor || "#ffffff"} />
    </main>
  );
};

export default HomePage;