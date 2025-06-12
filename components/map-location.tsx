"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Navigation, MapPin, ExternalLink } from "lucide-react"

// Varsayılan konum (Abant Gölü yakınları - gerçek konumu siz belirleyebilirsiniz)
const defaultLocation = {
  lat: 40.730326,
  lng: 31.586214
}

interface MapLocationProps {
  location?: { lat: number; lng: number }
  businessName?: string
  address?: string
}

export default function MapLocation({
  location = defaultLocation,
  businessName = "Abant Yemek",
  address = "Borazanlar mah. Hürriyet cad. No 75/A  Bolu/Merkez",
}: MapLocationProps) {
  const [showStaticMap, setShowStaticMap] = useState(true)

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`
    window.open(url, "_blank")
  }

  const handleOpenInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
    window.open(url, "_blank")
  }

  // Static map URL using OpenStreetMap
  const staticMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${location.lng - 0.01},${location.lat - 0.01},${location.lng + 0.01},${location.lat + 0.01}&layer=mapnik&marker=${location.lat},${location.lng}`

  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
      {showStaticMap ? (
        <iframe
          src={staticMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          title="Abant Yemek Konumu"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200">
          <MapPin className="h-16 w-16 text-orange-600 mb-4" />
          <h3 className="text-xl font-bold text-orange-900 mb-2">{businessName}</h3>
          <p className="text-orange-700 text-center mb-4">{address}</p>
          <Button onClick={handleOpenInMaps} variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Haritada Görüntüle
          </Button>
        </div>
      )}

      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button
          onClick={() => setShowStaticMap(!showStaticMap)}
          variant="secondary"
          size="sm"
          className="bg-white/90 hover:bg-white shadow-lg"
        >
          {showStaticMap ? "Basit Görünüm" : "Harita Görünümü"}
        </Button>
        <Button onClick={handleGetDirections} className="bg-orange-600 hover:bg-orange-700 shadow-lg">
          <Navigation className="h-4 w-4 mr-2" />
          Yol Tarifi Al
        </Button>
      </div>
    </div>
  )
}
