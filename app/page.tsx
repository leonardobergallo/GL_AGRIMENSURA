"use client"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { Sobre } from "@/components/sobre"
import { Servicios } from "@/components/servicios"
import { Galeria } from "@/components/galeria"
import { Contacto } from "@/components/contacto"
import { Footer } from "@/components/footer"

export default function Home() {
  // Manejar scroll cuando hay hash en la URL
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Sobre />
      <Servicios />
      <Galeria />
      <Contacto />
      <Footer />
    </main>
  )
}
