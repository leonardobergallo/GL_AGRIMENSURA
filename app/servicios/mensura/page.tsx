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
  title: 'Mensuras Urbanas y Rurales | GL Agrimensura',
  description: 'Realizamos mensuras en zonas urbanas y rurales con la más alta tecnología. Planos aprobados por Geodesia.',
  keywords: ['mensura la plata', 'agrimensor la plata', 'mensura urbana', 'mensura rural'],
}

export default function MensuraPage() {
  const servicio = getServicioBySlug('mensura')

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

      <ServicePhotosGallery servicio="mensura" />

      <PlanosViewerDB servicio="mensura" />

      <ServiceForm servicio={servicio.slug} title={servicio.title} />

      <Footer />
    </main>
  )
}
