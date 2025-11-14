export type ServicioSlug = 'mensura' | 'usucapion' | 'subdivision' | 'ph' | 'topografia' | 'amojonamientos'

export interface Servicio {
  slug: ServicioSlug
  title: string
  subtitle: string
  description: string
  benefits: string[]
  whatsappMessage: string
  keywords: string[]
  imagen: string
  planos: {
    title: string
    file: string
    thumbnail?: string
  }[]
}

export const serviciosData: Record<ServicioSlug, Servicio> = {
  mensura: {
    slug: 'mensura',
    title: 'Mensuras Urbanas y Rurales',
    subtitle: 'Levantamientos de precisión para tu propiedad',
    description: 'Realizamos mensuras en zonas urbanas y rurales con la más alta tecnología. Obtenés la documentación precisa de tu propiedad para cualquier trámite legal, compraventa o subdivisión.',
    benefits: [
      'Levantamiento con equipos GPS de última generación',
      'Planos aprobados por Geodesia',
      'Trámites ante organismos oficiales',
      'Entrega rápida de documentación',
      'Asesoramiento personalizado'
    ],
    whatsappMessage: 'Hola, necesito una mensura. Me gustaría recibir información y presupuesto.',
    keywords: ['mensura la plata', 'agrimensor la plata', 'mensura urbana', 'mensura rural'],
    imagen: '/servicios/mensura.svg',
    planos: []
  },
  usucapion: {
    slug: 'usucapion',
    title: 'Usucapión',
    subtitle: 'Te ayudamos a escriturar tu propiedad',
    description: 'Realizamos todos los trabajos de agrimensura necesarios para tu trámite de usucapión. Desde el levantamiento hasta la presentación ante los organismos correspondientes.',
    benefits: [
      'Relevamiento completo de la propiedad',
      'Plano de mensura para usucapión',
      'Notificación a colindantes',
      'Trámites ante Geodesia y Catastro',
      'Acompañamiento en todo el proceso'
    ],
    whatsappMessage: 'Hola, necesito iniciar un trámite de usucapión. Quisiera asesoramiento.',
    keywords: ['usucapion la plata', 'agrimensor usucapion', 'escriturar propiedad'],
    imagen: '/servicios/usucapion.svg',
    planos: []
  },
  subdivision: {
    slug: 'subdivision',
    title: 'Subdivisión de Lotes',
    subtitle: 'Dividí tu terreno de forma legal',
    description: 'Te asesoramos y realizamos todos los trabajos técnicos para subdividir tu terreno. Cumplimos con todas las normativas municipales y provinciales.',
    benefits: [
      'Análisis de factibilidad de subdivisión',
      'Plano de subdivisión aprobado',
      'Nuevas partidas inmobiliarias',
      'Gestión ante organismos oficiales',
      'Asesoramiento legal-técnico'
    ],
    whatsappMessage: 'Hola, quiero subdividir mi terreno. Necesito asesoramiento y presupuesto.',
    keywords: ['subdivision la plata', 'dividir terreno', 'subdivisión lote'],
    imagen: '/servicios/subdivision.svg',
    planos: []
  },
  ph: {
    slug: 'ph',
    title: 'Propiedad Horizontal',
    subtitle: 'Regularizá tu edificio o complejo',
    description: 'Realizamos mensuras de Propiedad Horizontal para edificios, dúplex, complejos habitacionales y locales comerciales. Regularizá tu inmueble para poder vender cada unidad de forma independiente.',
    benefits: [
      'Mensura de todas las unidades funcionales',
      'Cálculo de superficies cubiertas y semicubiertas',
      'Planos para cada unidad',
      'Reglamento de copropiedad',
      'Trámites completos ante organismos'
    ],
    whatsappMessage: 'Hola, necesito hacer Propiedad Horizontal. Quisiera información.',
    keywords: ['propiedad horizontal la plata', 'ph la plata', 'dividir departamentos'],
    imagen: '/servicios/ph.svg',
    planos: []
  },
  topografia: {
    slug: 'topografia',
    title: 'Topografía Integral',
    subtitle: 'Relevamientos con tecnología GPS',
    description: 'Trabajos topográficos de alta precisión con equipos GPS RTK y estación total. Ideal para proyectos de ingeniería, arquitectura, construcción y obras civiles.',
    benefits: [
      'Equipos GPS de última generación',
      'Relevamientos de alta precisión',
      'Curvas de nivel y altimetría',
      'Replanteos de obra',
      'Soporte técnico continuo'
    ],
    whatsappMessage: 'Hola, necesito un relevamiento topográfico. Quisiera presupuesto.',
    keywords: ['topografia la plata', 'gps rtk', 'relevamiento topográfico'],
    imagen: '/servicios/topografia.svg',
    planos: []
  },
  amojonamientos: {
    slug: 'amojonamientos',
    title: 'Amojonamientos',
    subtitle: 'Demarcá los límites de tu propiedad',
    description: 'Colocamos mojones oficiales según las normas catastrales para definir claramente los límites de tu propiedad. Evitá conflictos con vecinos y conocé exactamente dónde termina tu terreno.',
    benefits: [
      'Mojones según normativa catastral',
      'Demarcación precisa de límites',
      'Prevención de conflictos linderos',
      'Documentación respaldatoria',
      'Asesoramiento técnico-legal'
    ],
    whatsappMessage: 'Hola, necesito colocar mojones en mi terreno. Quisiera presupuesto.',
    keywords: ['amojonamiento la plata', 'colocar mojones', 'límites terreno'],
    imagen: '/servicios/amojonamientos.svg',
    planos: []
  }
}

export const getAllServicios = () => Object.values(serviciosData)
export const getServicioBySlug = (slug: string) => serviciosData[slug as ServicioSlug]
