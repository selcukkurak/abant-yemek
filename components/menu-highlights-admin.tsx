"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Utensils, ChefHat, Star } from "lucide-react"

interface MenuHighlight {
  id: string
  title: string
  description: string
  details: string
  icon: "utensils" | "chef-hat" | "star"
}

interface MenuHighlightsAdminProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuHighlightsAdmin({ isOpen, onClose }: MenuHighlightsAdminProps) {
  const [highlights, setHighlights] = useState<MenuHighlight[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    details: "",
  })

  useEffect(() => {
    loadHighlights()
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
      localStorage.setItem("menu-highlights", JSON.stringify(defaultHighlights))
    }
  }

  const saveHighlights = (updatedHighlights: MenuHighlight[]) => {
    localStorage.setItem("menu-highlights", JSON.stringify(updatedHighlights))
    setHighlights(updatedHighlights)
  }

  const handleEdit = (highlight: MenuHighlight) => {
    setEditingId(highlight.id)
    setFormData({
      title: highlight.title,
      description: highlight.description,
      details: highlight.details,
    })
  }

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.details) {
      alert("Lütfen tüm alanları doldurun!")
      return
    }

    const updatedHighlights = highlights.map((highlight) =>
      highlight.id === editingId
        ? {
            ...highlight,
            title: formData.title,
            description: formData.description,
            details: formData.details,
          }
        : highlight,
    )

    saveHighlights(updatedHighlights)
    setEditingId(null)
    setFormData({
      title: "",
      description: "",
      details: "",
    })
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      title: "",
      description: "",
      details: "",
    })
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "utensils":
        return <Utensils className="h-8 w-8 text-[var(--primary)]" />
      case "chef-hat":
        return <ChefHat className="h-8 w-8 text-[var(--primary)]" />
      case "star":
        return <Star className="h-8 w-8 text-[var(--primary)]" />
      default:
        return <Utensils className="h-8 w-8 text-[var(--primary)]" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="text-[var(--primary)]">Menü Öne Çıkanları Yönetimi</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-6">
            <p className="text-gray-600">
              Ana sayfadaki "Menü Öne Çıkanları" bölümündeki kartların içeriklerini buradan düzenleyebilirsiniz.
            </p>
          </div>

          {/* Düzenleme Formu */}
          {editingId && (
            <Card className="mb-6 border-[var(--primary-light)]">
              <CardHeader>
                <CardTitle className="text-lg">Kart Düzenle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Başlık</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="Örn: Ana Yemekler"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Alt Başlık</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="Örn: Geleneksel Türk mutfağı lezzetleri"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Açıklama</label\
