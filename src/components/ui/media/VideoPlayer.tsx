import { MediaPlayer, MediaPlayerInstance, MediaProvider, Poster } from "@vidstack/react";
import {
    DefaultVideoLayout,
    defaultLayoutIcons,
} from "@vidstack/react/player/layouts/default";
import React, { useRef } from "react";

interface VideoPlayerProps {
  src: string;
  title: string;
  posterSrc?: string;
  posterAlt?: string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export default function AudioPlayer({
  src,
  title,
  posterSrc,
  posterAlt = "Video poster",
}: VideoPlayerProps): React.JSX.Element {
  const mediaPlayerRef = useRef<MediaPlayerInstance>(null);


  return (
    <MediaPlayer
      ref={mediaPlayerRef}
      src={src}
      viewType="video"
      streamType="on-demand"
      logLevel="warn"
      title={title}
      playsInline
      autoPlay
    >
      <MediaProvider>
      <Poster className="vds-poster" src={posterSrc} alt={posterAlt} />
      </MediaProvider>
      <DefaultVideoLayout icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
};