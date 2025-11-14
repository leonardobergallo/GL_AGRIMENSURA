'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MessageCircle, Mail, Loader2, CheckCircle } from 'lucide-react'
import { ServicioSlug } from '@/lib/servicios-data'

const baseSchema = z.object({
  nombre: z.string().min(2, 'El nombre es muy corto'),
  email: z.string().email('Email inválido'),
  telefono: z.string().min(10, 'Teléfono inválido'),
  mensaje: z.string().optional(),
})

// Esquemas específicos por servicio
const schemas: Record<ServicioSlug, z.ZodType<any>> = {
  mensura: baseSchema.extend({
    direccion: z.string().min(5, 'Dirección es requerida'),
    partido: z.string().min(2, 'Partido es requerido'),
  }),
  usucapion: baseSchema.extend({
    direccion: z.string().min(5, 'Dirección es requerida'),
    partido: z.string().min(2, 'Partido es requerido'),
    superficie: z.string().optional(),
    aniosPosesion: z.string().optional(),
  }),
  subdivision: baseSchema.extend({
    direccion: z.string().min(5, 'Dirección es requerida'),
    partido: z.string().min(2, 'Partido es requerido'),
    superficieTotal: z.string().optional(),
    lotesDeseados: z.string().optional(),
  }),
  ph: baseSchema.extend({
    direccion: z.string().min(5, 'Dirección es requerida'),
    partido: z.string().min(2, 'Partido es requerido'),
    cantidadUnidades: z.string().optional(),
    tipoInmueble: z.string().optional(),
  }),
  topografia: baseSchema.extend({
    ubicacion: z.string().min(5, 'Ubicación es requerida'),
    tipoTrabajo: z.string().optional(),
  }),
  amojonamientos: baseSchema.extend({
    direccion: z.string().min(5, 'Dirección es requerida'),
    partido: z.string().min(2, 'Partido es requerido'),
    cantidadMojones: z.string().optional(),
  }),
}

interface ServiceFormProps {
  servicio: ServicioSlug
  title: string
  phoneNumber?: string
}

export function ServiceForm({ servicio, title, phoneNumber = '5492214000000' }: ServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm({
    resolver: zodResolver(schemas[servicio]),
    defaultValues: {
      nombre: '',
      email: '',
      telefono: '',
      mensaje: '',
    },
  })

  const handleWhatsAppSubmit = (data: any) => {
    const mensaje = formatWhatsAppMessage(data, servicio, title)
    const encodedMessage = encodeURIComponent(mensaje)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
    setIsSuccess(true)
  }

  const handleEmailSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, servicio, title }),
      })
      
      if (response.ok) {
        setIsSuccess(true)
        form.reset()
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
          <p className="text-muted-foreground">
            Gracias por tu consulta. Te responderemos a la brevedad.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Solicitá tu presupuesto</CardTitle>
            <CardDescription>
              Completá el formulario y te contactaremos a la brevedad
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              {/* Campos comunes */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nombre">Nombre completo *</Label>
                  <Input
                    id="nombre"
                    {...form.register('nombre')}
                    placeholder="Juan Pérez"
                  />
                  {form.formState.errors.nombre && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.nombre.message as string}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    {...form.register('telefono')}
                    placeholder="221 123 4567"
                  />
                  {form.formState.errors.telefono && (
                    <p className="text-sm text-red-500 mt-1">
                      {form.formState.errors.telefono.message as string}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register('email')}
                  placeholder="juan@ejemplo.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {form.formState.errors.email.message as string}
                  </p>
                )}
              </div>

              {/* Campos específicos por servicio */}
              {renderSpecificFields(servicio, form)}

              <div>
                <Label htmlFor="mensaje">Mensaje adicional</Label>
                <Textarea
                  id="mensaje"
                  {...form.register('mensaje')}
                  placeholder="Contanos más detalles sobre tu consulta..."
                  rows={4}
                />
              </div>

              {/* Botones de envío */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  onClick={form.handleSubmit(handleWhatsAppSubmit)}
                  className="bg-[#25D366] hover:bg-[#20BA5A] flex-1"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Enviar por WhatsApp
                </Button>
                <Button
                  type="button"
                  onClick={form.handleSubmit(handleEmailSubmit)}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-5 w-5" />
                  )}
                  Enviar por Email
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function renderSpecificFields(servicio: ServicioSlug, form: any) {
  switch (servicio) {
    case 'mensura':
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="direccion">Dirección *</Label>
            <Input id="direccion" {...form.register('direccion')} />
          </div>
          <div>
            <Label htmlFor="partido">Partido *</Label>
            <Input id="partido" {...form.register('partido')} />
          </div>
        </div>
      )

    case 'usucapion':
      return (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="direccion">Dirección *</Label>
              <Input id="direccion" {...form.register('direccion')} />
            </div>
            <div>
              <Label htmlFor="partido">Partido *</Label>
              <Input id="partido" {...form.register('partido')} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="superficie">Superficie aproximada</Label>
              <Input id="superficie" {...form.register('superficie')} placeholder="Ej: 300 m²" />
            </div>
            <div>
              <Label htmlFor="aniosPosesion">Años de posesión</Label>
              <Input id="aniosPosesion" {...form.register('aniosPosesion')} placeholder="Ej: 20 años" />
            </div>
          </div>
        </>
      )

    case 'subdivision':
      return (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="direccion">Dirección *</Label>
              <Input id="direccion" {...form.register('direccion')} />
            </div>
            <div>
              <Label htmlFor="partido">Partido *</Label>
              <Input id="partido" {...form.register('partido')} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="superficieTotal">Superficie total</Label>
              <Input id="superficieTotal" {...form.register('superficieTotal')} placeholder="Ej: 1000 m²" />
            </div>
            <div>
              <Label htmlFor="lotesDeseados">Cantidad de lotes</Label>
              <Input id="lotesDeseados" {...form.register('lotesDeseados')} placeholder="Ej: 4 lotes" />
            </div>
          </div>
        </>
      )

    case 'ph':
      return (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="direccion">Dirección *</Label>
              <Input id="direccion" {...form.register('direccion')} />
            </div>
            <div>
              <Label htmlFor="partido">Partido *</Label>
              <Input id="partido" {...form.register('partido')} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cantidadUnidades">Cantidad de unidades</Label>
              <Input id="cantidadUnidades" {...form.register('cantidadUnidades')} placeholder="Ej: 8 unidades" />
            </div>
            <div>
              <Label htmlFor="tipoInmueble">Tipo de inmueble</Label>
              <Input id="tipoInmueble" {...form.register('tipoInmueble')} placeholder="Edificio, dúplex, etc." />
            </div>
          </div>
        </>
      )

    case 'topografia':
      return (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ubicacion">Ubicación *</Label>
            <Input id="ubicacion" {...form.register('ubicacion')} />
          </div>
          <div>
            <Label htmlFor="tipoTrabajo">Tipo de trabajo</Label>
            <Input id="tipoTrabajo" {...form.register('tipoTrabajo')} placeholder="Relevamiento, replanteo..." />
          </div>
        </div>
      )

    case 'amojonamientos':
      return (
        <>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="direccion">Dirección *</Label>
              <Input id="direccion" {...form.register('direccion')} />
            </div>
            <div>
              <Label htmlFor="partido">Partido *</Label>
              <Input id="partido" {...form.register('partido')} />
            </div>
          </div>
          <div>
            <Label htmlFor="cantidadMojones">Cantidad de mojones estimados</Label>
            <Input id="cantidadMojones" {...form.register('cantidadMojones')} placeholder="Ej: 4 esquinas" />
          </div>
        </>
      )

    default:
      return null
  }
}

function formatWhatsAppMessage(data: any, servicio: ServicioSlug, title: string): string {
  let mensaje = `*Consulta: ${title}*\n\n`
  mensaje += `👤 *Nombre:* ${data.nombre}\n`
  mensaje += `📧 *Email:* ${data.email}\n`
  mensaje += `📱 *Teléfono:* ${data.telefono}\n\n`

  // Agregar campos específicos
  if (data.direccion) mensaje += `📍 *Dirección:* ${data.direccion}\n`
  if (data.partido) mensaje += `🏘️ *Partido:* ${data.partido}\n`
  if (data.ubicacion) mensaje += `📍 *Ubicación:* ${data.ubicacion}\n`
  if (data.superficie) mensaje += `📏 *Superficie:* ${data.superficie}\n`
  if (data.superficieTotal) mensaje += `📏 *Superficie total:* ${data.superficieTotal}\n`
  if (data.aniosPosesion) mensaje += `⏳ *Años de posesión:* ${data.aniosPosesion}\n`
  if (data.lotesDeseados) mensaje += `🏗️ *Lotes deseados:* ${data.lotesDeseados}\n`
  if (data.cantidadUnidades) mensaje += `🏢 *Cantidad de unidades:* ${data.cantidadUnidades}\n`
  if (data.tipoInmueble) mensaje += `🏠 *Tipo de inmueble:* ${data.tipoInmueble}\n`
  if (data.tipoTrabajo) mensaje += `🔧 *Tipo de trabajo:* ${data.tipoTrabajo}\n`
  if (data.cantidadMojones) mensaje += `📍 *Cantidad de mojones:* ${data.cantidadMojones}\n`

  if (data.mensaje) mensaje += `\n💬 *Mensaje:*\n${data.mensaje}`

  return mensaje
}
