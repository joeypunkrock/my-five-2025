import { createContext } from "react";
import type { VideoPlaybackContextType } from "@/types/media";

export const VideoPlaybackContext = createContext<VideoPlaybackContextType | null>(null);