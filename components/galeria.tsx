"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categorias = [
  { id: 'todos', label: 'Todos' },
  { id: 'urbano', label: 'Urbano' },
  { id: 'rural', label: 'Rural' },
  { id: 'ph', label: 'Propiedad Horizontal' },
  { id: 'gps', label: 'GPS/Topografía' },
  { id: 'equipos', label: 'Equipos' },
]

const galeria = [
  {
    id: 1,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BXUvlOJjjMNUJnbVcvt1pu7s4N4ivS.png",
    alt: "Mensura urbana con teodolito - La Plata 2024",
    categoria: 'urbano',
    etiqueta: 'Mensura Urbana - La Plata 2024'
  },
  {
    id: 2,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EqYOI4D9jyhpfP45HDm8iYk9fVcvcF.png",
    alt: "Trabajo de campo con estación total",
    categoria: 'gps',
    etiqueta: 'Relevamiento Topográfico 2024'
  },
  {
    id: 3,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-IhW5FCzcgv6tLF2olSE9lrIElB95Vu.png",
    alt: "GPS profesional en trabajo de campo",
    categoria: 'gps',
    etiqueta: 'GPS RTK - Precisión cm'
  },
  {
    id: 4,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-T3eyRRELOHqFKa5krvdEIdCNDz41mx.png",
    alt: "Mensura rural con GPS",
    categoria: 'rural',
    etiqueta: 'Mensura Rural 2024'
  },
  {
    id: 5,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0rrkL2idywkPXytSLjLb1ITR6DZqxH.png",
    alt: "Estación total en medición topográfica",
    categoria: 'equipos',
    etiqueta: 'Estación Total Profesional'
  },
  {
    id: 6,
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2hTsIx7AElBsaVUM34g2prHJ11VtLN.png",
    alt: "GL Agrimensura - Servicios profesionales",
    categoria: 'equipos',
    etiqueta: 'GL Agrimensura'
  },
]

export function Galeria() {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')

  const imagenesFiltradas = categoriaActiva === 'todos' 
    ? galeria 
    : galeria.filter(img => img.categoria === categoriaActiva)

  return (
    <section id="galeria" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">Galería de Trabajos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proyectos realizados con precisión y profesionalismo
          </p>
        </div>

        {/* Filtros por categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map(cat => (
            <Button
              key={cat.id}
              variant={categoriaActiva === cat.id ? "default" : "outline"}
              onClick={() => setCategoriaActiva(cat.id)}
              className="rounded-full"
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* Grid de imágenes con lazy loading */}
        <div className="grid md:grid-cols-3 gap-6">
          {imagenesFiltradas.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl border-2 border-primary/20 hover:border-primary/50 transition-all h-64"
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                fill
                loading="lazy"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="secondary" className="mb-2">
                    {item.etiqueta}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>

        {imagenesFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay imágenes en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  )
}
