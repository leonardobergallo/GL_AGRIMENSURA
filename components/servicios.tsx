import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Ruler, FileText, Building2, Compass, Map, ArrowRight } from "lucide-react"
import Image from "next/image"

const servicios = [
  {
    icon: Ruler,
    title: "Mensuras Urbanas y Rurales",
    description: "Levantamientos planimétricos de precisión para propiedades en zona urbana y rural",
    slug: "mensura",
    imagen: "/servicios/mensura.svg"
  },
  {
    icon: MapPin,
    title: "Usucapión",
    description: "Servicios de agrimensura para trámites de usucapión",
    slug: "usucapion",
    imagen: "/servicios/usucapion.svg"
  },
  {
    icon: FileText,
    title: "Subdivisión",
    description: "Trámites y relevamientos para divisiones de propiedades",
    slug: "subdivision",
    imagen: "/servicios/subdivision.svg"
  },
  {
    icon: Building2,
    title: "Propiedad Horizontal",
    description: "Mensuras de unidades funcionales en edificios e inmuebles",
    slug: "ph",
    imagen: "/servicios/ph.svg"
  },
  {
    icon: Map,
    title: "Topografía Integral",
    description: "Relevamientos con GPS y tecnología de última generación",
    slug: "topografia",
    imagen: "/servicios/topografia.svg"
  },
  {
    icon: Compass,
    title: "Amojonamientos",
    description: "Demarcación y colocación de mojones según normas catastrales",
    slug: "amojonamientos",
    imagen: "/servicios/amojonamientos.svg"
  },
]

export function Servicios() {
  return (
    <section id="servicios" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Nuestros Servicios</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ofrecemos soluciones completas en agrimensura con profesionalismo y precisión técnica
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {servicios.map((servicio, idx) => {
            const Icon = servicio.icon
            return (
              <Link key={idx} href={`/servicios/${servicio.slug}`}>
                <Card className="border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg h-full group cursor-pointer overflow-hidden">
                  {/* Imagen del servicio */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={servicio.imagen}
                      alt={servicio.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                        <Icon className="text-primary" size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-primary group-hover:text-accent transition-colors">
                      {servicio.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground mb-4">
                      {servicio.description}
                    </CardDescription>
                    <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      Ver más <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
