"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils, ChefHat, Star } from "lucide-react"

interface MenuHighlight {
  id: string
  title: string
  description: string
  details: string
  icon: "utensils" | "chef-hat" | "star"
}

export default function MenuHighlightsSection() {
  const [highlights, setHighlights] = useState<MenuHighlight[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    loadHighlights()
    setIsVisible(true)

    // LocalStorage değişikliklerini dinle
    const handleStorageChange = () => {
      loadHighlights()
    }

    window.addEventListener("storage", handleStorageChange)

    // Component içindeki değişiklikleri de dinlemek için interval
    const interval = setInterval(loadHighlights, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const loadHighlights = () => {
    const savedHighlights = localStorage.getItem("menu-highlights")
    if (savedHighlights) {
      setHighlights(JSON.parse(savedHighlights))
    } else {
      // Varsayılan menü öne çıkanları
      const defaultHighlights: MenuHighlight[] = [
        {
          id: "ana-yemek",
          title: "Ana Yemekler",
          description: "Geleneksel Türk mutfağı lezzetleri",
          details: "Kuzu tandır, tavuk şiş, balık çeşitleri ve daha fazlası...",
          icon: "utensils",
        },
        {
          id: "meze",
          title: "Mezeler",
          description: "Taze ve lezzetli başlangıçlar",
          details: "Humus, ezme çeşitleri, peynir tabağı ve özel mezelerimiz...",
          icon: "chef-hat",
        },
        {
          id: "tatli",
          title: "Tatlılar",
          description: "Ev yapımı özel tatlılar",
          details: "Baklava, künefe, sütlaç ve günlük taze tatlılarımız...",
          icon: "star",
        },
      ]
      setHighlights(defaultHighlights)
    }
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "utensils":
        return <Utensils className="h-12 w-12 text-[var(--primary)]" />
      case "chef-hat":
        return <ChefHat className="h-12 w-12 text-[var(--primary)]" />
      case "star":
        return <Star className="h-12 w-12 text-[var(--primary)]" />
      default:
        return <Utensils className="h-12 w-12 text-[var(--primary)]" />
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {highlights.map((highlight, index) => (
        <Card
          key={highlight.id}
          className={`border-[var(--primary-light)] hover:border-[var(--primary)] transition-all duration-300 card-hover ${
            isVisible ? "menu-item-appear" : ""
          }`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="aspect-video bg-gradient-to-br from-[var(--primary-light)]/30 to-[var(--primary-light)]/10 rounded-t-lg flex items-center justify-center">
            {getIcon(highlight.icon)}
          </div>
          <CardHeader>
            <CardTitle className="text-[var(--primary)]">{highlight.title}</CardTitle>
            <p className="text-sm text-gray-600">{highlight.description}</p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm">{highlight.details}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
