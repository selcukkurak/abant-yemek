"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Lock, LogOut, Eye, EyeOff } from "lucide-react"
import AdminPanel from "@/components/admin-panel"
import MenuHighlightsAdmin from "@/components/menu-highlights-admin"

// Admin bilgileri (gerçek uygulamada bu bilgiler veritabanında olmalı)
const ADMIN_CREDENTIALS = {
  email: "admin@abantyemek.com",
  password: "abant2024",
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Sayfa yüklendiğinde oturum kontrolü yap
    const savedAuth = localStorage.getItem("admin-auth")
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      // 24 saat geçerliliği kontrol et
      if (Date.now() - authData.timestamp < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("admin-auth")
      }
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Simüle edilmiş giriş gecikmesi
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true)
      // Oturum bilgisini kaydet (24 saat geçerli)
      localStorage.setItem(
        "admin-auth",
        JSON.stringify({
          timestamp: Date.now(),
          email: email,
        }),
      )
      setEmail("")
      setPassword("")
    } else {
      setError("E-posta veya şifre hatalı!")
    }
    setLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin-auth")
    setEmail("")
    setPassword("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mb-4">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-orange-900">Admin Girişi</CardTitle>
            <p className="text-gray-600">Abant Yemek Yönetim Paneli</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@abantyemek.com"
                  required
                  className="focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="focus:ring-orange-500 focus:border-orange-500 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>}
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Giriş yapılıyor...
                  </div>
                ) : (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Giriş Yap
                  </>
                )}
              </Button>
            </form>

            {/* Demo bilgileri */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Demo Giriş Bilgileri:</h4>
              <p className="text-sm text-blue-700">
                <strong>E-posta:</strong> merkez@abantyemek.com
                <br />
                <strong>Şifre:</strong> abant2024
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                <ChefHat className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Abant Yemek</h1>
                <p className="text-sm text-gray-600">Yönetim Paneli</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Hoş geldiniz, Admin</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Çıkış Yap
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Yönetim Paneli</h2>
          <p className="text-gray-600">Web sitenizin içeriklerini buradan yönetebilirsiniz.</p>
        </div>

        <Tabs defaultValue="menu-items" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2">
            <TabsTrigger value="menu-items">Menü Yönetimi</TabsTrigger>
            <TabsTrigger value="menu-highlights">Menü Öne Çıkanları</TabsTrigger>
          </TabsList>

          <TabsContent value="menu-items" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Menü Ürünleri Yönetimi</CardTitle>
                <p className="text-gray-600">
                  Restoran menünüzdeki ürünleri ekleyebilir, düzenleyebilir ve silebilirsiniz.
                </p>
              </CardHeader>
              <CardContent>
                <AdminPanel isOpen={true} onClose={() => {}} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu-highlights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Menü Öne Çıkanları Yönetimi</CardTitle>
                <p className="text-gray-600">
                  Ana sayfadaki menü öne çıkanları bölümünün içeriklerini düzenleyebilirsiniz.
                </p>
              </CardHeader>
              <CardContent>
                <MenuHighlightsAdmin isOpen={true} onClose={() => {}} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
