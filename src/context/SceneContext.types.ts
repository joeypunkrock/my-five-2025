// src/context/SceneContext.tsx
export type SceneConfig = {
  gradient?: string; // e.g., "from-slate-950 to-fuchsia-950"
  backgroundImage?: string; // e.g., "/art/song1.jpg"
  particleColor?: string; // e.g., "#ffb300"
  particleQuantity?: number;
  overlayOpacity?: number; // 0–1
  customCSS?: string;
};

export type SceneContextType = {
  scene: SceneConfig;
  setScene: (cfg: SceneConfig) => void;
  resetScene: () => void;
};