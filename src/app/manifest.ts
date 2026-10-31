import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ALL IN [ ALN ] Creative Technology Studio",
    short_name: "ALL IN [ ALN ]",
    description:
      "Where engineering precision meets physical & digital artifacts. Tangier HQ.",
    start_url: "/",
    display: "standalone",
    background_color: "#0A0F1D",
    theme_color: "#111A2E",
    icons: [
      {
        src: "/logo.png",
        sizes: "640x400",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
