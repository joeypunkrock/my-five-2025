import React, { createContext, useState, useCallback, useRef } from "react";
import { useMascotMovement } from "./useMascotMovement";
import type { MascotMood, MascotState, MascotPosition } from "./types";

type MascotContextType = {
  state: MascotState;
  setMood: (mood: MascotMood) => void;
  setMessage: (msg: string | null, pos?: MascotPosition | null) => void;
  moveTo: (pos: MascotPosition, holdMs?: number) => void;
  followElement: (el: HTMLElement | null) => void;
};

const defaultState: MascotState = {
  mood: "idle",
  position: { x: 32, y: 32 },
  message: null,
  messagePosition: null,
  followingElement: null,
};

const MascotContext = createContext<MascotContextType | undefined>(undefined);

export const MascotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MascotState>(defaultState);
  const [manual, setManual] = useState(false);
  const manualTimeout = useRef<number | null>(null);

  const setPosition = useCallback((pos: MascotPosition) => {
    setState((s) => ({ ...s, position: pos }));
  }, []);

  const moveTo = useCallback((pos: MascotPosition, holdMs: number = 2500) => {
    setManual(true);
    setState((s) => ({ ...s, position: pos }));
    if (manualTimeout.current) clearTimeout(manualTimeout.current);
    manualTimeout.current = window.setTimeout(() => setManual(false), holdMs);
  }, []);

  useMascotMovement({ setPosition, manual });

  const setMood = (mood: MascotMood) =>
    setState((s) => ({ ...s, mood }));

  const setMessage = (msg: string | null, pos?: MascotPosition | null) =>
    setState((s) => ({ ...s, message: msg, messagePosition: pos ?? null }));

  const followElement = (el: HTMLElement | null) =>
    setState((s) => ({ ...s, followingElement: el }));

  return (
    <MascotContext.Provider
      value={{ state, setMood, setMessage, moveTo, followElement }}
    >
      {children}
    </MascotContext.Provider>
  );
};

export { MascotContext };