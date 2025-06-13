import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abantyemek.com"
  const currentDate = new Date()

  // Blog yazıları için örnek sluglar
  const blogSlugs = [
    "bolunun-en-iyi-10-yoresel-lezzeti",
    "toplu-organizasyonlarda-menu-planlamasi",
    "abant-golu-manzarasinda-yemek-deneyimi",
    "boluda-dugun-organizasyonu-catering-secimi",
    "kurumsal-etkinliklerde-yemek-organizasyonu",
    "bolunun-meshur-kestane-bali",
  ]

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...blogSlugs.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    {
      url: `${baseUrl}/#hakkimizda`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#hizmetler`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#menu`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#iletisim`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}
