'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, X } from 'lucide-react'
import Image from 'next/image'

interface Plano {
  title: string
  file: string
  thumbnail?: string
}

interface PlanosViewerProps {
  planos: Plano[]
}

export function PlanosViewer({ planos }: PlanosViewerProps) {
  const [selectedPlano, setSelectedPlano] = useState<Plano | null>(null)

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
            {planos.map((plano, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPlano(plano)}
              >
                <CardContent className="p-4">
                  <div className="relative aspect-[3/4] mb-4 bg-gray-100 rounded overflow-hidden">
                    {plano.thumbnail ? (
                      <Image
                        src={plano.thumbnail}
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
            className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg">{selectedPlano.title}</h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = selectedPlano.file
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

            <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
              {selectedPlano.file.endsWith('.pdf') ? (
                <iframe
                  src={selectedPlano.file}
                  className="w-full h-[70vh] border-0"
                  title={selectedPlano.title}
                />
              ) : (
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={selectedPlano.file}
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
