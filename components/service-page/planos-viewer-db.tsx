"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, X } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"

interface Plano {
  id: number
  servicioSlug: string
  title: string
  description: string | null
  fileUrl: string
  fileType: string
  thumbnailUrl: string | null
  orden: number
}

export function PlanosViewerDB({ servicio }: { servicio: string }) {
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlano, setSelectedPlano] = useState<Plano | null>(null)

  useEffect(() => {
    async function fetchPlanos() {
      try {
        const response = await fetch(`/api/planos?servicio=${servicio}`)
        const data = await response.json()
        setPlanos(data.planos || [])
      } catch (error) {
        console.error('Error al cargar planos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlanos()
  }, [servicio])

  if (loading) {
    return (
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ejemplos de Trabajos</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (planos.length === 0) {
    return (
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Planos de referencia</h2>
          <p className="text-muted-foreground">
            Próximamente compartiremos ejemplos de trabajos realizados
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 bg-secondary/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Ejemplos de Trabajos Realizados
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Mirá algunos de los planos que hemos realizado. Podés visualizarlos y descargarlos.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {planos.map((plano) => (
              <Card
                key={plano.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPlano(plano)}
              >
                <CardContent className="p-4">
                  <div className="relative aspect-[3/4] mb-4 bg-gray-100 rounded overflow-hidden">
                    {plano.thumbnailUrl ? (
                      <Image
                        src={plano.thumbnailUrl}
                        alt={plano.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-center mb-2">{plano.title}</h3>
                  {plano.description && (
                    <p className="text-sm text-muted-foreground text-center mb-2 line-clamp-2">
                      {plano.description}
                    </p>
                  )}
                  <Button className="w-full" variant="outline" size="sm">
                    Ver plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de visualización */}
      {selectedPlano && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPlano(null)}
        >
          <div
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <h3 className="font-semibold text-lg">{selectedPlano.title}</h3>
                {selectedPlano.description && (
                  <p className="text-sm text-muted-foreground">{selectedPlano.description}</p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = selectedPlano.fileUrl
                    link.download = selectedPlano.title
                    link.click()
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedPlano(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-50">
              {selectedPlano.fileType === 'pdf' ? (
                <iframe
                  src={selectedPlano.fileUrl}
                  className="w-full h-full min-h-[600px] rounded"
                  title={selectedPlano.title}
                />
              ) : (
                <div className="relative w-full h-full min-h-[600px]">
                  <Image
                    src={selectedPlano.fileUrl}
                    alt={selectedPlano.title}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
