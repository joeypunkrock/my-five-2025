// List of available mascot styles/variants with image paths and alt text

export type MascotStyle = "default" | "wave" | "wink" | "celebrate";

export interface MascotImage {
  style: MascotStyle;
  src: string;
  alt: string;
}

export const mascotImages: MascotImage[] = [
  {
    style: "default",
    src: "/art/shiba-default.svg", // Place your SVGs/PNGs here
    alt: "Shiba mascot smiling",
  },
  {
    style: "wave",
    src: "/art/shiba-wave.svg",
    alt: "Shiba mascot waving",
  },
  {
    style: "wink",
    src: "/art/shiba-wink.svg",
    alt: "Shiba mascot winking",
  },
  {
    style: "celebrate",
    src: "/art/shiba-celebrate.svg",
    alt: "Shiba mascot celebrating",
  },
];



// These SVGs are simple colored circles with emoji to represent each variant.
// Place these SVG files in /public/art/ for local development.
export const mascotTestImages: MascotImage[] = [
  {
    style: "default",
    src: "/art/mascot-test-default.svg",
    alt: "Test Shiba mascot smiling",
  },
  {
    style: "wave",
    src: "/art/mascot-test-wave.svg",
    alt: "Test Shiba mascot waving",
  },
  {
    style: "wink",
    src: "/art/mascot-test-wink.svg",
    alt: "Test Shiba mascot winking",
  },
  {
    style: "celebrate",
    src: "/art/mascot-test-celebrate.svg",
    alt: "Test Shiba mascot celebrating",
  },
];