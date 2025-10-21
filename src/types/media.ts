export type VideoId = string;

export type VideoPlayerHandle = {
  pause: () => void;
};

export type VideoPlaybackContextType = {
  register: (id: VideoId, player: VideoPlayerHandle) => void;
  unregister: (id: VideoId) => void;
  notifyPlaying: (id: VideoId) => void;
};