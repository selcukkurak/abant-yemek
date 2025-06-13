import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abant Yemek - Bolu'nun En İyi Restoranı ve Catering Hizmeti | Bolu Yemek",
  description:
    "Abant Yemek, Bolu'da en kaliteli restoran ve toplu yemek organizasyonu hizmetleri. Düğün, nişan, kurumsal etkinlikler için profesyonel catering. Bolu'nun lezzet durağı.",
  keywords:
    "Abant Yemek, Bolu restoran, Bolu yemek, catering Bolu, düğün yemeği, toplu yemek, kurumsal catering, Abant restoran, Bolu yemek servisi, etkinlik yemekleri, nişan organizasyonu",
  authors: [{ name: "Abant Yemek" }],
  creator: "Abant Yemek",
  publisher: "Abant Yemek",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://abantyemek.com",
    siteName: "Abant Yemek",
    title: "Abant Yemek - Bolu'nun En İyi Restoranı ve Catering Hizmeti | Bolu Yemek",
    description:
      "Abant Yemek, Bolu'da en kaliteli restoran ve toplu yemek organizasyonu hizmetleri. Düğün, nişan, kurumsal etkinlikler için profesyonel catering. Bolu'nun lezzet durağı.",
    images: [
      {
        url: "https://abantyemek.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abant Yemek - Bolu Restoran ve Catering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abant Yemek - Bolu'nun En İyi Restoranı",
    description: "Bolu'da restoran hizmetleri ve toplu yemek organizasyonları. Kaliteli yemek, profesyonel hizmet.",
    images: ["https://abantyemek.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://abantyemek.com",
  },
  other: {
    "google-site-verification": "your-google-verification-code",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8b4513" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Abant Yemek",
              description: "Bolu'da restoran hizmetleri ve toplu yemek organizasyonları sunan lider firma",
              url: "https://abantyemek.com",
              telephone: "+90-530-079-1419",
              email: "info@abantyemek.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Borazanlar mah. Hürriyet cad. No 75/A",
                addressLocality: "Bolu",
                addressRegion: "Bolu",
                addressCountry: "TR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.730326,
                longitude: 31.586214,
              },
              openingHours: "Mo-Su 09:00-23:00",
              servesCuisine: "Turkish",
              priceRange: "$$",
              image: "https://abantyemek.com/restaurant-image.jpg",
              sameAs: ["https://www.facebook.com/abantyemek", "https://www.instagram.com/abantyemek"],
              hasMenu: {
                "@type": "Menu",
                name: "Ana Menü",
                description: "Geleneksel Türk mutfağı ve modern lezzetler",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "127",
              },
            }),
          }}
        />

        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Abant Yemek Catering",
              description: "Düğün, nişan, kurumsal etkinlik catering hizmetleri",
              url: "https://abantyemek.com",
              telephone: "+90-530-079-1419",
              email: "info@abantyemek.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Borazanlar mah. Hürriyet cad. No 75/A",
                addressLocality: "Bolu",
                addressRegion: "Bolu",
                postalCode: "14000",
                addressCountry: "TR",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.730326,
                longitude: 31.586214,
              },
              openingHours: "Mo-Su 09:00-23:00",
              serviceArea: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 40.730326,
                  longitude: 31.586214,
                },
                geoRadius: "50000",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
