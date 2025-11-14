import { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ServiceHero } from '@/components/service-page/service-hero'
import { ServiceBenefits } from '@/components/service-page/service-benefits'
import { ServiceForm } from '@/components/service-page/service-form'
import { PlanosViewerDB } from '@/components/service-page/planos-viewer-db'
import { ServicePhotosGallery } from '@/components/service-page/service-photos'
import { getServicioBySlug } from '@/lib/servicios-data'

export const metadata: Metadata = {
  title: 'Topografía Integral | GL Agrimensura',
  description: 'Relevamientos topográficos con tecnología GPS RTK. Alta precisión para proyectos de ingeniería y construcción.',
  keywords: ['topografia la plata', 'gps rtk', 'relevamiento topográfico'],
}

export default function TopografiaPage() {
  const servicio = getServicioBySlug('topografia')

  if (!servicio) {
    return <div>Servicio no encontrado</div>
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <ServiceHero
        title={servicio.title}
        subtitle={servicio.subtitle}
        description={servicio.description}
        imagen={servicio.imagen}
        whatsappMessage={servicio.whatsappMessage}
      />

      <ServiceBenefits benefits={servicio.benefits} />

      <ServicePhotosGallery servicio="topografia" />

      <PlanosViewerDB servicio="topografia" />

      <ServiceForm servicio={servicio.slug} title={servicio.title} />

      <Footer />
    </main>
  )
}
