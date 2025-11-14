"use client"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  const handleNavigation = (section: string) => {
    if (isHome) {
      // Si estamos en home, scroll directo
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Si estamos en otra página, ir a home con hash
      router.push(`/#${section}`)
      // Después de navegar, hacer scroll
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="relative w-24 h-24 md:w-28 md:h-28">
            <Image
              src="/logoGeoSudFix.png"
              alt="Geo Sud Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Gabriel Lucero</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavigation("servicios")}
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
          >
            Servicios
          </button>
          <button
            onClick={() => handleNavigation("galeria")}
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
          >
            Galería
          </button>
          <button
            onClick={() => handleNavigation("sobre")}
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
          >
            Sobre Mí
          </button>
          <button
            onClick={() => handleNavigation("contacto")}
            className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
          >
            Contacto
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+542212230052"
            className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <Phone size={18} />
            <span>221-2230052</span>
          </a>
          <Button 
            onClick={() => {
              const whatsappUrl = `https://wa.me/5492214000000?text=${encodeURIComponent('Hola, necesito información sobre servicios de agrimensura')}`
              window.open(whatsappUrl, '_blank')
            }}
            className="bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold"
          >
            Consultar WhatsApp
          </Button>
        </div>

        <div className="md:hidden">
          <Button 
            onClick={() => {
              const whatsappUrl = `https://wa.me/5492214000000?text=${encodeURIComponent('Hola, necesito información sobre servicios de agrimensura')}`
              window.open(whatsappUrl, '_blank')
            }}
            size="sm"
            className="bg-[#25D366] hover:bg-[#20BA5A]"
          >
            WhatsApp
          </Button>
        </div>
      </div>
    </header>
  )
}
