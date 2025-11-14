import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import "./globals.css"

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "GL Agrimensura | Ing. Gabriel Lucero - La Plata",
  description: "Servicios profesionales de agrimensura: mensuras, usucapión, subdivisión, propiedad horizontal, topografía y amojonamientos en La Plata y alrededores.",
  keywords: ['agrimensor la plata', 'mensuras la plata', 'usucapion', 'subdivision', 'propiedad horizontal', 'topografia'],
  generator: "v0.app",
  metadataBase: new URL('https://glagrimensura.com'),
  openGraph: {
    title: "GL Agrimensura | Ing. Gabriel Lucero",
    description: "Servicios profesionales de agrimensura en La Plata",
    type: "website",
    locale: "es_AR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  )
}
