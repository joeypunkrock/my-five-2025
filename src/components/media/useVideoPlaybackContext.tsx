import { useContext } from "react";
import { VideoPlaybackContext } from "./VideoPlaybackContext";
import type { VideoPlaybackContextType } from "@/types/media";

export const useVideoPlaybackContext = (): VideoPlaybackContextType => {
  const ctx = useContext(VideoPlaybackContext);
  if (!ctx) throw new Error("useVideoPlaybackContext must be used within VideoPlaybackProvider");
  return ctx;
};