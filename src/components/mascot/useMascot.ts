import { useContext } from "react";
import { MascotContext } from "./MascotProvider";

export const useMascot = () => {
  const context = useContext(MascotContext);
  if (!context) {
    throw new Error("useMascot must be used within a MascotProvider");
  }
  return context;
};