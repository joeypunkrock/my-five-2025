import React, { createContext, useState, useCallback, useRef } from "react";
import { useMascotMovement } from "./useMascotMovement";
import type { MascotMood, MascotState, MascotPosition } from "./types";

type MascotContextType = {
  state: MascotState;
  setMood: (mood: MascotMood) => void;
  setMessage: (msg: string | null) => void;
  moveTo: (pos: MascotPosition, holdMs?: number) => void; // manual override, optional hold duration
  followElement: (el: HTMLElement | null) => void;
};

const defaultState: MascotState = {
  mood: "idle",
  position: { x: 32, y: 32 },
  message: null,
  followingElement: null,
};

const MascotContext = createContext<MascotContextType | undefined>(undefined);

export const MascotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MascotState>(defaultState);
  const [manual, setManual] = useState(false);
  const manualTimeout = useRef<number | null>(null);

  // For AI/auto movement
  const setPosition = useCallback((pos: MascotPosition) => {
    setState((s) => ({ ...s, position: pos }));
  }, []);

  // Manual override: move mascot, pause AI movement for holdMs then resume
  const moveTo = useCallback((pos: MascotPosition, holdMs: number = 2500) => {
    setManual(true);
    setState((s) => ({ ...s, position: pos }));
    if (manualTimeout.current) clearTimeout(manualTimeout.current);
    manualTimeout.current = window.setTimeout(() => setManual(false), holdMs);
  }, []);

  // Hook for AI-like floating movement
  useMascotMovement({ setPosition, manual });

  const setMood = (mood: MascotMood) =>
    setState((s) => ({ ...s, mood }));

  const setMessage = (msg: string | null) =>
    setState((s) => ({ ...s, message: msg }));

  const followElement = (el: HTMLElement | null) =>
    setState((s) => ({ ...s, followingElement: el }));

  // (Expansion point: Add useEffect for reacting to followElement if desired)

  return (
    <MascotContext.Provider
      value={{ state, setMood, setMessage, moveTo, followElement }}
    >
      {children}
    </MascotContext.Provider>
  );
};

export { MascotContext };