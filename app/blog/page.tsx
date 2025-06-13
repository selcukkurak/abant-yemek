"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import SEOBreadcrumbs from "@/components/seo-breadcrumbs"
import ScrollReveal from "@/components/scroll-reveal"
import { useState } from "react"

// Blog yazıları için örnek veri
const blogPosts = [
  {
    id: 1,
    title: "Bolu'nun En İyi 10 Yöresel Lezzeti",
    excerpt: "Bolu mutfağının vazgeçilmez tatları ve bu lezzetlerin hikayelerini keşfedin.",
    image: "/placeholder.jpg",
    date: "15 Haziran 2024",
    author: "Şef Ahmet",
    category: "Yöresel Lezzetler",
    slug: "bolunun-en-iyi-10-yoresel-lezzeti",
  },
  {
    id: 2,
    title: "Toplu Organizasyonlarda Menü Planlaması Nasıl Yapılır?",
    excerpt: "Başarılı bir etkinlik için doğru menü planlaması ipuçları ve püf noktaları.",
    image: "/placeholder.jpg",
    date: "10 Haziran 2024",
    author: "Organizasyon Ekibi",
    category: "Organizasyon",
    slug: "toplu-organizasyonlarda-menu-planlamasi",
  },
  {
    id: 3,
    title: "Abant Gölü Manzarasında Unutulmaz Bir Yemek Deneyimi",
    excerpt: "Doğanın kalbinde, eşsiz manzara eşliğinde sunduğumuz özel menüler ve deneyimler.",
    image: "/placeholder.jpg",
    date: "5 Haziran 2024",
    author: "Şef Mehmet",
    category: "Özel Deneyimler",
    slug: "abant-golu-manzarasinda-yemek-deneyimi",
  },
  {
    id: 4,
    title: "Bolu'da Düğün Organizasyonu İçin Catering Seçimi",
    excerpt: "Düğününüzü unutulmaz kılacak catering hizmetleri ve menü önerileri.",
    image: "/placeholder.jpg",
    date: "1 Haziran 2024",
    author: "Organizasyon Ekibi",
    category: "Düğün",
    slug: "boluda-dugun-organizasyonu-catering-secimi",
  },
  {
    id: 5,
    title: "Kurumsal Etkinliklerde Yemek Organizasyonu",
    excerpt: "Şirket toplantıları ve kurumsal etkinlikler için profesyonel catering çözümleri.",
    image: "/placeholder.jpg",
    date: "28 Mayıs 2024",
    author: "Kurumsal İlişkiler",
    category: "Kurumsal",
    slug: "kurumsal-etkinliklerde-yemek-organizasyonu",
  },
  {
    id: 6,
    title: "Bolu'nun Meşhur Kestane Balı ve Mutfaktaki Kullanımı",
    excerpt: "Bolu'nun altın değerindeki kestane balının özellikleri ve yemeklerde kullanımı.",
    image: "/placeholder.jpg",
    date: "25 Mayıs 2024",
    author: "Şef Ayşe",
    category: "Yerel Ürünler",
    slug: "bolunun-meshur-kestane-bali",
  },
]

// Kategori filtreleme için kategoriler
const categories = [
  "Tümü",
  "Yöresel Lezzetler",
  "Organizasyon",
  "Özel Deneyimler",
  "Düğün",
  "Kurumsal",
  "Yerel Ürünler",
]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü")

  // Kategoriye göre filtreleme
  const filteredPosts =
    selectedCategory === "Tümü" ? blogPosts : blogPosts.filter((post) => post.category === selectedCategory)

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* SEO Breadcrumbs */}
      <div className="container mx-auto px-4">
        <SEOBreadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-12">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[var(--primary)] text-white">Abant Yemek Blog</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Lezzet ve Gastronomi Dünyası</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bolu'nun yöresel lezzetleri, catering ipuçları, organizasyon fikirleri ve daha fazlası
            </p>
          </div>
        </ScrollReveal>

        {/* Kategori Filtreleme */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category ? "bg-[var(--primary)]" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </header>

      {/* Blog Posts */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <ScrollReveal key={post.id}>
              <Card className="h-full flex flex-col border-[var(--primary-light)] hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-[var(--primary)]">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[var(--primary)] font-medium flex items-center hover:underline"
                  >
                    Devamını Oku <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
