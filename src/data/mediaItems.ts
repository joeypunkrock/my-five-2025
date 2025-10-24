import type { SceneConfig } from "@/context/SceneContext";

export type MediaItem = {
  id: string;
  title: string;
  artist?: string;
  type: "music" | "video";
  file: string;         // e.g. "/media/song1.mp3"
  cover?: string;       // e.g. "/art/song1.jpg"
  note?: string;
  scene?: SceneConfig;
};

export const mediaItems: MediaItem[] = [
  {
    id: "one",
    title: "Song Title One",
    artist: "Artist Name",
    type: "music",
    file: "/media/taylor_swift_long_live.mp4",
    cover: "/art/song1.jpg",
    note: "This track energizes me every time!",
    scene: {
      gradient: "linear-gradient(to bottom, #312e81, #db2777)",
      backgroundImage: "/cover/pxfuel.jpg",
      particleColor: "#ffb300",
      overlayOpacity: 0.3,
    },
  },
  {
    id: "two",
    title: "Video Title Two",
    type: "video",
    file: "/media/video2.mp4",
    cover: "/art/song2.jpg",
    scene: {
      gradient: "linear-gradient(to bottom, #B23E00, #2C1716)",
      backgroundImage: "/cover/cover_wotw.jpg",
      particleColor: "#00bfff",
      overlayOpacity: 0.5,
    },
  },
  {
    id: "three",
    title: "Track Three",
    artist: "Another Artist",
    type: "music",
    file: "/media/the_living_tombstone_good_girl.mp4",
    cover: "/art/song3.jpg",
    scene: {
      gradient: "linear-gradient(to bottom, #6988AC, #4F6E90)",
      backgroundImage: "/cover/goodgirl.jpg",
      particleColor: "#39ff14",
      overlayOpacity: 0.1,
    },
  },
  {
    id: "four",
    title: "Music Four",
    type: "music",
    file: "/media/metajoker_become.mp4",
    cover: "/art/song4.jpg",
    scene: {
      gradient: "linear-gradient(to bottom, #B8CBDF, #7F9EC2)",
      backgroundImage: "/cover/rainbow2.jpg",
      particleColor: "#f472b6",
      overlayOpacity: 1,
    },
  },
  {
    id: "five",
    title: "Fifth Favorite",
    artist: "Cool Band",
    type: "music",
    file: "/media/oasis_stop_crying.mp4",
    cover: "/art/song5.jpg",
    scene: {
      gradient: "linear-gradient(to bottom, #111827, #1e40af)",
      backgroundImage: "/cover/oasis.jpg",
      particleColor: "#60a5fa",
      overlayOpacity: 0.07,
    },
  },
];