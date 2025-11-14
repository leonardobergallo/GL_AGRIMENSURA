'use client'

import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface WhatsAppFloatProps {
  phoneNumber?: string
  message?: string
}

export function WhatsAppFloat({ 
  phoneNumber = '5493425481261', // Número de WhatsApp local
  message = 'Hola, necesito asesoramiento sobre servicios de agrimensura.'
}: WhatsAppFloatProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl hover:scale-110 transition-transform bg-[#25D366] hover:bg-[#20BA5A] p-0"
      size="icon"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  )
}
