import React, { useRef, useCallback } from "react";
import { VideoPlaybackContext } from "./VideoPlaybackContext";
import type { VideoId, VideoPlayerHandle } from "@/types/media";

export const VideoPlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const playersRef = useRef<Map<VideoId, VideoPlayerHandle>>(new Map());

  const register = useCallback((id: VideoId, player: VideoPlayerHandle) => {
    playersRef.current.set(id, player);
  }, []);

  const unregister = useCallback((id: VideoId) => {
    playersRef.current.delete(id);
  }, []);

  const notifyPlaying = useCallback((id: VideoId) => {
    playersRef.current.forEach((player, key) => {
      if (key !== id) player.pause();
    });
  }, []);

  return (
    <VideoPlaybackContext.Provider value={{ register, unregister, notifyPlaying }}>
      {children}
    </VideoPlaybackContext.Provider>
  );
};