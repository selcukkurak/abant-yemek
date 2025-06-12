import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abant Yemek - Bolu Restoran ve Catering",
    short_name: "Abant Yemek",
    description: "Bolu'da restoran hizmetleri ve toplu yemek organizasyonları",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8b4513",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
