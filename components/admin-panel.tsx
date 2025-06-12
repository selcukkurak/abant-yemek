"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Edit, Trash2, Save, Eye, EyeOff } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: string
  category: "ana-yemek" | "meze" | "tatli"
  available: boolean
}

interface AdminPanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [activeCategory, setActiveCategory] = useState<"ana-yemek" | "meze" | "tatli">("ana-yemek")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "ana-yemek" as "ana-yemek" | "meze" | "tatli",
    available: true,
  })

  useEffect(() => {
    loadMenuItems()
  }, [])

  const loadMenuItems = () => {
    const savedMenu = localStorage.getItem("restaurant-menu")
    if (savedMenu) {
      setMenuItems(JSON.parse(savedMenu))
    }
  }

  const saveMenuItems = (items: MenuItem[]) => {
    localStorage.setItem("restaurant-menu", JSON.stringify(items))
    setMenuItems(items)
  }

  const handleAddNew = () => {
    setIsAddingNew(true)
    setEditingItem(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      category: activeCategory,
      available: true,
    })
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setIsAddingNew(false)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      available: item.available,
    })
  }

  const handleSave = () => {
    if (!formData.name || !formData.description || !formData.price) {
      alert("Lütfen tüm alanları doldurun!")
      return
    }

    let updatedItems: MenuItem[]

    if (isAddingNew) {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        ...formData,
      }
      updatedItems = [...menuItems, newItem]
    } else if (editingItem) {
      updatedItems = menuItems.map((item) => (item.id === editingItem.id ? { ...editingItem, ...formData } : item))
    } else {
      return
    }

    saveMenuItems(updatedItems)
    setIsAddingNew(false)
    setEditingItem(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "ana-yemek",
      available: true,
    })
  }

  const handleDelete = (id: string) => {
    if (confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      const updatedItems = menuItems.filter((item) => item.id !== id)
      saveMenuItems(updatedItems)
    }
  }

  const toggleAvailability = (id: string) => {
    const updatedItems = menuItems.map((item) => (item.id === id ? { ...item, available: !item.available } : item))
    saveMenuItems(updatedItems)
  }

  const handleCancel = () => {
    setIsAddingNew(false)
    setEditingItem(null)
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "ana-yemek",
      available: true,
    })
  }

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

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
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <CardTitle className="text-[var(--primary)]">Menü Yönetim Paneli</CardTitle>
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
                    ? "bg-[var(--primary)] hover:bg-[var(--primary-dark)]"
                    : "border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-light)]/10"
                }
              >
                {getCategoryName(category)}
              </Button>
            ))}
          </div>

          {/* Yeni Ürün Ekleme Butonu */}
          <div className="mb-6">
            <Button onClick={handleAddNew} className="bg-[var(--primary)] hover:bg-[var(--primary-dark)]">
              <Plus className="h-4 w-4 mr-2" />
              Yeni {getCategoryName(activeCategory)} Ekle
            </Button>
          </div>

          {/* Form (Ekleme/Düzenleme) */}
          {(isAddingNew || editingItem) && (
            <Card className="mb-6 border-[var(--primary-light)]">
              <CardHeader>
                <CardTitle className="text-lg">{isAddingNew ? "Yeni Ürün Ekle" : "Ürün Düzenle"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Ürün Adı</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Ürün adını girin"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Fiyat</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                      placeholder="Örn: 120₺"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Açıklama</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    placeholder="Ürün açıklamasını girin"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Kategori</label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value as "ana-yemek" | "meze" | "tatli" })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="ana-yemek">Ana Yemekler</option>
                      <option value="meze">Mezeler</option>
                      <option value="tatli">Tatlılar</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Durum</label>
                    <select
                      value={formData.available ? "true" : "false"}
                      onChange={(e) => setFormData({ ...formData, available: e.target.value === "true" })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    >
                      <option value="true">Mevcut</option>
                      <option value="false">Mevcut Değil</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleSave} className="bg-[var(--primary)] hover:bg-[var(--primary-dark)]">
                    <Save className="h-4 w-4 mr-2" />
                    Kaydet
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    İptal
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Menü Listesi */}
          <div className="grid gap-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card key={item.id} className={`border-[var(--primary-light)] ${!item.available ? "opacity-60" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <Badge variant="secondary" className="bg-[var(--accent-light)] text-gray-900">
                            {item.price}
                          </Badge>
                          <Badge
                            variant={item.available ? "default" : "secondary"}
                            className={item.available ? "bg-[var(--green)]" : ""}
                          >
                            {item.available ? "Mevcut" : "Mevcut Değil"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => toggleAvailability(item.id)}>
                          {item.available ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
                          className="text-[var(--red)] hover:text-[var(--red)]"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Bu kategoride henüz ürün bulunmamaktadır.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
