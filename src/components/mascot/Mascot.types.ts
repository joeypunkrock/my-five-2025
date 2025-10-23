export const mascotMoods = [
  "idle",
  "happy",
  "curious",
  "celebrate",
  "sleepy",
  "surprised",
] as const;

export type MascotMood = typeof mascotMoods[number];

export type MascotPosition = {
  x: number;
  y: number;
};

export type MascotAttachment =
  | { type: "none" }
  | { type: "accordion"; id: string }
  | { type: "somethingelse"; id: string };

export type MascotState = {
  mood: MascotMood;
  position: MascotPosition;
  message: string | null;
  messagePosition?: { x: number; y: number } | null; // NEW
  followingElement: HTMLElement | null;
  manualTransition?: unknown;
  attached: MascotAttachment;
};