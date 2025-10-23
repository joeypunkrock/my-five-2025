import type { MascotMood } from "./Mascot.types";

export const mascotAssets: Record<
  MascotMood,
  { src: string; alt: string }
> = {
  idle:      { src: "/art/mascot-test-idle.svg",      alt: "Mascot is idle and watching" },
  happy:     { src: "/art/mascot-test-happy.svg",     alt: "Mascot is happy" },
  curious:   { src: "/art/mascot-test-curious.svg",   alt: "Mascot is curious" },
  celebrate: { src: "/art/mascot-test-celebrate.svg", alt: "Mascot is celebrating" },
  sleepy:    { src: "/art/mascot-test-sleepy.svg",    alt: "Mascot is sleepy" },
  surprised: { src: "/art/mascot-test-surprised.svg", alt: "Mascot is surprised" },
};