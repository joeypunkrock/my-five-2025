import {
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  Poster,
  useMediaRemote
} from "@vidstack/react";
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import React, { useRef, useEffect } from "react";
import { useVideoPlaybackContext } from "./useVideoPlaybackContext";

export interface VideoPlayerProps {
  id: string;
  src: string;
  title: string;
  posterSrc?: string;
  posterAlt?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onEnded?: () => void; // <-- Accept video end handler
}

export default function VideoPlayer({
  id,
  src,
  title,
  posterSrc,
  posterAlt = "Video poster",
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  onEnded, // <-- Receive as prop
}: VideoPlayerProps): React.JSX.Element {
  const mediaPlayerRef = useRef<MediaPlayerInstance>(null);
  const remote = useMediaRemote(mediaPlayerRef);
  const { register, unregister, notifyPlaying } = useVideoPlaybackContext();

  useEffect(() => {
    if (!mediaPlayerRef.current) return;
    register(id, { pause: () => remote.pause() });
    if (autoPlay) {
      remote.play();
    }
    return () => unregister(id);
  }, [id, register, unregister, remote, autoPlay]);
  
  return (
    <MediaPlayer
      ref={mediaPlayerRef}
      src={src}
      viewType="video"
      streamType="on-demand"
      logLevel="warn"
      title={title}
      playsInline
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      controls={controls}
      className="rounded-xl shadow-lg"
      style={{ aspectRatio: "16/9" }}
      onPlay={() => notifyPlaying(id)}
      onEnded={onEnded}  // <-- Pass handler to MediaPlayer
    >
      <MediaProvider>
        <Poster className="vds-poster" src={posterSrc} alt={posterAlt} />
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
}