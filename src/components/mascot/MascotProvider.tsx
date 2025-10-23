import React, { createContext, useState, useCallback, useRef } from "react";
import { useMascotMovement } from "./useMascotMovement";
import type { MascotMood, MascotState, MascotPosition, MascotAttachment } from "./Mascot.types";

export type MascotContextType = {
  state: MascotState;
  setMood: (mood: MascotMood) => void;
  setMessage: (msg: string | null, pos?: MascotPosition | null) => void;
  moveTo: (pos: MascotPosition, holdMs?: number, manualTransition?: any) => void;
  followElement: (el: HTMLElement | null) => void;
  resetMascot: () => void;
  setAttachment: (attachment: MascotAttachment) => void;
  clearAttachment: () => void;
};

const defaultState: MascotState = {
  mood: "idle",
  position: { x: 32, y: 32 },
  message: null,
  messagePosition: null,
  followingElement: null,
  manualTransition: undefined,
};

const MascotContext = createContext<MascotContextType | undefined>(undefined);

export const MascotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MascotState>(defaultState);
  const [manual, setManual] = useState(false);
  const manualTimeout = useRef<number | null>(null);

  const resetMascot = useCallback(() => {
    if (manualTimeout.current) {
      clearTimeout(manualTimeout.current);
      manualTimeout.current = null;
    }
    setManual(false);
    setState((s) => ({
      ...s,
      manualTransition: undefined,
      message: null,
      messagePosition: null,
    }));
  }, []);

  const setPosition = useCallback((pos: MascotPosition) => {
    setState((s) => ({ ...s, position: pos }));
  }, []);

  // Hide message when mascot returns to idle after holdMs.
  const moveTo = useCallback((pos: MascotPosition, holdMs: number = 2500, manualTransition?: any) => {
    setManual(true);
    setState((s) => ({ ...s, position: pos, manualTransition: manualTransition }));
    if (manualTimeout.current) clearTimeout(manualTimeout.current);
    manualTimeout.current = window.setTimeout(() => {
      setManual(false);
      setState((s) => ({
        ...s,
        manualTransition: undefined,
        message: null,
        messagePosition: null,
      }));
    }, holdMs);
  }, []);

  useMascotMovement({ setPosition, manual });

  const setMood = (mood: MascotMood) => setState((s) => ({ ...s, mood }));

  const setMessage = (msg: string | null, pos?: MascotPosition | null) => setState((s) => ({ ...s, message: msg, messagePosition: pos ?? null }));

  const followElement = (el: HTMLElement | null) => setState((s) => ({ ...s, followingElement: el }));

  const setAttachment = useCallback((attachment: MascotAttachment) => {
    setState((s) => ({ ...s, attached: attachment }));
  }, []);

  const clearAttachment = useCallback(() => {
    setState((s) => ({ ...s, attached: { type: "none" } }));
  }, []);

  return <MascotContext.Provider value={{ state, setMood, setMessage, moveTo, followElement, resetMascot, setAttachment, clearAttachment }}>{children}</MascotContext.Provider>;
};

export { MascotContext };
