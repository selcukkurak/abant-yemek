"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Utensils, ChefHat, Star, Clock } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: "ana-yemek" | "meze" | "tatli"
  available: boolean
}

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState<"ana-yemek" | "meze" | "tatli">("ana-yemek")

  useEffect(() => {
    // LocalStorage'dan menü verilerini yükle
    const savedMenu = localStorage.getItem("restaurant-menu")
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu))
    } else {
      // Varsayılan menü
      const defaultMenu: MenuItem[] = [
        // Ana Yemekler
        {
          id: "1",
          name: "Kuzu Tandır",
          description: "Özel baharatlarla marine edilmiş kuzu eti",
          price: "180₺",
          category: "ana-yemek",
          available: true,
        },
        {
          id: "2",
          name: "Tavuk Şiş",
          description: "Izgara tavuk göğsü, sebze garnitürü ile",
          price: "120₺",
          category: "ana-yemek",
          available: true,
        },
        {
          id: "3",
          name: "Levrek Izgara",
          description: "Taze levrek balığı, limon sosu ile",
          price: "150₺",
          category: "ana-yemek",
          available: true,
        },
        {
          id: "4",
          name: "Köfte",
          description: "Ev yapımı köfte, pilav ve salata ile",
          price: "100₺",
          category: "ana-yemek",
          available: true,
        },

        // Mezeler
        {
          id: "5",
          name: "Humus",
          description: "Nohut ezmesi, zeytinyağı ve baharatlı",
          price: "35₺",
          category: "meze",
          available: true,
        },
        {
          id: "6",
          name: "Ezme",
          description: "Domates, biber, soğan karışımı",
          price: "30₺",
          category: "meze",
          available: true,
        },
        {
          id: "7",
          name: "Peynir Tabağı",
          description: "Çeşitli peynirler, bal ve ceviz ile",
          price: "45₺",
          category: "meze",
          available: true,
        },
        {
          id: "8",
          name: "Sigara Böreği",
          description: "Peynirli sigara böreği (6 adet)",
          price: "40₺",
          category: "meze",
          available: true,
        },

        // Tatlılar
        {
          id: "9",
          name: "Baklava",
          description: "Antep fıstıklı baklava (4 dilim)",
          price: "60₺",
          category: "tatli",
          available: true,
        },
        {
          id: "10",
          name: "Künefe",
          description: "Sıcak künefe, dondurma ile",
          price: "55₺",
          category: "tatli",
          available: true,
        },
        {
          id: "11",
          name: "Sütlaç",
          description: "Ev yapımı sütlaç, tarçın ile",
          price: "35₺",
          category: "tatli",
          available: true,
        },
        {
          id: "12",
          name: "Tiramisu",
          description: "İtalyan tatlısı tiramisu",
          price: "45₺",
          category: "tatli",
          available: true,
        },
      ]
      setMenuItems(defaultMenu)
      localStorage.setItem("restaurant-menu", JSON.stringify(defaultMenu))
    }
  }, [])

  const filteredItems = menuItems.filter((item) => item.category === activeCategory && item.available)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ana-yemek":
        return <Utensils className="h-5 w-5" />
      case "meze":
        return <ChefHat className="h-5 w-5" />
      case "tatli":
        return <Star className="h-5 w-5" />
      default:
        return <Utensils className="h-5 w-5" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "ana-yemek":
        return "Ana Yemekler"
      case "meze":
        return "Mezeler"
      case "tatli":
        return "Tatlılar"
      default:
        return "Menü"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="text-orange-900 flex items-center">
            <Utensils className="h-6 w-6 mr-2" />
            Abant Yemek Menüsü
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {/* Kategori Seçimi */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(["ana-yemek", "meze", "tatli"] as const).map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "border-orange-600 text-orange-600 hover:bg-orange-50"
                }
              >
                {getCategoryIcon(category)}
                <span className="ml-2">{getCategoryName(category)}</span>
              </Button>
            ))}
          </div>

          {/* Menü Öğeleri */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card key={item.id} className="border-orange-200 hover:shadow-md transition-shadow bg-white">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        {item.price}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Bu kategoride şu anda mevcut ürün bulunmamaktadır.</p>
              </div>
            )}
          </div>

          {/* Alt Bilgi */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Fiyatlar değişiklik gösterebilir. Güncel fiyatlar için lütfen garsonunuza danışın.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
