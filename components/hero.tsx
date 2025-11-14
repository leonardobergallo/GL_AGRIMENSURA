"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-gradient-to-b from-primary/5 to-transparent pt-16 pb-24">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            Precisión en cada medida
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-6 leading-tight">
            Soluciones en <span className="text-accent">Agrimensura</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Servicios profesionales de mensuras, topografía y relevamientos catastrales con equipamiento de última
            generación y precisión técnica garantizada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => scrollToSection("contacto")}
            >
              Solicitar Presupuesto
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection("servicios")}
            >
              Ver Servicios
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-primary/20">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-pJvQ99Hx2xzVL7L2Cw7hQYiqO6VRpT.png"
            alt="Ing. Gabriel Lucero con equipo de topografía"
            width={400}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </section>
  )
}
