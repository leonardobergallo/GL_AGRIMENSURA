import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://glagrimensura.com'
  
  const servicios = [
    'mensura',
    'usucapion',
    'subdivision',
    'ph',
    'topografia',
    'amojonamientos'
  ]

  const servicioUrls = servicios.map(servicio => ({
    url: `${baseUrl}/servicios/${servicio}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...servicioUrls,
  ]
}
