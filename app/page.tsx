"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, MapPin, Clock, Users, Utensils, ChefHat, Star, Coffee, ArrowRight } from "lucide-react"
import Link from "next/link"
import MapLocation from "@/components/map-location"
import { useState, useEffect } from "react"
import ReservationModal from "@/components/reservation-modal"
import QuoteModal from "@/components/quote-modal"
import MenuModal from "@/components/menu-modal"
import MenuHighlightsSection from "@/components/menu-highlights-section"
import ScrollReveal from "@/components/scroll-reveal"
import FAQSection from "@/components/faq-section"

export default function HomePage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isScrolled ? "bg-[var(--primary)]" : "bg-white/90"
                }`}
              >
                <ChefHat className={`h-6 w-6 ${isScrolled ? "text-white" : "text-[var(--primary)]"}`} />
              </div>
              <h1
                className={`text-2xl font-bold transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white drop-shadow-md"
                }`}
              >
                Abant Yemek
              </h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link
                href="#hakkimizda"
                className={`transition-colors ${
                  isScrolled ? "text-gray-700 hover:text-[var(--primary)]" : "text-white hover:text-[var(--accent)]"
                }`}
              >
                Hakkımızda
              </Link>
              <Link
                href="#hizmetler"
                className={`transition-colors ${
                  isScrolled ? "text-gray-700 hover:text-[var(--primary)]" : "text-white hover:text-[var(--accent)]"
                }`}
              >
                Hizmetler
              </Link>
              <Link
                href="#menu"
                className={`transition-colors ${
                  isScrolled ? "text-gray-700 hover:text-[var(--primary)]" : "text-white hover:text-[var(--accent)]"
                }`}
              >
                Menü
              </Link>
              <Link
                href="#iletisim"
                className={`transition-colors ${
                  isScrolled ? "text-gray-700 hover:text-[var(--primary)]" : "text-white hover:text-[var(--accent)]"
                }`}
              >
                İletişim
              </Link>
            </nav>
            <Button
              className={isScrolled ? "btn-primary" : "bg-white/90 text-[var(--primary)] hover:bg-white"}
              onClick={() => window.open("tel:+905300791419", "_self")}
            >
              <Phone className="h-4 w-4 mr-2" />
              Hemen Ara
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section
          className="relative min-h-screen flex items-center justify-center pt-16 px-4"
          style={{
            backgroundImage: "url('/hero-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-label="Ana sayfa hero bölümü"
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto text-center relative z-10 animate-fade-in">
            <Badge className="mb-4 bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent)] animate-pulse-slow">
              Lezzet ve Kalite Bir Arada
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              <span className="text-[var(--accent)]">Abant Yemek</span> - Bolu'nun En İyi Restoranı
            </h2>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
              Restoran hizmetlerimiz ve toplu yemek organizasyonlarımızla her damak tadına hitap eden lezzetli yemekler
              sunuyoruz. Kaliteli malzemeler ve deneyimli şeflerimizle unutulmaz tatlar yaratıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] animate-slide-up"
                onClick={() => setIsMenuModalOpen(true)}
              >
                <Utensils className="h-5 w-5 mr-2" />
                Restoran Menüsü
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 animate-slide-up transition-all duration-300"
                style={{ animationDelay: "0.2s" }}
                onClick={() => setIsQuoteModalOpen(true)}
              >
                <Users className="h-5 w-5 mr-2" />
                Toplu Yemek Teklifi Al
              </Button>
            </div>
          </div>
          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-float">
            <a href="#hakkimizda" className="text-white">
              <div className="flex flex-col items-center">
                <span className="text-sm mb-2">Keşfedin</span>
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 rotate-90" />
                </div>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* About Section */}
      <section id="hakkimizda" className="py-20 px-4 relative" aria-labelledby="about-heading">
        <div className="absolute inset-0 bg-white/90"></div>
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[var(--primary)] text-white">Bizi Tanıyın</Badge>
              <h3 id="about-heading" className="text-4xl font-bold text-gray-900 mb-4">
                Hakkımızda
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Yılların deneyimi ve tutkuyla harmanladığımız lezzetlerle hizmet veriyoruz
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8 staggered-appear">
            <Card className="text-center border-[var(--primary-light)] card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-4">
                  <ChefHat className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[var(--primary)]">Deneyimli Şefler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Alanında uzman şeflerimiz, geleneksel ve modern lezzetleri bir araya getiriyor.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-[var(--primary-light)] card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[var(--primary)]">Kaliteli Malzemeler</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sadece en taze ve kaliteli malzemeleri kullanarak sağlıklı yemekler hazırlıyoruz.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center border-[var(--primary-light)] card-hover">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[var(--primary)] rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-[var(--primary)]">Müşteri Memnuniyeti</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Müşteri memnuniyeti bizim için öncelik. Her detayda mükemmelliği hedefliyoruz.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-20 px-4 bg-[var(--primary-light)]/10" aria-labelledby="services-heading">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[var(--accent)] text-gray-900">Neler Sunuyoruz</Badge>
              <h3 id="services-heading" className="text-4xl font-bold text-gray-900 mb-4">
                Hizmetlerimiz
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Restoran ve toplu yemek hizmetlerimizle her ihtiyacınıza cevap veriyoruz
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <Card className="border-[var(--primary-light)] card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                      <Utensils className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-[var(--primary)]">Restoran Hizmetleri</CardTitle>
                      <CardDescription>A la carte menü ve özel lezzetler</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Türk mutfağı klasikleri
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Dünya mutfağından seçmeler
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Özel günler için rezervasyon
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Aile ve arkadaş toplantıları
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Romantik akşam yemekleri
                    </li>
                  </ul>
                  <Button
                    className="mt-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
                    onClick={() => setIsReservationModalOpen(true)}
                  >
                    Rezervasyon Yap
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal className="delay-200">
              <Card className="border-[var(--primary-light)] card-hover">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-[var(--primary)]">Toplu Yemek Organizasyonu</CardTitle>
                      <CardDescription>Kurumsal ve özel etkinlikler</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Düğün ve nişan organizasyonları
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Kurumsal etkinlik yemekleri
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Okul ve fabrika yemek servisi
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Özel parti ve kutlamalar
                    </li>
                    <li className="flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] mr-2"></div>
                      Catering hizmetleri
                    </li>
                  </ul>
                  <Button
                    className="mt-6 bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
                    onClick={() => setIsQuoteModalOpen(true)}
                  >
                    Teklif Al
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-20 px-4 bg-white relative overflow-hidden" aria-labelledby="menu-heading">
        <div className="absolute inset-0 opacity-5 bg-food-pattern"></div>
        <div className="container mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[var(--primary)] text-white">Lezzetlerimiz</Badge>
              <h3 id="menu-heading" className="text-4xl font-bold text-gray-900 mb-4">
                Menü Öne Çıkanları
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">En sevilen lezzetlerimizden bir seçki</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <MenuHighlightsSection />
          </ScrollReveal>

          <div className="text-center mt-12">
            <Button
              className="bg-[var(--accent)] text-gray-900 hover:bg-[var(--accent-light)]"
              onClick={() => setIsMenuModalOpen(true)}
            >
              <Coffee className="h-5 w-5 mr-2" />
              Tüm Menüyü Gör
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section id="iletisim" className="py-20 px-4 bg-[var(--primary-light)]/10" aria-labelledby="contact-heading">
        <div className="container mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-[var(--accent)] text-gray-900">Bize Ulaşın</Badge>
              <h3 id="contact-heading" className="text-4xl font-bold text-gray-900 mb-4">
                İletişim
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Rezervasyon ve toplu yemek teklifleri için bizimle iletişime geçin
              </p>
            </div>
          </ScrollReveal>

          {/* Harita - Tam Genişlik */}
          <ScrollReveal>
            <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
              <MapLocation />
            </div>
          </ScrollReveal>

          {/* İletişim Kartları */}
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal>
              <Card className="border-[var(--primary-light)] card-hover">
                <CardHeader>
                  <CardTitle className="text-[var(--primary)]">İletişim Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[var(--primary-light)]/20 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Telefon</p>
                      <p className="text-gray-600">+90 (530) 079 14 19</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[var(--primary-light)]/20 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">E-posta</p>
                      <p className="text-gray-600">info@abantyemek.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[var(--primary-light)]/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Adres</p>
                      <p className="text-gray-600">Abant, Bolu</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-[var(--primary-light)]/20 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Çalışma Saatleri</p>
                      <p className="text-gray-600">09:00 - 23:00 (Her gün)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            <ScrollReveal className="delay-200">
              <Card className="border-[var(--primary-light)] card-hover">
                <CardHeader>
                  <CardTitle className="text-[var(--primary)]">Hızlı İletişim</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Adınız</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Adınızı girin"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Telefon</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Telefon numaranız"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mesajınız</label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Mesajınızı yazın..."
                    />
                  </div>
                  <Button className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)]">Mesaj Gönder</Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--primary-dark)] text-white py-12 px-4" role="contentinfo">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-[var(--accent)]" />
              </div>
              <div>
                <span className="text-2xl font-bold">Abant Yemek</span>
                <p className="text-sm text-gray-300">Lezzet ve kalite bir arada</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="flex space-x-4 mb-4 justify-center md:justify-end">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
              </div>
              <p className="text-gray-400">© 2024 Abant Yemek. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ReservationModal isOpen={isReservationModalOpen} onClose={() => setIsReservationModalOpen(false)} />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
      <MenuModal isOpen={isMenuModalOpen} onClose={() => setIsMenuModalOpen(false)} />
    </div>
  )
}
