"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface ServicePhoto {
  id: number
  servicioSlug: string
  title: string
  description: string | null
  imageUrl: string
  thumbnailUrl: string | null
  orden: number
  createdAt: string
  updatedAt: string
}

export function ServicePhotosGallery({ servicio }: { servicio: string }) {
  const [photos, setPhotos] = useState<ServicePhoto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch(`/api/photos?servicio=${servicio}`)
        const data = await response.json()
        setPhotos(data.photos || [])
      } catch (error) {
        console.error('Error al cargar fotos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [servicio])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Galería de Trabajos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (photos.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Galería de Trabajos</h2>
        <p className="text-center text-muted-foreground mb-12">
          Ejemplos de trabajos realizados
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative h-64 w-full">
                  <Image
                    src={photo.thumbnailUrl || photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-sm text-muted-foreground">{photo.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
