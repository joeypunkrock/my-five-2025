import React, { createContext, useState } from "react";
import type { MascotMood, MascotState, MascotPosition } from "./types";

type MascotContextType = {
  state: MascotState;
  setMood: (mood: MascotMood) => void;
  setMessage: (msg: string | null) => void;
  moveTo: (pos: MascotPosition) => void;
  followElement: (el: HTMLElement | null) => void;
};

const defaultState: MascotState = {
  mood: "idle",
  position: { x: 32, y: 32 },
  message: null,
  followingElement: null,
};

const MascotContext = createContext<MascotContextType | undefined>(undefined);

export const MascotProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<MascotState>(defaultState);

  const setMood = (mood: MascotMood) =>
    setState((s) => ({ ...s, mood }));

  const setMessage = (msg: string | null) =>
    setState((s) => ({ ...s, message: msg }));

  const moveTo = (pos: MascotPosition) =>
    setState((s) => ({ ...s, position: pos, followingElement: null }));

  const followElement = (el: HTMLElement | null) =>
    setState((s) => ({ ...s, followingElement: el }));

  // TODO: Add effect to update position based on followingElement (desktop only for now)

  return (
    <MascotContext.Provider
      value={{ state, setMood, setMessage, moveTo, followElement }}
    >
      {children}
    </MascotContext.Provider>
  );
};

export { MascotContext };