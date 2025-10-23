import React, { createContext, useContext, useState, useEffect } from "react";

export type SceneConfig = {
  gradient?: string; // CSS gradient string (e.g. "linear-gradient(to bottom, #312e81, #db2777)")
  backgroundImage?: string; // "/art/song1.jpg"
  particleColor?: string; // "#ffb300"
  particleQuantity?: number;
  overlayOpacity?: number; // 0–1
  gradientFadeDuration?: string; // e.g. "0.6s"
  imageFadeDuration?: string; // e.g. "0.2s"
  customCSS?: string;
};

export type SceneContextType = {
  scene: SceneConfig;
  setScene: (cfg: SceneConfig) => void;
  resetScene: () => void;
};

// Default: deep blue to purple, white particles, default overlay
const DEFAULT_SCENE: SceneConfig = {
  gradient: "linear-gradient(to bottom, #0f172a, #a21caf)",
  particleColor: "#ffffff",
  particleQuantity: 60,
  overlayOpacity: 0.5,
};

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export const SceneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scene, setSceneState] = useState<SceneConfig>(DEFAULT_SCENE);

  // Update CSS vars on <html> whenever the scene changes
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg-gradient", scene.gradient ?? DEFAULT_SCENE.gradient);
    root.style.setProperty("--bg-image", scene.backgroundImage ? `url(${scene.backgroundImage})` : "none");
    root.style.setProperty("--bg-overlay-opacity", String(scene.overlayOpacity ?? DEFAULT_SCENE.overlayOpacity));
    root.style.setProperty("--particle-color", scene.particleColor ?? DEFAULT_SCENE.particleColor);
    root.style.setProperty("--particle-quantity", String(scene.particleQuantity ?? DEFAULT_SCENE.particleQuantity));
    if (scene.gradientFadeDuration) root.style.setProperty("--bg-gradient-fade-duration", scene.gradientFadeDuration);
    if (scene.imageFadeDuration) root.style.setProperty("--bg-image-fade-duration", scene.imageFadeDuration);
    // Add more as needed
  }, [scene]);

  const setScene = (cfg: SceneConfig) => setSceneState((prev) => ({ ...prev, ...cfg }));
  const resetScene = () => setSceneState(DEFAULT_SCENE);

  return <SceneContext.Provider value={{ scene, setScene, resetScene }}>{children}</SceneContext.Provider>;
};

export const useScene = (): SceneContextType => {
  const ctx = useContext(SceneContext);
  if (!ctx) throw new Error("useScene must be used within SceneProvider");
  return ctx;
};
